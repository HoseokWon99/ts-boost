import { Callable } from "./Callable";

export function partial<F extends Callable>(
    f: F,
    ...args: Partial<Parameters<F>>
) {
    return function (...rest: Partial<Parameters<F>>): ReturnType<F> {
        return f(...args, ...rest);
    }
}

export function partialRight<F extends Callable>(
    f: F,
    ...args: Partial<Parameters<F>>
) {
    return function (...rest: Partial<Parameters<F>>): ReturnType<F> {
        return f(...rest, ...args);
    }
}

