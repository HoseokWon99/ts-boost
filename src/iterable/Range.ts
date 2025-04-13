import { IForwardPointer, Pointer } from "../pointer";

export namespace Range {

    export function* range<
        PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
    >(beg: Readonly<PointerT>, end: Readonly<PointerT>) {
        const p = beg.clone();

        while (p.notNull() && !p.equals(end)) {
            yield p.value;
            p.next();
        }

    }

    export function* rangeN<
        PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
    >(beg: Readonly<PointerT>, n: number) {
        const p = beg.clone();
        let cnt = 0;

        while (p.notNull() && cnt < n) {
            yield p.value;
            p.next();
            ++cnt;
        }
    }

}