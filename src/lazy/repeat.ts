import { _take } from "./take";

export function* _repeat<T>(val: T) {
    while (true) yield val;
}

export function* _repeatN<T>(n: number, val: T) {
    yield* _take(n, _repeat(val));
}



