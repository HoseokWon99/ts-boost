import { IBiDirectionalPointer } from "./IBiDirectionalPointer";

export interface IRandomAccessPointer<
    T, Derived extends IRandomAccessPointer<T, Derived>
> extends IBiDirectionalPointer<T, Derived> {
    to(delta: number): this;
    index: number;
    maxIndex: number;
}