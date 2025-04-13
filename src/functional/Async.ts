import { Callable } from "./Callable";

export type Task<F extends Callable>
    = (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>;

