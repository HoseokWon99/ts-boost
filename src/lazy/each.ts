import { UnaryFn } from "../functional";

export function* _each<T>(
    func: UnaryFn<T, any>,
    data: Iterable<T>
) {

    for (const x of data) {
        func(x);
        yield;
    }

}

export async function* _asyncEach<T>(
    func: UnaryFn<T, void | Promise<void>>,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    for await (const x of data) yield await func(x);
}