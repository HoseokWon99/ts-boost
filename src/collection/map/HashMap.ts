import { HashCollection } from "../hash";

export class HashMap<K, V> extends HashCollection<[K, V], K> {

    constructor(...pairs: [K, V][]) {
        super(e => e[0]);
        this.add(...pairs);
    }

    static of<K, V>(...pairs: [K, V][]): HashMap<K, V> {
        return new HashMap<K, V>(...pairs);
    }

    set(key: K, val: V): void {
        this.add([key, val]);
    }

    get(key: K): V | undefined {
        const idx = this._dict.get(key);
        return idx === undefined ? idx : this._data[idx][1];
    }

    keys(): K[] {
        return this._data.map(e => e[0]);
    }

    values(): V[] {
        return this._data.map(e => e[1]);
    }
}



