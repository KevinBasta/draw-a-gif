import { CanvasObject } from "./CanvasObject";

export enum toolType {
    brush = 1,
    eraser,
    bucket,
}

export interface toolData {
    key: string,
    tool: toolType,
    size: string,
};

export interface colorType {
    key: string,
    red: number,
    green: number,
    blue: number,
};

export interface colorTableType {
    transparentColorIndex: number,
    items: Array<colorType>,
};

export interface frameType {
    key: string,
    useLocalColorTable: boolean,
    localColorTable: colorTableType,
    indexStream: Array<number>,
};

export interface canvasType {
    canvasElement: CanvasObject,
    width: number, 
    height: number,
};