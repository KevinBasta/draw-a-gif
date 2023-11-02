import { minDelayTime } from "../shared/Constants";
import { disposalMethodType, frameType } from "../shared/Formats";
import { validateAndConvertInput } from "../shared/SharedUtilities";


export function getEmptyFrame(width: number, height: number): frameType {
    return {
      key: crypto.randomUUID(),
      disposalMethod: disposalMethodType.restoreToBackgroundColor,
      delayTime: 0,
      useLocalColorTable: false,
      localColorTable: null,
      indexStream: Array.from(
        {length: width * height},
        (_, i) => 0
      ),
      previewData: null,
      previewBlob: null,
      previewUrl: null,
    }
}

export function getValidatedFrames(frames: Array<frameType>): Array<frameType> {
    let validatedFrames = frames.map((frame, i) => {
        return {
          key: frame.key,
          disposalMethod: frame.disposalMethod,
          delayTime: validateAndConvertInput(frame.delayTime, minDelayTime),
          useLocalColorTable: frame.useLocalColorTable,
          localColorTable: frame.localColorTable,
          indexStream: frame.indexStream,
          previewData: frame.previewData,
          previewBlob: frame.previewBlob,
          previewUrl: frame.previewUrl,
        }
    });

    return validatedFrames;
}

export function getTransparentFrame(width: number, height: number) {
    return {
        key: crypto.randomUUID(),
        disposalMethod: disposalMethodType.restoreToBackgroundColor,
        delayTime: 0,
        useLocalColorTable: true,
        localColorTable: {
          transparentColorIndex: NaN,
          items: [
            {key: crypto.randomUUID(), red: 226, green: 226, blue: 226},
            {key: crypto.randomUUID(), red: 255, green: 255, blue: 255}
          ],
        },
        indexStream: Array.from(
          {length: width * height},
          (_, i) => {
            if (width % 2 == 0) {
              return Math.floor(i / width) % 2 == 0 ? ((i % 2 == 0) ? 1 : 0) : ((i % 2 == 0) ? 0 : 1);
            } else {
              return (i % 2 == 0) ? 1 : 0;
            }
          }
        ),
        previewData: null,
        previewBlob: null,
        previewUrl: null,
    }
}

export function getFrameUpdatedEncode(frame: frameType, data: Array<number>, blob: Blob, url: string) {
  return {
    key: frame.key,
    disposalMethod: frame.disposalMethod,
    delayTime: frame.delayTime,
    useLocalColorTable: frame.useLocalColorTable,
    localColorTable: frame.localColorTable,
    indexStream: frame.indexStream,
    previewData: data,
    previewBlob: blob,
    previewUrl: url,
  }
}