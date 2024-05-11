export function convertTimeToTimeAgo(timestampInSeconds: number): string {
    const now = Date.now();
    const eventTime = timestampInSeconds * 1000; // Convert from seconds to milliseconds
    const timeDifference = now - eventTime;

    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;

    if (timeDifference < millisecondsPerHour) {
        return `${Math.round(timeDifference / millisecondsPerMinute)} minutes ago`;
    } else if (timeDifference < millisecondsPerDay) {
        return `${Math.round(timeDifference / millisecondsPerHour)} hours ago`;
    } else {
        return `${Math.round(timeDifference / millisecondsPerDay)} days ago`;
    }
}