export async function* _async<T>(data: Iterable<T>) {
    yield* data;
}

export async function* _await<T>(data: Iterable<Promise<T>>) {
    for (const x of data) yield await x;
}

