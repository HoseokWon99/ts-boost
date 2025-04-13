import { HashCollection } from "../hash";
import { ISetCollection } from "./ISetCollection";
import { identity } from "../../functional";

export class HashSet<T>
    extends HashCollection<T, T>
    implements ISetCollection<T>
{

    constructor(...vals: T[] ) {
        super(identity<T>);
        this.add(...vals);
    }

    static of<T>(...vals: T[]): HashSet<T> {
        return new HashSet<T>(...vals);
    }

    union(other: ISetCollection<T>): HashSet<T> {
        const set = new HashSet(...this);
        set.add(...other);
        return set;
    }

    intersection(other: ISetCollection<T>): HashSet<T> {
        const set = new HashSet<T>();

        for (const val of this)
            other.has(val) && set.insert(val);

        return set;
    }

    difference(other: ISetCollection<T>): HashSet<T> {
        const set = new HashSet<T>();
        for (const val of this) other.has(val) || set.insert(val);
        return set;
    }
    
    symmetricDifference(other: ISetCollection<T>): HashSet<T> {
        const set = new HashSet<T>();
        for (const val of this) other.has(val) || set.insert(val);
        for (const val of other) this.has(val) || set.insert(val);
        return set;
    }

}

