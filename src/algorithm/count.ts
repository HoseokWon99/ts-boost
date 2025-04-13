import { IForwardPointer, Pointer } from "../pointer";
import { Predicate, equalsTo } from "../functional";

export function countIf<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg: Readonly<PointerT>, end: Readonly<PointerT>,
    pred: Predicate<Pointer.ValueType<PointerT>>) {
    const p = beg.clone();
    let cnt = 0;

    while (p.notNull() && !p.equals(end)) {
        pred(p.value) && ++cnt;
        p.next();
    }

    return cnt;
}

export function count<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    tg: Pointer.ValueType<PointerT>
) {
    return countIf(beg, end, equalsTo(tg));
}