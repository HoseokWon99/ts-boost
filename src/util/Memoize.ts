import { Callable } from "../functional";

export class Memoize<F extends Callable> {
    private readonly _cache: Map<Parameters<F>, ReturnType<F>> = new Map();
    constructor(private readonly _func: F) {}

    get(...args: Parameters<F>): ReturnType<F> {

        if (!this._cache.has(args))
            this._cache.set(args, this._func(...args));

        return this._cache.get(args)!;
    }
}

export function memoize<F extends Callable>(f: F): Memoize<F> {
    return new Memoize(f);
}

