import { IForwardPointer, Pointer } from "../pointer";
import { Predicate, Comparator, equals } from "../functional";

export function every<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    pred: Predicate<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        if (!pred(p.value)) return false;
        p.next();
    }

    return true;
}

export function some<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    pred: Predicate<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        if (pred(p.value)) return true;
        p.next();
    }

    return false;
}

export function compare<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg1: Readonly<PointerT>,
    end1: Readonly<PointerT>,
    beg2: Readonly<PointerT>,
    comp: Comparator<Pointer.ValueType<PointerT>>
) {
    const p1 = beg1.clone();
    const p2 = beg2.clone();

    while (p1.notNull() && p2.notNull() && !p1.equals(end1)) {
        if (!comp(p1.value, p2.value)) return false;
        p1.next();
        p2.next();
    }

    return true;
}

export function equal<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(
    beg1: Readonly<PointerT>,
    end1: Readonly<PointerT>,
    beg2: Readonly<PointerT>
){
    return compare(beg1, end1, beg2, equals<Pointer.ValueType<PointerT>>);
}