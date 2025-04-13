import { IForwardPointer } from "../pointer";

export abstract class IterableBase<
    T,
    PointerT extends IForwardPointer<T, PointerT>
> implements Iterable<T>, AsyncIterable<T> {
    abstract begin(): PointerT;
    abstract end(): PointerT;

    cbegin(): Readonly<PointerT> {
        return this.begin();
    }

    cend(): Readonly<PointerT> {
        return this.end();
    }

    *[Symbol.iterator](): Iterator<T> {
        const p = this.begin();

        while (p.notNull() && !p.equals(this.end())) {
            yield p.value;
            p.next();
        }
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T> {
        yield* this;
    }

}

