declare global {
    interface Dictionary<T> {
        [key: string]: T;
    }

    type Mask = (string | RegExp)[];

    type RecursivePartial<T> = {
        [P in keyof T]?: RecursivePartial<T[P]>;
    };

    type UUID = string;
    type UNIX_TIME = number;

    export type EnumMap<T extends string, U = string> = {
        [index in T]: U;
    };

    interface Window {
        XMLHttpRequest: unknown;
    }
}

declare module '*.md';
