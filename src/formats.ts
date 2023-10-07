
export interface frame {
    key: number,
    useLocalColorTable: boolean,
    localColorTable: Array<any>,
    indexStream: Array<number>,
};

export interface color {
    index: number,
    transparent: boolean,
    red: number,
    green: number,
    blue: number,
};

export interface colorTable {
    items: Array<color>,
};