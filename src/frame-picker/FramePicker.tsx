import { canvasType, frameType } from "../shared/Formats";
import { FrameAdder, FrameImg, FramePickerElem, FramePreview } from "./FramePickerStyles";

interface MyFramePickerProps {
    canvas: canvasType;

    frames: Array<frameType>;
    setFrames: Function;

    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    encodeFramePreview: Function;

    getEmptyFrame: Function;
}

export function FramePicker(props: MyFramePickerProps) {
    
    function addFrame(): void {
        props.setFrames((frames: Array<frameType>) => {
            return [
                ...frames,
                props.getEmptyFrame(props.canvas.width, props.canvas.height),
            ]
        });
    }
    
    function displayFrame(index: number): void {
        // Create frame image display
        props.encodeFramePreview();

        // Update current frame
        props.setCurrentFrameIndex(() => {return index;});
    }

    return (
        <FramePickerElem>
        {
            [...Array(props.frames.length)].map((_, i) => {
                return (
                    <FramePreview key={props.frames[i].key}
                                  $selected={i == props.currentFrameIndex}
                                  onClick={() => displayFrame(i)}>
                        <FrameImg $widthratio={props.canvas.width} $heightratio={props.canvas.height} src={props.frames[i].previewUrl}></FrameImg>
                    </FramePreview>
                )
            })
        }
        <FrameAdder onClick={() => addFrame()} className="material-symbols-outlined"/>
        </FramePickerElem>
    );
}