import { Predicate, Task } from "../functional";

export function* _filter<T>(
    pred: Predicate<T>,
    data: Iterable<T>
) {
    for (const x of data)
        if (pred(x)) yield x;
}

export async function* _asyncFilter<T>(
    pred: Predicate<T> | Task<Predicate<T>>,
    data: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>
) {
    for await (const x of data)
        if (await pred(x)) yield x;
}



