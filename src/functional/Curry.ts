import { Callable } from "./Callable";

export type Curry<F extends Callable> = F extends (...args: infer A) => infer R
    ? A extends [infer First, ...infer Rest]
        ? (arg: First) => Curry<(...args: Rest) => R>
        : R
    : never;

export function curry<F extends Callable>(f: F): Curry<F> {
    return function curried(...args: any[]) {
        return args.length >= f.length ?
            f(...args) : (...rest: any[]) => curried(...args, ...rest);
    } as Curry<F>;
}



