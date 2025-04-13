import { BinaryOp, BinaryFn } from "../functional";

export function _reduce<T>(
    func: BinaryOp<T>,
    init: T,
    data: Iterable<T>
) {
    let result = init;
    for (const x of data) result = func(result, x);
    return result;
}

export async function _asyncReduce<T>(
    func: BinaryFn<T, Promise<T>>,
    init: T,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    let result = init;
    for await (const x of data) result = await func(result, x);
    return result;
}

