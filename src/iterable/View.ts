import { IterableBase } from "./IterableBase";
import { IForwardPointer, Pointer } from "../pointer";

export class View<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
> extends IterableBase<
    Pointer.ValueType<PointerT>, PointerT
> {
    constructor(
        private readonly _beg: PointerT,
        private readonly _end: PointerT
    ) { super(); }

    begin(): PointerT {
        return this._beg.clone();
    }

    end(): PointerT {
        return this._end.clone();
    }
}