import { BinaryNode, IBinaryNode } from "./BinaryNode";
import { Comparator } from "../../functional";
import { notNull, Nullable } from "../../util";
import { IBiDirectionalPointer } from "../../pointer";

export interface IBinaryTree<
    NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >
>  {
    root: NodeT;
    leftBound: NodeT;
    rightBound: NodeT;
    leftmost: NodeT;
    rightmost: NodeT;
    comp: Comparator<BinaryNode.KeyType<NodeT>>;

    insert(x: BinaryNode.ValueType<NodeT>): NodeT;
    find(key: BinaryNode.KeyType<NodeT>): Nullable<NodeT>;
    erase(node: NodeT): void;
}

export namespace BinaryTree {

    export type NodeType<
        TreeT extends IBinaryTree<any>
    > = TreeT extends IBinaryTree<infer Node> ? Node : never;

    export function getLeftmost<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    >(root: NodeT) {
        let curr = root;

        while (notNull(curr.left) && curr.left.notNil())
            curr = curr.left;

        return curr;
    }

    export function getRightmost<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    >(root: NodeT) {
        let curr = root;

        while (notNull(curr.right) && curr.right.notNil())
            curr = curr.right;

        return curr;
    }

    export function fixTree<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    >(tree: IBinaryTree<NodeT>) {
        const lm = getLeftmost(tree.root);
        const rm = getRightmost(tree.root);

        if (lm !== tree.leftmost) {
            tree.leftmost.left = null;
            lm.left = tree.leftBound;
            tree.leftBound.parent = lm;
        }

        if (rm !== tree.rightmost) {
            tree.rightmost.right = null;
            rm.right = tree.rightBound;
            tree.rightBound.parent = rm;
        }
    }

    export class Pointer<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    > implements IBiDirectionalPointer<
        BinaryNode.ValueType<NodeT>,
        BinaryTree.Pointer<NodeT>
    > {
        constructor(
           private readonly _src: IBinaryTree<NodeT>,
           private _curr: NodeT
        ) {}

        notNull(): boolean {
            return this._curr.notNil();
        }

        equals(other: BinaryTree.Pointer<NodeT>): boolean {
            return this._curr === other._curr;
        }

        clone(): BinaryTree.Pointer<NodeT> {
            return new BinaryTree.Pointer<NodeT>(
                this._src,
                this._curr
            );
        }

        get current(): NodeT {
            return this._curr;
        }

        get value() {
            return this._curr.value;
        }

        set value(val: BinaryNode.ValueType<NodeT>) {
            this._curr.value = val;
        }

        next(): this {

            if (this._curr.notNil()) {

                if (notNull(this._curr.right)) {
                    this._curr = getLeftmost(this._curr.right);
                }
                else {
                    const key = this._curr.key;

                    while (!this._src.comp(this._curr.key, key))
                        this._curr = this._curr.parent!;
                }

            }
            else {
                (this._curr === this._src.leftBound)
                && (this._curr = this._curr.parent!);
            }

            return this;
        }

        prev(): this {

            if (this._curr.notNil()) {

                if (notNull(this._curr.left)) {
                    this._curr = (this._curr.left === this._src.leftBound)
                        ? this._curr.left
                        : getRightmost(this._curr.left);
                }
                else {
                    const key = this._curr.key;
                    do this._curr = this._curr.parent!;
                    while (this._src.comp(this._curr.key, key));
                }

            }
            else {
                (this._curr === this._src.rightBound)
                && (this._curr = this._curr.parent!);
            }

            return this;
        }


    }

}