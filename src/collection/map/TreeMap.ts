import { RBNode, RBTree } from "../tree/internal/RBTree";
import { TreeCollection } from "../tree";
import { Comparator, greater } from "../../functional";
import { notNull, Nullable } from "../../util";

export class TreeMap<K, V>
    extends TreeCollection<
        RBNode<[K, V], K>
    >
{
    protected readonly _tree: RBTree<[K, V], K>;

    constructor(
        data: Iterable<[K, V]> = [],
        comp: Comparator<K> = greater<K>
    ) {
        super();

        this._tree = new RBTree(
            pair => pair[0],
            comp
        );

        this.add(...data);
    }

    static from<K, V>(
        data: Iterable<[K, V]>,
        comp: Comparator<K> = greater<K>
    ): TreeMap<K, V> {
        return new TreeMap(data, comp);
    }

    static of<K, V>(...pairs: [K, V][]): TreeMap<K, V> {
        return new TreeMap(pairs);
    }

    set(key: K, val: V): void {
        this.insertNode([key, val]);
    }

    get(key: K): Nullable<V> {
        const tg = this._tree.find(key);
        return notNull(tg) && tg.notNil() ? tg.value[1] : undefined;
    }

    keys() {
        return [...this].map(p => p[0]);
    }

    values() {
        return [...this].map(p => p[1]);
    }

}