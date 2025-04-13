import { IForwardPointer } from "./IForwardPointer";
import { Collection, Sequence } from "../collection";

export class InsertPointer<
    CollectionT extends Collection<any, any>
> implements IForwardPointer<Collection.ValueType<CollectionT>, InsertPointer<CollectionT>> {
    private _curr: Collection.PointerType<CollectionT>;

   constructor(
       private readonly _src: CollectionT,
       private readonly _insert: (coll: CollectionT, val: Collection.ValueType<CollectionT>) => void
   ) {
       this._curr = this._src.begin();
   }


   notNull(): boolean {
       return true;
   }

   equals(other: InsertPointer<CollectionT>): boolean {
       return this._src === other._src && this._curr === other._curr;
   }

   clone(): InsertPointer<CollectionT> {
       return new InsertPointer(this._src, this._insert);
   }

   set value(val: Collection.ValueType<CollectionT>) {
       if (this._curr.notNull()) this._curr.value = val;
       else this._insert(this._src, val);
   }

   next() {
       this._curr.notNull() && (this._curr = this._curr.next());
       return this;
   }
}

export function inserter<CollectionT extends Collection<any, any>>(
    collection: CollectionT
): InsertPointer<CollectionT> {
    return new InsertPointer(
        collection,
        (coll, val) => coll.add(val)
    );
}

export function backInserter<
    CollectionT extends Sequence<any, any>
>(
    collection: CollectionT
): InsertPointer<CollectionT> {
    return new InsertPointer(
        collection,
        (coll, val) => coll.addBack(val)
    );
}

export function frontInserter<
    CollectionT extends Sequence<any, any>
>(
    collection: CollectionT
): InsertPointer<CollectionT> {
    return new InsertPointer(
        collection,
        (coll, val) => coll.addFront(val)
    );
}