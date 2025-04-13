import { UnaryFn } from "../functional";

export function* _map<T, U>(
    mapper: UnaryFn<T, U>,
    data: Iterable<T>
) {
    for (const x of data) yield mapper(x);
}

export async function* _asyncMap<T, U>(
    mapper: UnaryFn<T, U | Promise<U>>,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    for await (const x of data) yield mapper(x);
}

