import { IForwardPointer, Pointer } from "../pointer";

export function fill<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(beg: PointerT, end: PointerT, val: Pointer.ValueType<PointerT>): void {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        p.value = val;
       p.next();
    }
}

export function fillN<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>,
>(beg: PointerT, n: number, val: Pointer.ValueType<PointerT>): void {
    const p = beg.clone();
    let i = 0;

    while (p.notNull() && i++ < n) {
        p.value = val;
        p.next();
    }
}