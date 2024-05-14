export function extractOffsetKey(linkHeader: string) {
  const match = linkHeader.match(/offsetKey=([^&]+)/);
  return match ? match[1] : ``;
}

export function shortenHash(
  hash: string,
  frontLength: number = 4,
  endLength: number = 4
): string {
  if (hash.length <= frontLength + endLength) {
    return hash;
  }
  const frontPart = hash.slice(0, frontLength);
  const endPart = hash.slice(-endLength); 
  return `${frontPart}...${endPart}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBigInt(value: any): boolean {
  try {
      BigInt(value); 
      return true; 
  } catch {
      return false;
  }
}