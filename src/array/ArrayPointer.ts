import { IArrayLike } from "./IArrayLike";
import { IRandomAccessPointer, RandomAccessReversePointer, Pointer } from "../pointer";

export class ArrayPointer<
    ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
> implements IRandomAccessPointer<
    IArrayLike.ValueType<ArrayT>,
    ArrayPointer<ArrayT>
> {
    constructor(
        private readonly _src: ArrayT,
        private _curr: number = 0
    ) {}

    notNull(): boolean {
        return this._curr >= 0 && this._curr < this._src.length;
    }

    equals(other: ArrayPointer<ArrayT>): boolean {
        return this._src === other._src && this._curr === other._curr;
    }

    clone(): ArrayPointer<ArrayT> {
        return new ArrayPointer(this._src, this._curr);
    }

    get source(): ArrayT {
        return this._src;
    }

    get index(): number {
        return this._curr;
    }

    get maxIndex(): number {
        return this._src.length - 1;
    }

    get value() {
        if (!this.notNull()) throw new RangeError();
        return this._src[this._curr];
    }

    set value(val) {
        if (!this.notNull()) throw new RangeError();
        this._src[this._curr] = val;
    }

    prev() {
        --this._curr;
        return this;
    }

    next() {
        ++this._curr;
        return this;
    }

    to(delta: number) {
        this._curr += delta;
        return this;
    }

}

export type ReverseArrayPointer<ArrayT extends IArrayLike<any>>
    = RandomAccessReversePointer<IArrayLike.ValueType<ArrayT>, ArrayPointer<ArrayT>>;

export namespace ArrayPointer {

    export function pointerAt<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT, idx: number) {
        return new ArrayPointer(arr, idx);
    }

    export function begin<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return new ArrayPointer(arr, 0);
    }

    export function end<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return new ArrayPointer(arr, arr.length);
    }

    export function cpointerAt<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT, idx: number) {
        return new ArrayPointer(arr, idx) as Readonly<ArrayPointer<ArrayT>>;
    }

    export function cbegin<
    ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return new ArrayPointer(arr, 0) as Readonly<ArrayPointer<ArrayT>>;
    }

    export function cend<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return new ArrayPointer(arr, arr.length) as Readonly<ArrayPointer<ArrayT>>;
    }

    export function rpointerAt<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT, idx: number): ReverseArrayPointer<ArrayT> {
        return Pointer.makeRandomAccessReverse(
            ArrayPointer<ArrayT>,
            arr,
            idx
        );
    }

    export function rbegin<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
       return ArrayPointer.rpointerAt(arr, arr.length - 1);
    }

    export function rend<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return ArrayPointer.rpointerAt(arr, -1);
    }

    export function crpointerAt<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT, idx: number): Readonly<ReverseArrayPointer<ArrayT>> {
        return ArrayPointer.rpointerAt(arr, idx);
    }

    export function crbegin<
        ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return ArrayPointer.crpointerAt(arr, arr.length - 1);
    }

    export function crend<
    ArrayT extends IArrayLike<IArrayLike.ValueType<ArrayT>>
    >(arr: ArrayT) {
        return ArrayPointer.crpointerAt(arr, -1);
    }


}

