import { Sequence } from "./Sequence";
import { IRandomAccessPointer, RandomAccessReversePointer } from "../../pointer";

export abstract class VectorBase<
    T,
    PointerT extends IRandomAccessPointer<T, PointerT>
> extends Sequence<T, PointerT> {
    abstract at(idx: number): T;
    abstract set(idx: number, val: T): void;
    abstract pointerAt(idx: number): PointerT;
    abstract rpointerAt(idx: number): RandomAccessReversePointer<T, PointerT>;

    get length(): number {
        return this.size;
    }

    cpointerAt(idx: number): Readonly<PointerT> {
        return this.pointerAt(idx);
    }

    crpointerAt(idx: number): Readonly<RandomAccessReversePointer<T, PointerT>> {
        return this.rpointerAt(idx);
    }

    begin(): PointerT {
        return this.pointerAt(0);
    }

    end(): PointerT {
        return this.pointerAt(this.size);
    }

    rbegin(): RandomAccessReversePointer<T, PointerT> {
        return this.rpointerAt(this.size-1);
    }

    rend(): RandomAccessReversePointer<T, PointerT> {
        return this.rpointerAt(-1);
    }

}

