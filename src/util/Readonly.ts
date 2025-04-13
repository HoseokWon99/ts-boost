 export function makeReadonly<T extends object>(obj: T): Readonly<T> {
    return obj as Readonly<T>;
 }