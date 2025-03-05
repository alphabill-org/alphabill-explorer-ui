import { formatDistanceToNowStrict } from 'date-fns';

export function computeTimeAgo(timestampSec: number): string {
  return formatDistanceToNowStrict(new Date(timestampSec * 1000), {
    addSuffix: true,
  });
}
