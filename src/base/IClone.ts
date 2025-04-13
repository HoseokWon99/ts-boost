export interface IClone<Derived extends IClone<Derived>> {
    clone(): Derived;
}