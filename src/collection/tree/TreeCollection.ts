import { BiDirectionalCollection } from "../base";
import { Pointer, ReversePointer } from "../../pointer";
import { notNull, Nullable } from "../../util";
import { BinaryNode, IBinaryNode } from "./BinaryNode";
import { BinaryTree, IBinaryTree } from "./BinaryTree";
import { SWeakSet } from "../../memory";

export abstract class TreeCollection<
    NodeT extends IBinaryNode<
        BinaryNode.ValueType<NodeT>,
        BinaryNode.KeyType<NodeT>,
        NodeT
    >
> extends BiDirectionalCollection<
    BinaryNode.ValueType<NodeT>,
    TreeCollection.Pointer<NodeT>
> {
    protected readonly _nodes: SWeakSet<NodeT> = new SWeakSet();
    protected abstract readonly _tree: IBinaryTree<NodeT>;

    get comp() {
        return this._tree.comp;
    }

    get size() {
        return this._nodes.size;
    }

    add(...entries: BinaryNode.ValueType<NodeT>[]) {
        for (const entry of entries)
            this.insertNode(entry);
    }

    begin() {
        return this.pointerTo(this._tree.leftmost);
    }

    end() {
        return this.pointerTo(this._tree.rightBound);
    }

    rbegin() {
        return this.rpointerTo(this._tree.rightmost);
    }

    rend() {
        return this.rpointerTo(this._tree.leftBound);
    }

    clear() {
        const st = [this._tree.root];

        const func = (node: Nullable<NodeT>) => {
            if (notNull(node)) {
                node.parent = null;
                st.push(node);
            }
        };

        while (st.length) {
            const curr = st.pop()!;
            if (!curr.notNil()) continue;
            func(curr.left);
            func(curr.right);
            curr.left = null;
            curr.right = null;
            this._nodes.delete(curr);
        }

    }

    insert(x: BinaryNode.ValueType<NodeT>) {
        return this.pointerTo(
            this.insertNode(x)
        );
    }

    find(key: BinaryNode.KeyType<NodeT>) {
        const tg = this._tree.find(key);

        return notNull(tg) && tg.notNil()
            ? this.pointerTo(tg)
            : this.end();
    }

    erase(pos: TreeCollection.Pointer<NodeT>) {
       const tg = pos.current;
       pos.next();
       this.eraseNode(tg);
       return pos;
    }

    has(key: BinaryNode.KeyType<NodeT>): boolean {
        const tg = this._tree.find(key);
        return notNull(tg) && tg.notNil();
    }

    delete(key: BinaryNode.KeyType<NodeT>) {
        const tg = this._tree.find(key);
        notNull(tg) && this.eraseNode(tg);
    }

    protected insertNode(x: BinaryNode.ValueType<NodeT>) {
        const node = this._tree.insert(x);
        this._nodes.has(node) || this._nodes.add(node);
        return node;
    }

    protected eraseNode(node: NodeT) {

        if (node.notNil()) {
            this._tree.erase(node);
            this._nodes.delete(node);
        }

    }

    protected pointerTo(
        node: NodeT
    ): TreeCollection.Pointer<NodeT> {
        return new BinaryTree.Pointer(
            this._tree,
            node
        );
    }

    protected rpointerTo(
        node: NodeT
    ): ReversePointer<
        BinaryNode.ValueType<NodeT>,
        TreeCollection.Pointer<NodeT>
    > {
        return Pointer.makeReverse(
            BinaryTree.Pointer<NodeT>,
            this._tree,
            node
        );
    }

}

export namespace TreeCollection {

    export type Pointer<
        NodeT extends IBinaryNode<
            BinaryNode.ValueType<NodeT>,
            BinaryNode.KeyType<NodeT>,
            NodeT
        >
    > = BinaryTree.Pointer<NodeT>;

}