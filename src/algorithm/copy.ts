import { IForwardPointer, Pointer } from "../pointer";

export function copy<
    InputPtr extends IForwardPointer<Pointer.ValueType<InputPtr>, InputPtr>,
    OutputPtr extends IForwardPointer<Pointer.ValueType<InputPtr>, OutputPtr>
> (
    beg: Readonly<InputPtr>,
    end: Readonly<InputPtr>,
    dest: OutputPtr,
) {
    const p: Readonly<InputPtr> = beg.clone();

    while (dest.notNull() && p.notNull() && !p.equals(end)) {
        dest.value = p.value;
        dest.next();
        p.next();
    }
}


