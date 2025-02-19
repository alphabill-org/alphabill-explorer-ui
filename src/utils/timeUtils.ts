export function computeTimeAgo(timestampSec: number): string {
  const now = Date.now();
  const past = timestampSec * 1000;
  const diff = now - past;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export const formatTimeout = (timeout: string | number): string => {
  const seconds = typeof timeout === 'string' ? parseInt(timeout) : timeout;
  if (isNaN(seconds)) return 'N/A';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes > 0 ? `${minutes} min ${secs} sec` : `${secs} sec`;
};
