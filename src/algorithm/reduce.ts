import { IForwardPointer, Pointer } from "../pointer";
import { BinaryOp } from "../functional";

export function reduce<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    func: BinaryOp<Pointer.ValueType<PointerT>>,
    init: Pointer.ValueType<PointerT>
): Pointer.ValueType<PointerT> {
    const p = beg.clone();
    let result = init;

    while (p.notNull() && !p.equals(end)) {
        result = func(result, p.value);
        p.next();
    }

    return result;
}