import { ArrayPointer } from "../../array";
import { UnaryFn } from "../../functional";
import { Collection } from "../base";

export abstract class HashCollection<E, K>
    extends Collection<E, HashCollection.Pointer<E>>
{
    protected readonly _dict: Map<K, number> = new Map();
    protected readonly _data: E[] = new Array<E>();
    constructor(protected readonly extractKey: UnaryFn<E, K>) { super(); }

    get size(): number {
        return this._data.length;
    }

    add(...entries: E[]) {

        for (const entry of entries) {
            const key = this.extractKey(entry);
            const idx = this._dict.get(key);

            if (idx === undefined) {
                this._data.push(entry);
                this._dict.set(key, this._data.length - 1);
            }
        }

    }

    begin(): HashCollection.Pointer<E> {
        return ArrayPointer.begin(this._data);
    }

    end(): HashCollection.Pointer<E> {
        return ArrayPointer.end(this._data);
    }

    clear() {
        this._dict.clear();
        this._data.length = 0;
    }

    has(key: K): boolean {
        return this._dict.has(key);
    }

    delete(key: K): void {
        const idx = this._dict.get(key);

        if (idx !== undefined) {
            const last = this._data.length - 1;

            if (idx !== last) {
                let tmp = this._data[idx];
                this._data[idx] = this._data[last];
                this._data[last] = tmp;
                this._dict.set(this.extractKey(tmp), idx);
            }

            this._data.pop();
            this._dict.delete(key);
        }
    }

    find(key: K): HashCollection.Pointer<E> {
        const idx = this._dict.get(key);

        return typeof idx === 'number' ?
            ArrayPointer.pointerAt(this._data, idx) :
            ArrayPointer.end(this._data);
    }

    insert(e: E): HashCollection.Pointer<E> {
       this.add(e);
       return ArrayPointer.pointerAt(this._data, this._data.length - 1);
    }

    erase(pos: HashCollection.Pointer<E>) {
        this.delete(this.extractKey(pos.value));
        return pos;
    }

    entries(): E[] {
        return [...this._data];
    }

}

export namespace HashCollection {
    export type Pointer<T> = Omit<ArrayPointer<T[]>, "prev" | "to" | "index" | "source">;
}