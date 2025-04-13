export type Null = undefined | null;
export type Nullable<T> = T | Null;

export const notNull
    = <T>(x: Nullable<T>): x is T => (x !== null && x!== undefined);