

export function* _take<T>(n: number, data: Iterable<T>) {
    let cnt = 0;

    for (const x of data) {
        if (cnt >= n) break;
        yield x;
        ++cnt;
    }
}

