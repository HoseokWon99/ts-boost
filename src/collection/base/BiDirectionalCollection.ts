import { Collection } from "./Collection";
import { IBiDirectionalPointer, ReversePointer } from "../../pointer";

export abstract class BiDirectionalCollection<
    T,
    PointerT extends IBiDirectionalPointer<T, PointerT>
> extends Collection<T, PointerT> {
    abstract rbegin(): ReversePointer<T, PointerT>;
    abstract rend(): ReversePointer<T, PointerT>;

    crbegin(): Readonly<ReversePointer<T, PointerT>> {
        return this.rbegin();
    }

    crend(): Readonly<ReversePointer<T, PointerT>> {
        return this.rend();
    }

    *reversed() {
        const p = this.rbegin();

        while (p.notNull() && !p.equals(this.rend())) {
            yield p.value;
            p.next();
        }
    }

}

export namespace BiDirectionalCollection {

    export type PointerType<
        CollectionT extends BiDirectionalCollection<any, any>
    > = CollectionT extends BiDirectionalCollection<
        Collection.ValueType<CollectionT>,
        infer PointerT extends IBiDirectionalPointer<
            Collection.ValueType<CollectionT>,
            PointerT
        >
    > ? PointerT : never;

}