import { IForwardPointer, Pointer } from "../pointer";
import { UnaryOp, Predicate, Task } from "../functional";

export function update<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    func: UnaryOp<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        p.value = func(p.value);
        p.next();
    }
}

export function updateIf<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    func: UnaryOp<Pointer.ValueType<PointerT>>,
    pred: Predicate<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        pred(p.value) && (p.value = func(p.value));
        p.next();
    }
}

export async function updateAsync<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    func: Task<UnaryOp<Pointer.ValueType<PointerT>>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        p.value = await func(p.value);
        p.next();
    }
}

export async function updateAsyncIf<
    PointerT extends IForwardPointer<Pointer.ValueType<PointerT>, PointerT>
>(
    beg: PointerT,
    end: PointerT,
    func: Task<UnaryOp<Pointer.ValueType<PointerT>>> | UnaryOp<Pointer.ValueType<PointerT>>,
    pred: Task<Predicate<Pointer.ValueType<PointerT>>> | Predicate<Pointer.ValueType<PointerT>>
) {
    const p = beg.clone();

    while (p.notNull() && !p.equals(end)) {
        (await pred(p.value)) && (p.value = await func(p.value));
        p.next();
    }
}
