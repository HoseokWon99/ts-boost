import { IPointer, Pointer } from "../pointer";

export function swap<
    PointerT extends IPointer<Pointer.ValueType<PointerT>, PointerT>
> (p1: PointerT, p2: PointerT) {
    const tmp = p1.value;
    p1.value = p2.value;
    p2.value = tmp;
}