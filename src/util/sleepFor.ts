export function sleepFor(
    ms: number,
) {
    return new Promise<void>(
        resolve => setTimeout(resolve, ms)
    );
}