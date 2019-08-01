export function mapping(target: any, source = {}): any {
    for (const key in source) {
        if (source[key]) {
            target[key] = source[key];
        }
    }

    return target;
}
