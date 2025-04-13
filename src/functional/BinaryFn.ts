export type BinaryFn<T, U> = (a: T, b: T) => U;
export type BinaryOp<T> = BinaryFn<T, T>;
export type Comparator<T> = BinaryFn<T, boolean>;

export function plus(a: number, b: number): number;
export function plus(a: bigint, b: bigint): bigint;
export function plus(a: string, b: string): string;
export function plus(a: any, b: any) { return a + b; }

export function minus(a: number, b: number): number;
export function minus(a: bigint, b: bigint): number;
export function minus(a: any, b: any) { return a - b; }

export function multiply(a: number, b: number): number;
export function multiply(a: bigint, b: bigint): number;
export function multiply(a: any, b: any) { return a * b; }

export function divide(a: number, b: number): number;
export function divide(a: bigint, b: bigint): number;
export function divide(a: any, b: any) { return a / b; }

export function mod(a: number, b: number): number;
export function mod(a: bigint, b: bigint): number;
export function mod(a: any, b: any) { return a % b; }

export function greater<T>(a: T, b: T): boolean { return a > b; }
export function less<T>(a: T, b: T): boolean { return a < b; }
export function equals<T>(a: T, b: T): boolean { return a === b; }
export function greaterOrEquals<T>(a: T, b: T): boolean { return a >= b; }
export function lessOrEquals<T>(a: T, b: T): boolean { return a <= b; }

