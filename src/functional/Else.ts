import { Callable } from "./Callable";

export function ifElse<
    Cond extends (...args: any[]) => boolean,
    T, U
>(cond: Cond, f: () => T, g: () => U) {
    return function (...args: Parameters<Cond>) {
        return cond(...args) ? f() : g();
    }
}

export function orElse<
    F extends Callable, U
>(f: F, g: (err: any) => U) {

    return function (...args: Parameters<F>) : ReturnType<F> | U {
        try {
            return f(...args);
        }
        catch (e) {
            return g(e);
        }
    }

}