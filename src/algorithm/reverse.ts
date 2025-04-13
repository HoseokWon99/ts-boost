import { IBiDirectionalPointer, Pointer } from "../pointer";
import { swap } from "./swap";

export function reverse<
    PointerT extends IBiDirectionalPointer<Pointer.ValueType<PointerT>, PointerT>
>(beg: PointerT, end: PointerT) {
    const p = beg.clone();
    const q = end.clone();

    while (!p.equals(q)) {
       q.prev();
       if (p.equals(q)) break;
       swap(p, q);
       p.next();
    }
}

