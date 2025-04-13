import { IForwardPointer, Pointer } from "../pointer";
import { Predicate } from "../functional";
import { findIf } from "./find";
import { swap } from "./swap";

export function partition<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT, end: PointerT,
    pred: Predicate<Pointer.ValueType<PointerT>>
) {

    const first = findIf(
        beg, end,
        (x: Pointer.ValueType<PointerT>) => !pred(x),
    );

    if (!first.equals(end)) {
        const p = first.clone();
        p.next();

        while (p.notNull() && !p.equals(end)) {

            if (pred(p.value)) {
                swap(p, first);
                first.next();
            }

            p.next();
        }

    }

    return first;
}

