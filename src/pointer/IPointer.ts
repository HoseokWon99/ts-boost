import { IClone, IEquals, IValue } from "../base";

export interface IPointer<
    T,
    Derived extends IPointer<T, Derived>
> extends IValue<T>, IClone<Derived>, IEquals {
    value: T;
    notNull(): boolean;
    equals(other: Derived): boolean;
    equals(other: Readonly<Derived>): boolean;
    clone(): Derived;
}