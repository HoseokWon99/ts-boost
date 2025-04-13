import { IterableBase } from "../../iterable";
import { IForwardPointer } from "../../pointer";

export abstract class Collection<
    T,
    PointerT extends IForwardPointer<T, PointerT>
> extends IterableBase<T, PointerT> {
    abstract get size(): number;
    abstract add(...vals: T[]): void;
    abstract erase(pos: PointerT): PointerT;
    abstract clear(): void;

    emplace<
        ConstructorT extends { new (...args: any[]): T; }
    >(
        TC: ConstructorT,
        ...args: ConstructorParameters<ConstructorT>
    ) {
        this.add(new TC(...args));
    }

    empty(): boolean {
        return !this.size;
    }

    log() {
        console.log([...this]);
    }

}

export namespace Collection {

    export type ValueType<CollectionT extends Collection<any, any>>
        = CollectionT extends Collection<infer T, any> ? T : never;

    export type PointerType<CollectionT extends Collection<any, any>>
        = CollectionT extends Collection<
            infer _,
            infer PointerT extends  IForwardPointer<infer _, PointerT>
        > ? PointerT : never;

}