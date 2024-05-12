export function extractOffsetKey(linkHeader : string) {
    const match = linkHeader.match(/offsetKey=([^&]+)/);
    return match ? match[1] : ``;
  }