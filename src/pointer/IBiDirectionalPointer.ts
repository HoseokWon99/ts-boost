import { IForwardPointer } from "./IForwardPointer";

export interface IBiDirectionalPointer<
    T,
    Derived extends IBiDirectionalPointer<T, Derived>
> extends IForwardPointer<T, Derived> {
    prev(): this;
}