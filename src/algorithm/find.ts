import { IForwardPointer, Pointer } from "../pointer";
import { Predicate, equalsTo } from "../functional";

export function findIf<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    pred: Predicate<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        if (pred(p.value)) break;
        p.next();
    }

    return p;
}

export function find<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    tg: Pointer.ValueType<PointerT>
) {
    return findIf(beg, end, equalsTo(tg));
}
