import { Predicate } from "../functional";

export function* _while<T>(
    pred: Predicate<T>,
    data: Iterable<T>
) {
    for (const x of data) {
        if (pred(x)) break;
        yield x;
    }
}

export async function* _asyncWhile<T>(
    pred: Predicate<T>,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    for await (const x of data) {
        if (pred(x)) break;
        yield x;
    }
}

