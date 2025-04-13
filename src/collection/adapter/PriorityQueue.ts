import { Vector } from "../linear";
import { AdapterCollection } from "./AdapterCollection";
import { pushHeap, popHeap } from "../../algorithm";
import { Comparator, less } from "../../functional";

export class PriorityQueue<T>
    extends AdapterCollection<
        T,
        Vector<T>
    >
{
    protected readonly _src: Vector<T> = new Vector();

    constructor(
        public readonly comp: Comparator<T> = less<T>
    ) { super(); }

    push(val: T) {
        this._src.push(val);

        if(this.size >= 2)
            pushHeap(this._src.begin(), this._src.end(), this.comp);
    }

    pop(): T {
       const tmp = this._src.front();

       if (this.size > 1)
           popHeap(this._src.begin(), this._src.end(), this.comp);

       this._src.pop();
       return tmp;
    }

    front() {
        return this._src.front();
    }

}