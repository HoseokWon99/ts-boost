import { Predicate } from "../functional";

export function _every<T>(
    pred: Predicate<T>,
    data: Iterable<T>
) {

    for (const x of data)
        if (!pred(x)) return false;

    return true;
}

export function _some<T>(
    pred: Predicate<T>,
    data: Iterable<T>
) {

    for (const x of data)
        if (pred(x)) return true;

    return false;
}

