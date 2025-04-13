import { Callable } from "../functional";
import { Nullable } from "./Null";


export class Optional<T> {
    constructor(private readonly _val: Nullable<T>) {}

    static of<T>(val: T) {
        return new Optional(val);
    }

    static ofNull<T>() {
        return new Optional<T>(null);
    }

    exists(): boolean {
        return this._val !== undefined && this._val !== null;
    }

    empty(): boolean {
        return this._val === undefined || this._val === null;
    }

    get value(): T {
        return this._val!;
    }

    valueOr(defaultValue: T): T {
        return this.exists() ? this.value : defaultValue;
    }

    orElse<F extends Callable>(
        f: F,
        ...args: Parameters<F>
    ): T | ReturnType<F> {
        return this.exists() ? this.value : f(...args);
    }

    orElseThrow<
        _Error extends Error,
        _ErrorC extends { new (...args: any[]): _Error; }
    >(
        Err: _ErrorC,
        ...args: ConstructorParameters<_ErrorC>
    ) {
        if (this.empty()) throw new Err(...args);
        return this.value;
    }
}


