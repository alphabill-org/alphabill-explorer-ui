export function shortenHash(hash: string): string {
  if (!hash || hash.length <= 8) return hash;
  return `${hash.slice(0, 4)}-${hash.slice(-4)}`;
}
