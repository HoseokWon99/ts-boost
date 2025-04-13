import { Callable } from "./Callable";
import { Task } from "./Async";

type LastParams<Fs extends Callable[]>
    = Fs extends [...infer _, infer F extends Callable]
    ? Parameters<F> : [];

export type Compose<Fs extends Callable[]>
    = Fs extends [infer F extends Callable, ...infer Rest extends Callable[]]
    ? LastParams<Rest> extends []
        ? F
        : (...args: LastParams<Rest>) => ReturnType<F>
    : () => void;

export type AsyncCompose<Fs extends Callable[]>
    = Fs extends [infer F extends Callable, ...infer Rest extends Callable[]]
    ? LastParams<Rest> extends []
        ? Task<F>
        : (...args: LastParams<Rest>) => Promise<Awaited<ReturnType<F>>>
    : () => Promise<void>;

export function compose<Fs extends Callable[]>(...fs: Fs): Compose<Fs> {

    return function (...args: LastParams<Fs>) {
        let result = fs[fs.length - 1](...args);

        for (let i = fs.length - 2; i >= 0; --i)
            result = fs[i](result);

        return result;

    } as Compose<Fs>;
}

export function composeAsync<
    Fs extends Callable[]
>(...fs: Fs): AsyncCompose<Fs> {

    return async function (...args: LastParams<Fs>) {
        let result = fs[fs.length - 1](...args);

        for (let i = fs.length - 2; i >= 0; --i)
            result = fs[i](await result);

        return result;

    } as AsyncCompose<Fs>;
}

