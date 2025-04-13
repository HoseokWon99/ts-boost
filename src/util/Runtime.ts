import { notNull } from "./Null";

export namespace Runtime {

    export function isNode() {
        return notNull(process)
            && notNull(process.versions)
            && notNull(process.versions.node);
    }

    export function isBrowser() {
        return notNull(window) && notNull(window.document);
    }

}