import { IForwardPointer, Pointer } from "../pointer";
import { Predicate, equalsTo } from "../functional";

export function replaceIf<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    pred: Predicate<Pointer.ValueType<PointerT>>,
    newVal: Pointer.ValueType<PointerT>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        pred(p.value) && (p.value = newVal);
        p.next();
    }

}

export function replace<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,

>(
    beg: PointerT,
    end: PointerT,
    tg: Pointer.ValueType<PointerT>,
    newVal: Pointer.ValueType<PointerT>
) {
    replaceIf(beg, end, equalsTo(tg), newVal);
}