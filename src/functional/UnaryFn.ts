export type UnaryFn<T, U> = (a: T) => U;
export type UnaryOp<T> = UnaryFn<T, T>;
export type Predicate<T> = UnaryFn<T, boolean>;

export const identity = <T>(x: T) => x;

export function greaterThan<T>(a: T) {
    return (x: T) => x > a;
}

export function lessThan<T>(a: T) {
    return (x: T) => x < a;
}

export function equalsTo<T>(a: T) {
    return (x: T) => x === a;
}

export function greaterOrEqualsTo<T>(a: T) {
    return (x: T) => x >= a;
}

export function lessEqualsTo<T>(a: T) {
    return (x: T) => x <= a;
}