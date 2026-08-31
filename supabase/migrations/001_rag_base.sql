create extension if not exists pgcrypto with schema extensions;
create extension if not exists vector with schema extensions;

create table if not exists public.kb_sources (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('website', 'book')),
  name text not null,
  base_url text,
  title text,
  author text,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists kb_sources_website_base_url_uidx
  on public.kb_sources (base_url)
  where source_type = 'website' and base_url is not null;

create unique index if not exists kb_sources_book_identity_uidx
  on public.kb_sources (name, coalesce(title, ''), coalesce(author, ''))
  where source_type = 'book';

create table if not exists public.kb_recipe_entities (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null,
  aliases text[] not null default '{}'::text[],
  category text not null check (category in ('chinese', 'western')),
  cuisine text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (canonical_name, category)
);

create table if not exists public.kb_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.kb_sources(id),
  recipe_entity_id uuid references public.kb_recipe_entities(id),
  source_type text not null check (source_type in ('website', 'book')),
  recipe_name text not null,
  url text,
  book_title text,
  page_start integer check (page_start is null or page_start > 0),
  page_end integer check (page_end is null or page_end >= page_start),
  raw_text text not null,
  normalized_json jsonb not null,
  content_hash text not null,
  retrieved_at timestamptz not null,
  ingested_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique (source_id, content_hash)
);

create index if not exists kb_documents_recipe_entity_idx
  on public.kb_documents (recipe_entity_id);

create index if not exists kb_documents_recipe_name_idx
  on public.kb_documents (recipe_name);

create table if not exists public.kb_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.kb_documents(id) on delete cascade,
  recipe_entity_id uuid references public.kb_recipe_entities(id),
  chunk_type text not null check (chunk_type in ('summary', 'ingredients', 'steps', 'technique', 'tips')),
  chunk_index integer not null default 0 check (chunk_index >= 0),
  content text not null,
  content_hash text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding_model text,
  embedding_version text,
  embedding_dim integer,
  created_at timestamptz not null default now(),
  unique (document_id, chunk_type, chunk_index)
);

create index if not exists kb_chunks_document_idx
  on public.kb_chunks (document_id);

create index if not exists kb_chunks_recipe_entity_idx
  on public.kb_chunks (recipe_entity_id);

alter table public.kb_sources enable row level security;
alter table public.kb_recipe_entities enable row level security;
alter table public.kb_documents enable row level security;
alter table public.kb_chunks enable row level security;

revoke all on table public.kb_sources from anon, authenticated;
revoke all on table public.kb_recipe_entities from anon, authenticated;
revoke all on table public.kb_documents from anon, authenticated;
revoke all on table public.kb_chunks from anon, authenticated;

grant select, insert, update, delete on table public.kb_sources to service_role;
grant select, insert, update, delete on table public.kb_recipe_entities to service_role;
grant select, insert, update, delete on table public.kb_documents to service_role;
grant select, insert, update, delete on table public.kb_chunks to service_role;

notify pgrst, 'reload schema';
