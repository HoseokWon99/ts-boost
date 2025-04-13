import { UnaryFn } from "../../../../functional";
import { Nullable } from "../../../../util";
import { BinaryNode, IBinaryNode } from "../../BinaryNode";

export type BinaryNodeConstructor<
    NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >
> = {
    new(
        keyOf: UnaryFn<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>
        >,
        value: BinaryNode.ValueType<NodeT>,
        parent: Nullable<NodeT>,
        left: Nullable<NodeT>,
        right: Nullable<NodeT>,
        ...args: any[]
    ): NodeT;
};

export class BinaryNodeFactory<
    NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >
> {
    constructor(
        public readonly Node: BinaryNodeConstructor<NodeT>,
        public readonly keyOf: UnaryFn<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>
        >,
    ) {  }

    createNode(
        value: BinaryNode.ValueType<NodeT>
        = undefined as unknown as BinaryNode.ValueType<NodeT>,
        parent: Nullable<NodeT> = null,
        left: Nullable<NodeT> = null,
        right: Nullable<NodeT> = null,
        ...args: any[]
    ) {
        return new this.Node(
          this.keyOf,
          value,
          parent,
          left,
          right,
          ...args
        );
    }


}