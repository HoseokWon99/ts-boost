export type Null = undefined | null;
export type Nullable<T> = T | Null;

export const notNull
    = <T>(x: T) => (x !== null && x!== undefined);