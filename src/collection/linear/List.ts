import { Sequence } from "./Sequence";
import { IBiDirectionalPointer, ReversePointer, Pointer } from "../../pointer";
import { SWeakSet } from "../../memory";
import { Comparator, greater } from "../../functional";

class Node<T> {

    constructor(
        public value: T,
        public prev?: Node<T>,
        public next?: Node<T>
    ) {}

    delete(): void {
        this.prev && (this.prev!.next = this.next);
        this.next && (this.next!.prev = this.prev);
    }

    emplaceFront(val: T): void {
        const newNode = new Node(val, this.prev, this);
        this.prev && (this.prev!.next = newNode);
        this.prev = newNode;
    }

    emplaceBack(val: T): void {
        const newNode = new Node(val, this, this.next);
        this.next && (this.next!.prev = newNode);
        this.next = newNode;
    }

}

export class List<T> extends Sequence<T, List.Pointer<T>>{
    private readonly _nodes: SWeakSet<Node<T>> = new SWeakSet();
    private readonly _lbound: Node<T>;
    private readonly _rbound: Node<T>;
    private readonly _end: List.Pointer<T>;
    private readonly _rend: ReversePointer<T, List.Pointer<T>>;

    constructor(...vals: T[]) {
        super();

        this._lbound = this._rbound = new Node<T>(undefined as unknown as T);
        this._lbound.next = this._rbound;
        this._rbound.prev = this._lbound;

        this._end = new List.Pointer<T>(this, this._rbound);
        this._rend = Pointer.makeReverse(List.Pointer<T>, this, this._lbound);

        for (const val of vals)
            this.push(val);
    }

    static of<T>(...vals: T[]): List<T> {
        return new List<T>(...vals);
    }

    get size() {
        return this._nodes.size;
    }

    add(...vals: T[]): void {
        for (const val of vals) this.push(val);
    }

    begin() {
        return new List.Pointer<T>(this, this._lbound.next!);
    }

    end(): List.Pointer<T> {
        return this._end;
    }

    rbegin() {
        return Pointer.makeReverse(List.Pointer<T>, this, this._rbound.prev!);
    }

    rend(): ReversePointer<T, List.Pointer<T>> {
        return this._rend;
    }

    front(): T {
        if (!this._nodes.size) throw new RangeError();
        return this._lbound.next!.value;
    }

    back(): T {
        if (!this._nodes.size) throw new RangeError();
        return this._rbound.prev!.value;
    }

    push(val: T) {
       this.insertFront(this._rbound, val);
    }

    unshift(val: T) {
       this.insertBack(this._lbound, val);
    }

    pop() {
       this._nodes.size > 0 && this.delete(this._rbound.prev!);
    }

    shift() {
        this._nodes.size > 0 && this.delete(this._lbound.next!);
    }

    insert(pos: List.Pointer<T>, val: T): List.Pointer<T> {
        this.insertFront(pos.current, val);
        return new List.Pointer<T>(this, pos.current.prev!);
    }

    erase(pos: List.Pointer<T>) {

        if (pos.notNull()) {
            const tmp = pos.current;
            pos = pos.next();
            this.delete(tmp);
        }

        return pos;
    }

    sort(
        comp: Comparator<T> = greater<T>
    ) {
        if (!this.size) return;

        const arr = [...this];
        arr.sort((a, b) => comp(a, b) ? -1 : 1);

        const p = this.begin();

        for (const val of arr) {
            if (!p.notNull()) break;
            p.value = val;
            p.next();
        }
    }

    *sorted(
        comp: (a: T, b: T) => boolean = (a: T, b: T) => a < b
    ): Iterator<T> {
        this.sort(comp);
        for (const val of this) yield val;
    }

    private insertFront(node: Node<T>, val: T) {
        node.emplaceFront(val);
        this._nodes.add(node.prev!);
    }

    private insertBack(node: Node<T>, val: T) {
        node.emplaceBack(val);
        this._nodes.add(node.next!);
    }

    private delete(node: Node<T>): void {
        node.delete();
        this._nodes.delete(node);
    }

}



export namespace List {

    export class Pointer<T> implements IBiDirectionalPointer<T, List.Pointer<T>>{

        constructor(
            private readonly _source: List<T>,
            private _curr: Node<T>
        ) {}

        notNull(): boolean {
            return this._curr.value !== undefined;
        }

        equals(other: List.Pointer<T>): boolean {
            return this._curr === other._curr;
        }

        get current()  {
            return this._curr;
        }

        get value(): T {
            if (!this._curr) throw new RangeError();
            return this._curr!.value;
        }

        set value(val: T) {
            if (!this._curr) throw new RangeError();
            this._curr!.value = val;
        }

        clone(): List.Pointer<T> {
            return new List.Pointer(
                this._source, this._curr
            );
        }

        next() {
            this._curr.next && (this._curr = this._curr.next!);
            return this;
        }

        prev() {
           this._curr.prev && (this._curr = this._curr.prev!);
           return this;
        }

    }

}


