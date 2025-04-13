import { BinaryNodeBase, BinaryTreeBase } from "./base";
import { Comparator, UnaryFn } from "../../../functional";
import { notNull, Nullable } from "../../../util";
import { BinaryNode } from "../BinaryNode";
import { BinaryTree } from "../BinaryTree";

const enum Color {
    RED, BLACK
}

export class RBNode<T, KeyT>
    extends BinaryNodeBase<
    T,
    KeyT,
    RBNode<T, KeyT>
> {
    constructor(
        keyOf: UnaryFn<T, KeyT>,
        public value: T,
        public parent: Nullable<RBNode<T, KeyT>>,
        public left: Nullable<RBNode<T, KeyT>>,
        public right: Nullable<RBNode<T, KeyT>>,
        public color: Color = Color.BLACK
    ) { super(keyOf); }
}

export class RBTree<T, KeyT> extends BinaryTreeBase<RBNode<T, KeyT>> {

    constructor(
        keyOf: UnaryFn<T, KeyT>,
        public readonly comp: Comparator<KeyT>
    ) { super(RBNode<T, KeyT>, keyOf); }

    insert(x: T): RBNode<T, KeyT>  {
        const key = this._nodeFactory.keyOf(x);
        let curr = this._root;

        while (curr.notNil()) {
            if (curr.key === key) return curr;

            const next
                = this.comp(curr.key, key)
                ? curr.left : curr.right;

            if (notNull(next)) curr = next;
            else break;
        }

        const newNode = this._nodeFactory.createNode(x);

        if (curr.notNil()) {

            (this.comp(curr.key, key))
                ? (curr.left = newNode)
                : (curr.right = newNode);

            newNode.parent = curr;
        }
        else {
            newNode.parent = curr.parent;

            if (!curr.parent) {
                newNode.left = curr.left;
                newNode.right = curr.right;
                curr.left!.parent = curr.right!.parent = newNode;
                this._root = newNode;
            }
            else {

                if (curr === curr.parent.left) {
                    curr.parent.left = newNode;
                    newNode.left = curr;
                }
                else {
                    curr.parent.right = newNode;
                    newNode.right = curr;
                }

                curr.parent = newNode;
            }
        }

        newNode.color = Color.RED;
        this.fixInsert(newNode);
        return newNode;
    }

    erase(node: RBNode<T, KeyT>) {
        if (!node.notNil()) return;
        let color: Color;
        let tg: Nullable<RBNode<T, KeyT>>;

        if (BinaryNode.isNotNull(node.left) && BinaryNode.isNotNull(node.right)) {
            const replacer = BinaryTree.getLeftmost(node.right);

            color = replacer.color;
            tg = replacer.right;

            this.replace(replacer, replacer.right);
            this.replace(node, replacer);

            replacer.left = node.left;
            replacer.right = node.right;
            node.left.parent = node.right.parent = replacer;

        }
        else {
            color = node.color;

            const replacer = !BinaryNode.isNotNull(node.left)
                ? node.right : node.left;

            tg = replacer;
            this.replace(node, replacer);
        }

        BinaryTree.fixTree(this);
        (color === Color.BLACK && notNull(tg)) && this.fixErase(tg);
        BinaryNode.cutOff(node);
    }

    private fixInsert(node: RBNode<T, KeyT>) {
        let curr = node;

        while (notNull(curr.parent) && curr.parent.color === Color.RED) {
            const grandparent = curr.parent.parent;
            if (!grandparent) break;

            const isLeft = curr.parent === grandparent.left;

            const uncle = isLeft
                ? grandparent.right
                : grandparent.left;

            if (notNull(uncle) && uncle.color === Color.RED) {
                curr.parent.color = Color.BLACK;
                uncle.color = Color.BLACK;
                grandparent.color = Color.RED;
            }
            else {
                curr.parent.color = Color.BLACK;
                grandparent.color = Color.RED;

                if (isLeft
                    ? curr === curr.parent.right
                    : curr === curr.parent.left
                ) isLeft
                    ? this.rotateLeft(curr.parent)
                    : this.rotateRight(curr.parent);

                isLeft
                    ? this.rotateRight(grandparent)
                    : this.rotateLeft(grandparent);
            }

            curr = grandparent;
        }

        this._root.color = Color.BLACK;
    }

    private fixErase(node: RBNode<T, KeyT>) {
        let curr = node;

        while (notNull(curr.parent) && curr.color === Color.BLACK) {
            const isLeft = curr === curr.parent.left;

            let bro = isLeft
                ? curr.parent.right! : curr.parent.left!;

            if (bro.color === Color.RED) {
                bro.color = Color.BLACK;
                curr.parent.color = Color.RED;

                isLeft
                    ? this.rotateLeft(curr.parent)
                    : this.rotateRight(curr.parent);

                bro = isLeft ? curr.parent.right! : curr.parent.left!;
            }

            if (
                (!bro.left || bro.left.color === Color.BLACK) &&
                (!bro.right || bro.right.color === Color.BLACK)
            ) {
                bro.color = Color.RED;
                curr = curr.parent;
            }
            else {

                if (
                    isLeft
                        ? !bro.right || bro.right.color === Color.BLACK
                        : !bro.left || bro.left.color === Color.BLACK
                ) {
                    isLeft
                        ? bro.left && (bro.left.color =Color.BLACK)
                        : bro.right && (bro.right.color = Color.BLACK);

                    bro.color = Color.RED;

                    isLeft
                        ? this.rotateRight(bro)
                        : this.rotateLeft(bro);

                    bro = isLeft ? curr.parent.right! : curr.parent.left!;
                }

                bro.color = curr.parent.color;
                curr.parent.color = Color.BLACK;

                if (isLeft) {
                    bro.right && (bro.right.color = Color.BLACK);
                    this.rotateLeft(curr.parent);
                }
                else {
                    bro.left && (bro.left.color = Color.BLACK);
                    this.rotateRight(curr.parent);
                }

                curr = this._root;
            }
        }

        curr.color = Color.BLACK;
    }

    private rotateLeft(node: RBNode<T, KeyT>) {
        if (!notNull(node.right)) return;
        if (!node.right.notNil()) return;

        const right = node.right;

        notNull(right.left) && (right.left.parent = node);
        node.right = right.left;
        right.left = node;


        if (notNull(node.parent)) {
            node === node.parent.left
                ? (node.parent.left = right)
                : (node.parent.right = right);
        }
        else {
            this._root = right;
        }

        right.parent = node.parent;
        node.parent = right;
    }

    private rotateRight(node: RBNode<T, KeyT>) {
        if (!notNull(node.left)) return;
        if (!node.left.notNil()) return;

        const left = node.left;

        notNull(left.right) && (left.right.parent = node);
        node.left = left.right;
        left.right = node;


        if (notNull(node.parent)) {
            node === node.parent.left
                ? (node.parent.left = left)
                : (node.parent.right = left);
        }
        else {
            this._root = left;
        }

        left.parent = node.parent;
        node.parent = left;
    }

    private replace(
        oldNode: RBNode<T, KeyT>,
        newNode: Nullable<RBNode<T, KeyT>>
    ) {

        if (notNull(oldNode.parent)) {
            oldNode === oldNode.parent.left
                ? (oldNode.parent.left = newNode)
                : (oldNode.parent.right = newNode);
        }
        else {
            this._root = notNull(newNode)
                ? newNode
                : this._nodeFactory.createNode();
        }

        notNull(newNode) && (newNode.parent = oldNode.parent);
    }
}