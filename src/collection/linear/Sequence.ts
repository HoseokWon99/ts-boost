import { BiDirectionalCollection } from "../base";
import { IBiDirectionalPointer, ReversePointer } from "../../pointer";

export abstract class Sequence<
    T,
    PointerT extends IBiDirectionalPointer<T, PointerT>,
    ReversePointerT = ReversePointer<T, PointerT>
> extends BiDirectionalCollection<T, PointerT> {
    abstract get size(): number;
    abstract front(): T;
    abstract back(): T;
    abstract push(val: T): void;
    abstract pop(): void;
    abstract unshift(val: T): void;
    abstract shift(): void;
    abstract insert(pos: PointerT, val: T): PointerT;

    add(...vals: T[]) {
        for (const val of vals) this.push(val);
    }

    addFront(...vals: T[]) {
        for (const val of vals) this.unshift(val);
    }

    addBack(...vals: T[]) {
        for (const val of vals) this.push(val);
    }

    emplaceFront<
        ConstructorT extends { new (...args: any[]): T; }
    >(
        TC: ConstructorT,
        ...args: ConstructorParameters<ConstructorT>
    ) {
        this.unshift(new TC(...args));
    }

    emplaceBack<
        ConstructorT extends { new (...args: any[]): T; }
    >(
        TC: ConstructorT,
        ...args: ConstructorParameters<ConstructorT>
    ) {
        this.push(new TC(...args));
    }

    clear() {
        while (this.size) this.pop();
    }

    

}