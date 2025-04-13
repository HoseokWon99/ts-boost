import { _integers } from "./generate";
import { UnaryOp } from "../functional";

export function* _sequence(
    coef: UnaryOp<number>,
    init: number = 0,
    step: number = 1
) {
    for (const i of _integers(init, step))
        yield coef(i);
}

