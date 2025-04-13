import { AdapterCollection } from "./AdapterCollection";
import { Sequence, Vector } from "../linear";

export class Stack<
    T
> extends AdapterCollection<
    T,
    Sequence<T, any>
> {
    constructor(
        protected readonly _src: Sequence<T, any>
        = new Vector<T>()
    ) { super(); }

    push(val: T): void {
        this._src.push(val);
    }

    pop(): T {
        const tmp = this._src.back();
        this._src.pop();
        return tmp;
    }

    top() {
        return this._src.back();
    }
}