import { Callable } from "./Callable";

type LastParams<Fs extends Callable[]>
    = Fs extends [...infer _, infer F extends Callable]
    ? Parameters<F> : [];

export type Compose<Fs extends Callable[]>
    = Fs extends [infer F extends Callable, ...infer Rest extends Callable[]]
    ? LastParams<Rest> extends []
        ? F : (...args: LastParams<Rest>) => ReturnType<F>
    : () => void;

export function compose<Fs extends Callable[]>(...fs: Fs): Compose<Fs> {

    return function (...args: LastParams<Fs>) {
        let result = fs[fs.length - 1](...args);

        for (let i = fs.length - 2; i >= 0; --i)
            result = fs[i](result);

        return result;

    } as Compose<Fs>;
}

