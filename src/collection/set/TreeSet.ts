import { TreeCollection } from "../tree";
import { RBNode, RBTree } from "../tree/internal/RBTree";
import { ISetCollection } from "./ISetCollection";
import { Comparator, greater, identity } from "../../functional";

export class TreeSet<T>
    extends TreeCollection<RBNode<T, T>>
    implements ISetCollection<T>
{
    protected readonly _tree: RBTree<T, T>;

    constructor(
        data: Iterable<T> = [],
        comp: Comparator<T> = greater<T>
    ) {
        super();
        this._tree = new RBTree(identity<T>, comp);
        this.add(...data);
    }

    static from<T>(
        data: Iterable<T>,
        comp: Comparator<T> = greater<T>
    ): TreeSet<T> {
        return new TreeSet(data, comp);
    }

    static of<T>(...vals: T[]): TreeSet<T> {
        return new TreeSet(vals);
    }

    union(other: ISetCollection<T>): TreeSet<T> {
        const set = TreeSet.from(this, this.comp);
        set.add(...other);
        return set;
    }

    intersection(other: ISetCollection<T>): TreeSet<T> {
        const set = new TreeSet<T>();

        for (const x of this)
            other.has(x) && set.insertNode(x);

        return set;
    }

    difference(other: ISetCollection<T>): TreeSet<T> {
        const set = new TreeSet<T>();

        for (const x of this)
            other.has(x) || set.insertNode(x);

        return set;
    }

    symmetricDifference(other: ISetCollection<T>): TreeSet<T> {
        const set = this.difference(other);

        for (const x of other)
            this.has(x) || set.insertNode(x);

        return set;
    }

}

