import { IPointer } from "./IPointer";
import { IForwardPointer } from "./IForwardPointer";
import { IBiDirectionalPointer } from "./IBiDirectionalPointer";
import { ReversePointer } from "./ReversePointer";
import { IRandomAccessPointer } from "./IRandomAccessPointer";
import { RandomAccessReversePointer } from "./RandomAccessReversePointer";

export namespace Pointer {
    export type ValueType<PointerT extends IPointer<any, PointerT>>
        = PointerT extends IPointer<infer T, PointerT> ? T : never;

    export function toArray<
        PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
    >(beg: PointerT, end: PointerT) {
        const p = beg.clone();
        const arr = new Array<Pointer.ValueType<PointerT>>();

        while (p.notNull() && !p.equals(end)) {
            arr.push(p.value);
            p.next();
        }

        return arr;
    }

    export function distance<
        PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
    >(ptr1: Readonly<PointerT>, ptr2: Readonly<PointerT>) {
        const p = ptr1.clone();
        let dist = 0;

        while (p.notNull() && !p.equals(ptr2)) {
            p.next();
            ++dist;
        }

        return p.equals(ptr2) ? dist : -1;
    }

    export function advance<
        PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
    > (ptr: PointerT, n: number) {
        let i = 0;

        while (i < n && ptr.notNull()) {
            ptr.next();
            ++i;
        }
    }

    export function translate<
        PointerT extends IBiDirectionalPointer<Pointer.ValueType<PointerT>, PointerT>
    > (ptr: PointerT, n: number) {
        if (n >= 0) return Pointer.advance(ptr, n);
        let i = 0;

        while (i > n && ptr.notNull()) {
            ptr.prev();
            --i;
        }
    }

    export function makeReverse<
        PointerT extends IBiDirectionalPointer<Pointer.ValueType<PointerT>, PointerT>
    > (Ptr: { new(...args: any[]): PointerT }, ...args: any[]) {
        return new ReversePointer<Pointer.ValueType<PointerT>, PointerT>(new Ptr(...args));
    }

    export function makeRandomAccessReverse<
        PointerT extends IRandomAccessPointer<Pointer.ValueType<PointerT>, PointerT>
    >(Ptr: { new(...args: any[]): PointerT }, ...args: any[]) {
        return new RandomAccessReversePointer<
            Pointer.ValueType<PointerT>,
            PointerT
        >(new Ptr(...args));
    }

}