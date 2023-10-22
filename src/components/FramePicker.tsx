import styled from "styled-components";
import { canvasType, frameType } from "../common/formats";

const FramePickerElem = styled.div`
    height: 10vh;

    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: min(3vw, 40px);

    padding: 0px 1vw;

    overflow-x: scroll;
`;

const FramePreview = styled.div<{ $selected?: boolean; }>`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    transition: 0.2s;

    ${props => props.$selected ?
        `
        box-shadow: var(--button-shadow-active);
        transform: var(--button-transform-active);
        `
        : 
        `
        box-shadow: var(--button-shadow);
        transform: var(--button-transform);
        &:hover {
            background-color: var(--tertiary-color-active);
        }
        `};
    
    cursor: pointer;
`;

const FrameAdder = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    box-shadow: var(--button-shadow);
    transform: var(--button-transform);
    
    transition: 0.01s;
    
    &:hover {
        background-color: var(--tertiary-color-active);
    }

    &:active {
        box-shadow: var(--button-shadow-active);
        transform: var(--button-transform-active);
    }
    
    &:after {
        content: "+";
        font-size: var(--font-size-medium);
    }
`;

const FrameImg = styled.img<{ $widthratio: number; $heightratio: number; }>`
    max-width: 90%;
    max-height: 90%;

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio}
`;

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
        <FrameAdder onClick={() => addFrame()} />
        </FramePickerElem>
    );
}