import { IRandomAccessPointer } from "./IRandomAccessPointer";
import { ReversePointer } from "./ReversePointer";

export class RandomAccessReversePointer<
    T,
    PointerT extends IRandomAccessPointer<T, PointerT>
> extends ReversePointer<T, PointerT>
implements IRandomAccessPointer<T, RandomAccessReversePointer<T, PointerT>>{
    constructor(curr: PointerT) { super(curr); }

    equals(other: RandomAccessReversePointer<T, PointerT>): boolean {
        return this._curr.equals(other._curr);
    }

    clone(): RandomAccessReversePointer<T, PointerT> {
        return new RandomAccessReversePointer<T, PointerT>(
            this._curr.clone()
        );
    }

    get index() {
        return this._curr.maxIndex - this._curr.index;
    }

    get maxIndex(): number {
        return this._curr.maxIndex;
    }

    to(delta: number): this {
        this._curr = this._curr.to(-delta);
        return this;
    }

}