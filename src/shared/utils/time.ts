export function convertTimeToTimeAgo(timestampInSeconds: bigint): string {
    const now = BigInt(Date.now());
    const eventTime = timestampInSeconds * 1000n; // Convert from seconds to milliseconds
    const timeDifference = now - eventTime;

    const millisecondsPerMinute = 60n * 1000n;
    const millisecondsPerHour = 60n * millisecondsPerMinute;
    const millisecondsPerDay = 24n * millisecondsPerHour;

    if (timeDifference < millisecondsPerHour) {
        return `${timeDifference / millisecondsPerMinute} minutes ago`;
    } else if (timeDifference < millisecondsPerDay) {
        return `${timeDifference / millisecondsPerHour} hours ago`;
    } else {
        return `${timeDifference / millisecondsPerDay} days ago`;
    }
}
