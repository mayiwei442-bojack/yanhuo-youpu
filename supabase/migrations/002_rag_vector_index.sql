alter table public.kb_chunks
  add column if not exists embedding extensions.vector(1024);

alter table public.kb_chunks
  add column if not exists content_search tsvector
  generated always as (to_tsvector('simple', coalesce(content, ''))) stored;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'kb_chunks_embedding_dim_check'
      and conrelid = 'public.kb_chunks'::regclass
  ) then
    alter table public.kb_chunks
      add constraint kb_chunks_embedding_dim_check
      check (embedding_dim is null or embedding_dim = 1024);
  end if;
end
$$;

create index if not exists kb_chunks_embedding_hnsw_idx
  on public.kb_chunks
  using hnsw (embedding extensions.vector_cosine_ops);

create index if not exists kb_chunks_content_search_idx
  on public.kb_chunks
  using gin (content_search);

create or replace function public.match_kb_chunks(
  query_embedding extensions.vector(1024),
  match_count integer default 10,
  filter_recipe_entity_id uuid default null,
  filter_chunk_types text[] default null
)
returns table (
  id uuid,
  document_id uuid,
  recipe_entity_id uuid,
  source_id uuid,
  recipe_name text,
  chunk_type text,
  chunk_index integer,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  select
    c.id,
    c.document_id,
    c.recipe_entity_id,
    d.source_id,
    d.recipe_name,
    c.chunk_type,
    c.chunk_index,
    c.content,
    c.metadata,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.kb_chunks as c
  join public.kb_documents as d on d.id = c.document_id
  where c.embedding is not null
    and (filter_recipe_entity_id is null or c.recipe_entity_id = filter_recipe_entity_id)
    and (filter_chunk_types is null or c.chunk_type = any(filter_chunk_types))
  order by c.embedding <=> query_embedding
  limit greatest(1, least(coalesce(match_count, 10), 100));
$$;

revoke all on function public.match_kb_chunks(extensions.vector, integer, uuid, text[]) from public, anon, authenticated;
grant execute on function public.match_kb_chunks(extensions.vector, integer, uuid, text[]) to service_role;

notify pgrst, 'reload schema';
