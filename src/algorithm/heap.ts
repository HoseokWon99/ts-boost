import { IRandomAccessPointer, Pointer } from "../pointer";
import { Comparator, less, greater } from "../functional";
import { swap } from "./swap";

function __adjustHeap<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    root: PointerT, n: number,
    comp: Comparator<Pointer.ValueType<PointerT>>
) {
    if (!root.notNull() || root.index === n) return;
    const p = root.clone().to(Math.floor(n / 2) - 1);

    while (p.index >= root.index) {

        for (let i = 1; i !== 3 ; ++i) {
            const child = p.clone().to(p.index + i - root.index);

            (child.index < n && comp(p.value, child.value))
            && swap(p, child);
        }

        p.prev();
    }
}

export function makeHeap<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = less<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;

    const __makeHeap = (root: PointerT) => {
        let top = root.clone();

        for (let i = 1; i !== 3 ; ++i) {
            const child = root.clone().to(root.index + i - beg.index);

            (child.index < end.index && comp(top.value, child.value))
            && (top = child);
        }

        if (top.index !== root.index) {
            swap(root, top);
            __makeHeap(root);
        }
    };

    const p = beg.clone().to(
        Math.floor((end.index - beg.index) / 2) - 1
    );

    while (p.index >= beg.index) {
        __makeHeap(p);
        p.prev();
    }

    __adjustHeap(beg, end.index - beg.index, comp);
}

export function pushHeap<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = less<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;

    const len = end.index - beg.index;
    if (len === 1) return;

    let child = end.clone().prev();

    const __getParentIdx = (childIdx: number) => {
        return childIdx % 2 === 0
            ? (childIdx - 2) / 2
            : (childIdx - 1) / 2 ;
    };

    while (child.index > beg.index) {
        const parentIdx = __getParentIdx(child.index + beg.index);
        const parent = child.clone().to(parentIdx - child.index);

        if (parent.index >= beg.index && comp(parent.value, child.value)) {
            swap(parent, child);
            child = parent;
            continue;
        }

        break;
    }
}

export function popHeap<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = less<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;
    const last = end.clone().prev();
    swap(beg, last);
    __adjustHeap(beg, last.index - beg.index, comp);

}

export function sortHeap<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = greater<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;

    const __comp = (
        x: Pointer.ValueType<PointerT>,
        y: Pointer.ValueType<PointerT>
    ) => !comp(x, y);

    makeHeap(beg, end, __comp);
    const last = end.clone();

    while (!last.equals(beg)) {
        popHeap(beg, last, __comp);
        last.prev();
    }
}

