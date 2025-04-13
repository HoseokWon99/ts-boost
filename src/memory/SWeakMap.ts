import { ISize } from "../base";

export class SWeakMap<K extends object, V> implements ISize{
    private readonly _weak = new WeakMap<K, V>();
    private _size: number = 0;

    set(key: K, value: V): void {
        this._weak.has(key) || ++this._size;
        this._weak.set(key, value);
    }

    has(key: K): boolean {
        return this._weak.has(key);
    }

    get(key: K): V | undefined {
        return this._weak.get(key);
    }

    delete(key: K): void {

        if (this._weak.has(key)) {
            this._weak.delete(key);
            --this._size;
        }

    }

    get size(): number {
        return this._size;
    }

}