import { Sequence, Vector } from "../linear";
import { AdapterCollection } from "./AdapterCollection";

export class Queue<T>
    extends AdapterCollection<
        T,
        Sequence<T, any>
    >
{
    constructor(
        protected readonly _src: Sequence<T, any>
        = new Vector<T>()
    ) { super(); }

    push(val: T) {
        this._src.unshift(val);
    }

    pop(): T {
        const tmp = this._src.front();
        this._src.shift();
        return tmp;
    }

    front() {
        return this._src.front();
    }

}