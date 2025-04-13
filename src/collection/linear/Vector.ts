import { VectorBase } from "./VectorBase";
import { RandomAccessReversePointer, Pointer } from "../../pointer";
import { ArrayPointer } from "../../array";

class ArrayObject<T> {
    first: number = 0;
    length: number = 0;
    [index: number]: T;
}

export class Vector<T> extends VectorBase<T, Vector.Pointer<T>> {
   private readonly _data: ArrayObject<T> = new ArrayObject<T>();

   constructor(...vals: T[]) {
        super();
        this.add(...vals);
    }

    static of<T>(...vals: T[]):Vector<T> {
       return new Vector<T>(...vals);
    }

    get size(): number {
        return this._data.length;
    }

    at(idx: number) {
        if (idx < -this.size || idx >= this.size) throw RangeError();
        idx = idx >= 0 ? idx : this.size + idx;
        return this._data[idx + this._data.first];
    }

    set(idx: number, val: T) {
        if (idx < 0 || idx >= this.size) throw RangeError();
        this._data[idx + this._data.first] = val;
    }

    front(): T {
        return this._data[this._data.first];
    }

    back(): T {
        return this._data[this._data.first + this._data.length - 1];
    }

    pointerAt(idx: number): Vector.Pointer<T> {
        return new Vector.Pointer<T>(
            this._data,
            idx + this._data.first
        );
    }

    rpointerAt(idx: number): RandomAccessReversePointer<T, Vector.Pointer<T>> {
        return Pointer.makeRandomAccessReverse(
            Vector.Pointer<T>,
            this._data,
            idx + this._data.first
        );
    }

    push(val: T) {
       this._data[this._data.first + this._data.length++] = val;
    }

    pop() {
        if (this.size)
            delete this._data[this._data.first + (--this._data.length)];
    }

    unshift(val: T) {
        this._data[--this._data.first] = val;
        ++this._data.length;
    }

    shift() {
        if (!this.size) return;
        delete this._data[this._data.first++];
        --this._data.length;
    }

    insert(pos: Vector.Pointer<T>, val: T): Vector.Pointer<T> {
        this.insertAt(pos.index, val);
        const tmp = pos.clone();
        tmp.prev();
        return tmp;
    }

    erase(pos: Vector.Pointer<T>) {
       this.eraseAt(pos.index);
       return pos.next();
    }

    insertAt(pos: number, val: T) {
        if (pos < 0 || pos > this.size) throw RangeError();

        if (pos < this.size / 2) {
            let i = --this._data.first;

            while (i !== pos + this._data.first) {
                this._data[i] = this._data[i+1];
                ++i;
            }

            this._data[i] = val;
        }
        else {
            let i = this._data.first + this._data.length;

            while (i !== pos + this._data.first) {
                this._data[i] = this._data[i-1];
                --i;
            }

            this._data[i] = val;
        }

        ++this._data.length;
    }

    eraseAt(pos: number) {
        if (pos < 0 || pos >= this.size) throw RangeError();
        let i = pos + this._data.first;

        if (i < this.size / 2) {

            while (i !== this._data.first) {
                this._data[i] = this._data[i-1];
                --i;
            }

            this.shift();
        }
        else {

            while (i !== this._data.length - 1) {
                this._data[i] = this._data[i+1];
                ++i;
            }

            this.pop();
        }
    }


}

export namespace Vector {

    export class Pointer<T> extends ArrayPointer<ArrayObject<T>>{

        constructor(src: ArrayObject<T>, curr: number) {
            super(src, curr);
        }

        notNull(): boolean {
            return super.index >= super.source.first &&
                super.index < super.source.first + super.source.length;
        }

        equals(other: Vector.Pointer<T>): boolean {
            return super.equals(other);
        }

        clone(): Vector.Pointer<T> {
            return new Vector.Pointer<T>(
                super.source, super.index
            );
        }

        get index(): number {
            return super.index - super.source.first;
        }

    }

    

}

