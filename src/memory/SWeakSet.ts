import { ISize } from "../base";

export class SWeakSet<O extends object> implements ISize {
    private readonly _weak = new WeakSet<O>();
    private _size: number = 0;

    get size(): number {
        return this._size;
    }

    add(obj: O): void {

        if (!this._weak.has(obj)) {
            this._weak.add(obj);
            ++this._size;
        }

    }

    delete(obj: O): void {

        if (this._weak.has(obj)) {
            this._weak.delete(obj);
            --this._size;
        }

    }

    has(obj: O): boolean {
        return this._weak.has(obj);
    }
}