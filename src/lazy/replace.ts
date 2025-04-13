export function* _replace<T>(tg: T, rep: T, data: Iterable<T>) {
    for (const x of data)
        yield x === tg ? rep : x;
}

export async function* _asyncReplace<T>(
    tg: T,
    rep: T,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    for await (const x of data)
        yield x === tg ? rep : x;
}