import { IDisposable, IAsyncDisposable  } from "../base";

export function createDisposable<
    DisposableT extends IDisposable,
    DisposableConstructor extends  { new (...args: any[]): DisposableT; }
>(
    Disposable: DisposableConstructor,
    ...args: ConstructorParameters<DisposableConstructor>
) {
    const disposable = new Disposable(...args);

    return {
        disposable,
        [Symbol.dispose]() {
            disposable.dispose();
        }
    };
}

export function makeDisposable<O extends object>(
    obj: O,
    close: (x: O) => any
) {
    return {
        obj,
        [Symbol.dispose]() {
            close(obj);
        }
    }
}

export function createAsyncDisposable<
    AsyncDisposableT extends IAsyncDisposable,
    AsyncDisposableConstructor extends { new (...args: any[]): AsyncDisposableT; }
>(
    AsyncDisposable: AsyncDisposableConstructor,
    ...args: ConstructorParameters<AsyncDisposableConstructor>
) {
    const asyncDisposable = new AsyncDisposable(...args);

    return {
        asyncDisposable,
        async [Symbol.asyncDispose]() {
            await asyncDisposable.close();
        }
    };
}

export function makeAsyncDisposable<O extends object>(
    obj: O,
    close: (x: O) => Promise<any>
) {
    return {
        obj,
        async [Symbol.asyncDispose]() {
            await close(obj);
        }
    }
}