import { CanvasObject } from "../canvas/CanvasObject";
import { minQualityMultiplier } from "../shared/Constants";
import { canvasType } from "../shared/Formats";
import { validateAndConvertInput } from "../shared/SharedUtilities";
import { getTransparentFrame } from "./FramesCore";


export function getNewCanvas(canvasName: string, width: number, height: number) {
    return { 
        key: crypto.randomUUID(),
        canvasName: canvasName,
        canvasElement: new CanvasObject(width, height),
        transparentBackground: getTransparentFrame(width, height),
        
        width: width,
        height: height,
        qualityMultiplier: ((width >= 100 || height >= 100) ? 1 : 10),
        
        encodedData: null,
        blob: null,
        url: null,
    }
}

export function getSavedCanvas(canvas: canvasType) {
    return { 
        key: canvas.key,
        canvasName: canvas.canvasName,
        canvasElement: new CanvasObject(canvas.width, canvas.height),
        transparentBackground: getTransparentFrame(canvas.width, canvas.height),

        width: canvas.width,
        height: canvas.height,
        qualityMultiplier: canvas.qualityMultiplier,
        
        encodedData: null,
        blob: null,
        url: null,
      }
}

export function getValidatedCanvas(canvas: canvasType): canvasType {
    let validatedCanvas = {
        key: canvas.key,
        canvasName: canvas.canvasName,
        canvasElement: canvas.canvasElement,
        transparentBackground: canvas.transparentBackground,

        width: canvas.width,
        height: canvas.height,
        qualityMultiplier: validateAndConvertInput(canvas.qualityMultiplier, minQualityMultiplier),
        
        encodedData: null,
        blob: null,
        url: null
      }

      return validatedCanvas;
}


export function getCanvasUpdatedEncode(canvas: canvasType, data: Uint8Array, blob: Blob, url: string) {
    return {
        key: canvas.key,
        canvasName: canvas.canvasName,
        canvasElement: canvas.canvasElement,
        transparentBackground: canvas.transparentBackground,

        width: canvas.width,
        height: canvas.height,
        qualityMultiplier: canvas.qualityMultiplier,
        
        encodedData: data,
        blob: blob,
        url: url
    }
}

export function getCanvasUpdatedQualityMultiplier(canvas: canvasType, newQualityMultiplier: string) {
    return {
        key: canvas.key,
        canvasName: canvas.canvasName,
        canvasElement: canvas.canvasElement,
        transparentBackground: canvas.transparentBackground,

        width: canvas.width,
        height: canvas.height,
        qualityMultiplier: newQualityMultiplier,
        
        encodedData: canvas.encodedData,
        blob: canvas.blob,
        url: canvas.url,
    }
}