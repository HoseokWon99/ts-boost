import { IArrayLike } from "./IArrayLike";

export namespace ArrayRange {

    export function* range<T>(
        arr: IArrayLike<T>,
        beg: number,
        end: number = arr.length
    ) {
       end = Math.min(end, arr.length);

       for (let i = beg; i !== end; ++i)
           yield arr[i];
    }

}