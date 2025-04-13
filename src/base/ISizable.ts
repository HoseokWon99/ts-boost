export interface ISize {
    size: number;
}

export interface ILength {
    length: number;
}

export function sizeOf<T extends ISize | ILength>(a: T) {
    const propName = Object.hasOwn(a, "size") ? "size" : "length";
    return (a as any)[propName] as number;
}