import { Collection } from "../base";

export abstract class AdapterCollection<
    T,
    SourceT extends Collection<T, any>
> implements Iterable<T>, AsyncIterable<T>
{
    protected abstract _src: SourceT;
    abstract push(val: T): void;
    abstract pop(): T;

    get size(): number {
        return this._src.size;
    }

    empty(): boolean {
        return this._src.empty();
    }

    add(...vals: T[]) {
        for (const val of vals)
            this.push(val);
    }

    emplace<
        ConstructorT extends { new (...args: any[]): T; }
    >(
        TC: ConstructorT,
        ...args: ConstructorParameters<ConstructorT>
    ) {
        this.push(new TC(...args));
    }

    *[Symbol.iterator]() {
        yield* this._src;
    }

    async *[Symbol.asyncIterator]() {
        yield* this._src;
    }

}