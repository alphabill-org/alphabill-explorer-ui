import {
  intervalToDuration,
  formatDistanceToNowStrict,
  formatDuration,
} from 'date-fns';

export function computeTimeAgo(timestampSec: number): string {
  return formatDistanceToNowStrict(new Date(timestampSec * 1000), {
    addSuffix: true,
  });
}

export const formatTimeout = (timeout: string | number): string => {
  const totalSeconds: number =
    typeof timeout === 'string' ? parseInt(timeout, 10) : timeout;
  if (isNaN(totalSeconds)) return 'N/A';

  const duration = intervalToDuration({ end: totalSeconds * 1000, start: 0 });

  return formatDuration(duration, {
    format: ['years', 'days', 'hours', 'minutes', 'seconds'],
  });
};
