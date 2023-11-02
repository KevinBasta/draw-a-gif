import { CanvasObject } from "../canvas/CanvasClass";
import { minQualityMultiplier } from "../shared/Constants";
import { canvasType } from "../shared/Formats";
import { validateAndConvertInput } from "../shared/SharedUtilities";


export function getNewCanvas(canvasName: string, width: number, height: number) {
    return { 
        key: crypto.randomUUID(),
        canvasName: canvasName,
        canvasElement: new CanvasObject(width, height),
        width: width,
        height: height,
        qualityMultiplier: 10,
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
        width: canvas.width,
        height: canvas.height,
        qualityMultiplier: canvas.qualityMultiplier,
        encodedData: data,
        blob: blob,
        url: url
    }
}
