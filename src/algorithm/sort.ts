import { IRandomAccessPointer, Pointer } from "../pointer";
import { Comparator, greater } from "../functional";
import { swap } from "./swap";
import { sortHeap } from "./heap";

function __insertSort<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = greater<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;
    const p = beg.clone().next();

    while (p.index < end.index) {
        const val = p.value;
        const q = p.clone().prev();

        while (q.index >= beg.index && !comp(val, q.value)) {
            const tmp = q.value;
            q.next();
            q.value = tmp;
            q.prev().prev();
        }

        q.next().value = val;
        p.next();
    }

}

function __setPivot<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    p1: PointerT,
    p2: PointerT,
    p3: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = greater<Pointer.ValueType<PointerT>>
) {

    const arr = Array.of(p1.value, p2.value, p3.value)
        .sort((a, b) => comp(a, b) ? 1 : -1);

    p1.value = arr[0];
    p3.value = arr[1];
    p2.value = arr[2];
}

function __partition<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>>
) {
    const last = end.clone().prev();

    __setPivot(
        beg,
        beg.clone().to(Math.floor((end.index - beg.index) / 2)),
        last,
        comp
    );

    const p = beg.clone();

    for (const q = p.clone(); q.index < end.index; q.next()) {

        if (comp(last.value, q.value)) {
            swap(p, q);
            p.next();
        }

    }

    swap(p, last);
    return p;
}

function __sortAux<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>>,
    depth: number,
    limit: number
) {

    if (end.index - beg.index <= 16)
        return __insertSort(beg, end, comp);

    if (depth > limit)
        return sortHeap(beg, end, comp);

    const mid = __partition(beg, end, comp);
    __sortAux(beg, mid, comp, depth + 1, limit);
    __sortAux(mid, end, comp,  depth + 1, limit);
}

export function sort<
    PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = greater<Pointer.ValueType<PointerT>>
) {
    if (!beg.notNull() || beg.equals(end)) return;

    const len = end.index - beg.index;
    if (len <= 1) return;
    const limit = 2*Math.floor(Math.log2(len));

    __sortAux(beg, end, comp, 0, limit);
}

