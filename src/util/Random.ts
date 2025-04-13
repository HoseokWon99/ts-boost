import { Runtime } from "./Runtime";

const __crypto = Runtime.isNode()
    ? require("node:crypto") : window.crypto;

export class Random {
    private static readonly _IntArr = new Uint32Array(1);

    static uuid(): string {
        return __crypto.randomUUID();
    }

    static randNum<TypedArrayT> (
        tArr: TypedArrayT,
        a: number,
        b: number
    ) {
        const r = b - a;
        const m: number = __crypto.getRandomValues(tArr)[0];
        return a + (m % r);
    }

    static randInt(a: number, b: number, safeMode: boolean = false): number {
       return Random.randNum((
           safeMode ? new Uint32Array(1) : this._IntArr),
           a, b
       );
    }

}

