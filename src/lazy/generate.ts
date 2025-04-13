import { UnaryOp, UnaryFn } from "../functional";
import { Random } from "../util/Random";

export function* _generate<T>(func: UnaryOp<T>, init: T) {
    let x = init;

    while (true) {
        yield x;
        x = func(x);
    }
}

export function* _integers(init: number, step: number) {
    yield* _generate(n => n + step, init);
}

export function* _ascend(init: number = 0) {
    yield* _integers(init, 1);
}

export function* _descend(init: number = 0) {
    yield* _integers(init, -1);
}

export function* _string(init: string, step: 1 | -1) {
    for (const code of _integers(init.charCodeAt(0), step))
        yield String.fromCharCode(code);
}

export function* _randNum(
    a: number,
    b: number,
    safeMode: boolean = false
) {
    while (true) yield Random.randInt(a, b, safeMode);
}

export async function* _asyncGenerate<T>(
    func: UnaryFn<T, Promise<T>>,
    init: T
) {
    let x = init;

    while (true) {
        yield x;
        x = await func(x);
    }
}













