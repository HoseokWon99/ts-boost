import { notNull, Nullable } from "../../util";

export interface IBinaryNode<
    T,
    KeyT,
    Derived extends IBinaryNode<T, KeyT, Derived>
> {
    value: T;
    key: KeyT;
    parent: Nullable<Derived>;
    left: Nullable<Derived>;
    right: Nullable<Derived>;
    notNil(): boolean;
}


export namespace BinaryNode {

    export type ValueType<
        NodeT extends IBinaryNode<any, any, NodeT>
    > = NodeT extends IBinaryNode<infer T, any, NodeT> ? T : never;

    export type KeyType<
        NodeT extends IBinaryNode<any, any, NodeT>
    > = NodeT extends IBinaryNode<any, infer K, NodeT> ? K : never;

    export function isNotNull<NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >>(node: Nullable<NodeT>): node is NodeT {
        return notNull(node) && node.notNil();
    }

    export function cutOff<NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >>(node: NodeT) {
        node.parent = null;
        node.left = null;
        node.right = null;
        node.value = undefined as unknown as BinaryNode.ValueType<NodeT>;
    }



    export type Children<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    > = Pick<NodeT, "left" | "right">;

}