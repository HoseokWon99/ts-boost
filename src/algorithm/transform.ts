import { IForwardPointer, Pointer } from "../pointer";
import { UnaryFn } from "../functional";

export function transform<
    InputPtr extends IForwardPointer<Pointer.ValueType<InputPtr>, InputPtr>,
    OutputPtr extends IForwardPointer<Pointer.ValueType<OutputPtr>, OutputPtr>
> (
    beg: Readonly<InputPtr>,
    end: Readonly<InputPtr>,
    dest: OutputPtr,
    mapper: UnaryFn<Pointer.ValueType<InputPtr>, Pointer.ValueType<OutputPtr>>
) {
    const p = beg.clone();

    while (dest.notNull() && p.notNull() && !p.equals(end)) {
        dest.value = mapper(p.value);
        p.next();
        dest.next();
    }
}

export async function transformAsync<
    InputPtr extends IForwardPointer<Pointer.ValueType<InputPtr>, InputPtr>,
    OutputPtr extends IForwardPointer<Pointer.ValueType<OutputPtr>, OutputPtr>
> (
    beg: Readonly<InputPtr>,
    end: Readonly<InputPtr>,
    dest: OutputPtr,
    mapper: UnaryFn<Pointer.ValueType<InputPtr>, Promise<Pointer.ValueType<OutputPtr>>>
) {
    const p = beg.clone();

    while (dest.notNull() && p.notNull() && !p.equals(end)) {
        dest.value = await mapper(p.value);
        p.next();
        dest.next();
    }
}

