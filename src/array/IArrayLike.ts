
export interface IArrayLike<T> {
    [index: number]: T;
    length: number;
}

export namespace IArrayLike {
    export type ValueType<ArrayT extends IArrayLike<any>>
        = ArrayT extends IArrayLike<infer T> ? T : never;
}
