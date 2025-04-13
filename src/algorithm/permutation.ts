import { IBiDirectionalPointer, Pointer } from "../pointer";
import { reverse } from "./reverse";
import { swap } from "./swap";
import { Comparator, less } from "../functional";

export function nextPermutation<
    PointerT extends IBiDirectionalPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = less<Pointer.ValueType<PointerT>>
) {
    if(end.equals(beg)) return false;

    const p = end.clone().prev();
    if (p.equals(beg)) return false;

    while (true) {
        const q = p.clone();
        p.prev();

        if (comp(p.value, q.value)) {
            const r = end.clone();

            do r.prev();
            while (!comp(p.value, r.value));

            swap(p, r);
            reverse(q, end);
            return true;
        }

        if (p.equals(beg)) {
            reverse(beg, end);
            return false;
        }
    }
}

export function prevPermutation<
    PointerT extends IBiDirectionalPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    comp: Comparator<Pointer.ValueType<PointerT>> = less<Pointer.ValueType<PointerT>>
) {
    return nextPermutation(
        beg, end,
        (a, b) => !comp(a, b)
    );
}

