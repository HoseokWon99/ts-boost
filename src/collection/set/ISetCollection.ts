export interface ISetCollection<T> extends Iterable<T>{
    has(val: T): boolean;
    union(other: ISetCollection<T>): ISetCollection<T>;
    intersection(other: ISetCollection<T>): ISetCollection<T>;
    difference(other: ISetCollection<T>): ISetCollection<T>;
    symmetricDifference(other: ISetCollection<T>): ISetCollection<T>;
}

