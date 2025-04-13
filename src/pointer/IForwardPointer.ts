import { IPointer } from "./IPointer";

export interface IForwardPointer<
    T,
    Derived extends IForwardPointer<T, Derived>
> extends IPointer<T, Derived> {
    next(): this;
}







