import { IBinaryTree } from "../../BinaryTree";
import { BinaryNodeBase } from "./BinaryNodeBase";
import { BinaryNode } from "../../BinaryNode";
import { BinaryNodeConstructor, BinaryNodeFactory } from "./BinaryNodeFactory";
import { Comparator, UnaryFn } from "../../../../functional";
import { notNull, Nullable } from "../../../../util";

export abstract class BinaryTreeBase<
    NodeT extends BinaryNodeBase<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >
> implements IBinaryTree<NodeT> {
    abstract comp: Comparator<BinaryNode.KeyType<NodeT>>;
    abstract insert(x: BinaryNode.ValueType<NodeT>): NodeT;
    abstract erase(node: NodeT): void;

    protected readonly _nodeFactory: BinaryNodeFactory<NodeT>;
    protected _root: NodeT;
    readonly leftBound: NodeT;
    readonly rightBound: NodeT;

    constructor(
        Node: BinaryNodeConstructor<NodeT>,
        keyOf: UnaryFn<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>
        >
    ) {
        this._nodeFactory = new BinaryNodeFactory(
            Node, keyOf
        );

        this._root = this._nodeFactory.createNode();

        this.leftBound = this._nodeFactory.createNode(
            undefined as unknown as BinaryNode.ValueType<NodeT>,
            this._root
        );

        this.rightBound = this._nodeFactory.createNode(
            undefined as unknown as BinaryNode.ValueType<NodeT>,
            this._root
        );

        this._root.left = this.leftBound;
        this._root.right = this.rightBound;
    }

    get root() {
        return this._root;
    }

    get leftmost() {
        return this.leftBound.parent!;
    }

    get rightmost() {
        return this.rightBound.parent!;
    }



    find(key: BinaryNode.KeyType<NodeT>): Nullable<NodeT> {
        let curr: Nullable<NodeT> = this._root;

        while (notNull(curr) && curr.notNil()) {
            if (curr.key === key) return curr;
            curr = (this.comp(curr.key, key)) ? curr.left : curr.right;
        }

        return curr;
    }

}