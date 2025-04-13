import { Callable } from "./Callable";
import { Task } from "./Async";

export type Pipe<Fs extends Callable[]>
    = Fs extends [infer F extends Callable, ...infer Rest extends Callable[]]
    ? Rest extends [...infer _, infer G extends Callable]
        ? (...args: Parameters<F>) => ReturnType<G> : F
    : () => void;

export type AsyncPipe<Fs extends Callable[]>
    = Fs extends [infer F extends Callable, ...infer Rest extends Callable[]]
    ? Rest extends [...infer _, infer G extends Callable]
        ? (...args: Parameters<F>) => Promise<Awaited<ReturnType<G>>>
        : Task<F>
    : () => Promise<void>;

export function pipe<Fs extends Callable[]>(...fs: Fs): Pipe<Fs> {

    return function (...args: Parameters<Fs[0]>) {
        let result = fs[0](...args);

        for (let i = 1; i !== fs.length; ++i)
            result = fs[i](result);

        return result;
    } as Pipe<Fs>;

}

export function pipeAsync<Fs extends Callable[]>(...fs: Fs): AsyncPipe<Fs> {

    return async function (...args: Parameters<Fs[0]>) {
        let result = fs[0](...args);

        for (let i = 1; i !== fs.length; ++i) {
            result = fs[i](await result);
        }

        return result;
    } as AsyncPipe<Fs>;

}

