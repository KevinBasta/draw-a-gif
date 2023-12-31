import { CanvasObject } from "../canvas/CanvasObject";

export enum toolType {
    brush = 1,
    eraser,
    bucket,
};

export enum disposalMethodType {
    keep = 1,
    restoreToBackgroundColor,
    restoreToPreviousState,
};

export enum interactionType {
    click = 1,
    drag,
    touch
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
    disposalMethod: disposalMethodType,
    delayTime: any;
    useLocalColorTable: boolean,
    localColorTable: colorTableType,
    indexStream: Array<number>,
    previewData: Array<number>,
    previewBlob: Blob,
    previewUrl: string,
};

export interface canvasType {
    key: string,
    canvasName: string,

    canvasElement: CanvasObject,
    transparentBackground: frameType,
    
    width: number,          // in pixels
    height: number,         // in pixels
    qualityMultiplier: any, // gif output multiplier

    encodedData: Uint8Array,
    blob: Blob,
    url: string,
};

// for storage purposes
export interface gifRecord {
    canvas: canvasType,
    frames: Array<frameType>,
    globalColorTable: colorTableType,
};
