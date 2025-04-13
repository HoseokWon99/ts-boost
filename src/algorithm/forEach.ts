import { IForwardPointer, Pointer } from "../pointer";
import { UnaryFn } from "../functional";


export function forEach<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    func: UnaryFn<Pointer.ValueType<PointerT>, any>
) {
   const p = beg.clone();

   while (p.notNull() && !p.equals(end)) {
       func(p.value);
       p.next();
   }
}

export async function forEachAsync<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: Readonly<PointerT>,
    end: Readonly<PointerT>,
    func: UnaryFn<Pointer.ValueType<PointerT>, Promise<any>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        await func(p.value);
        p.next();
    }
}



