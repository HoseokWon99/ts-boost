import { IBinaryNode } from "../../BinaryNode";
import { UnaryFn } from "../../../../functional";
import { notNull, Nullable } from "../../../../util";

export abstract class BinaryNodeBase<
    T,
    KeyT,
    Derived extends BinaryNodeBase<T, KeyT, Derived>
> implements IBinaryNode<T, KeyT, Derived> {
    constructor(private readonly __key: UnaryFn<T, KeyT>) {}
    abstract value: T;
    abstract parent: Nullable<Derived>;
    abstract left: Nullable<Derived>;
    abstract right: Nullable<Derived>;

    get key() {
        return this.__key(this.value);
    }

    notNil(): boolean {
        return notNull(this.value);
    }

}