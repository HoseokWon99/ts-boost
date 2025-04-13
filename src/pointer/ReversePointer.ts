import { IBiDirectionalPointer } from "./IBiDirectionalPointer";

export class ReversePointer<
    T,
    PointerT extends IBiDirectionalPointer<T, PointerT>
> implements IBiDirectionalPointer<T, ReversePointer<T, PointerT>> {
    constructor(protected _curr: PointerT) {}

    get value() {
        return this._curr.value;
    }

    set value(val: T) {
        this._curr.value = val;
    }

    notNull(): boolean {
        return this._curr.notNull();
    }

    clone(): ReversePointer<T, PointerT> {
        return new ReversePointer<T, PointerT>(this._curr.clone())
    }

    next() {
        this._curr = this._curr.prev();
        return this;
    }

    prev() {
        this._curr = this._curr.next();
        return this;
    }

    equals(other: ReversePointer<T, PointerT>): boolean {
        return this._curr.equals(other._curr);
    }

}

