import { getEmptyFrame, getFrameUpdatedEncode } from "../core/FramesCore";
import { ButtonFrameAdder, ButtonFramePreview } from "../shared-styles/Button";
import { canvasType, colorTableType, frameType } from "../shared/Formats";
import { FrameImg, FrameNumb, FramePickerWrapper } from "./FramePickerStyles";

let worker = new Worker("/encoderWorker.js");
worker.postMessage(["load"]);

interface MyFramePickerProps {
    canvas: canvasType;

    frames: Array<frameType>;
    setFrames: Function;

    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    globalColorTable: colorTableType;
}

export function FramePicker(props: MyFramePickerProps) {
    
    function encodeFramePreview() {
        worker.postMessage(["framePreview", props.canvas, props.frames, props.currentFrameIndex, props.globalColorTable]);
    }
    
    function saveFramePreviewUrl(data: Uint8Array, index: number) {
        let arrData = Array.from(data);
        let blob = new Blob([data.buffer], { type: 'image/gif' })
        let url  = URL.createObjectURL(blob);
    
        const newFrames = props.frames.map((frame, i) => {
          if (i == index) {
            return getFrameUpdatedEncode(frame, arrData, blob, url);
          } else {
              return frame;
          }
        });
    
        props.setFrames(() => newFrames);
    }

    worker.onmessage = (e) => {
        if (e.data[0] == 'frameData') {
          saveFramePreviewUrl(e.data[1], e.data[2]);
        }
        else if (e.data[0] == 'err') {
          console.log("error")
          console.log(e.data)
        }
      }

    function addFrame(): void {
        props.setFrames((frames: Array<frameType>) => {
            return [
                ...frames,
                getEmptyFrame(props.canvas.width, props.canvas.height),
            ]
        });
    }
    
    function displayFrame(index: number): void {
        // Create frame image display
        encodeFramePreview();

        // Update current frame
        props.setCurrentFrameIndex(() => {return index;});
    }

    function framePreivew(i: number) {
        if (props.frames[i].previewUrl != null) {
            return <FrameImg $widthratio={props.canvas.width} $heightratio={props.canvas.height} src={props.frames[i].previewUrl}></FrameImg>
        } else {
            // return <FrameNumb $text={i} />
        }
    }

    return (
        <FramePickerWrapper>
            {
                [...Array(props.frames.length)].map((_, i) => {
                    return (
                        <ButtonFramePreview key={props.frames[i].key}
                                    $selected={i == props.currentFrameIndex}
                                    onClick={() => displayFrame(i)}>
                            {
                                framePreivew(i)
                            }
                        </ButtonFramePreview>
                    )
                })
            }
            <ButtonFrameAdder onClick={() => addFrame()} className="material-symbols-outlined"/>
        </FramePickerWrapper>
    );
}