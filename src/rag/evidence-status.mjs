const excludedStatuses = new Set(["invalid", "superseded", "rejected"]);

// Historical rows remain available for audit, not as current recipe evidence.
// Mark both the document and its chunks, since RPC results carry chunk metadata.
export function isUsableEvidenceChunk(chunk) {
  return !excludedStatuses.has(chunk?.metadata?.evidenceStatus);
}
