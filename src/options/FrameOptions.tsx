import { useState } from "react";
import { canvasType, disposalMethodType, frameType } from "../shared/Formats";
import { FrameOptionsWrapper } from "./FrameOptionsStyles"
import { Label, Title } from "../shared-styles/Text";
import { returnInput, validateAndConvertInput } from "../shared/SharedUtilities";
import { maxCanvasSize, maxDelayTime, maxQualityMultiplier, minCanvasSize, minDelayTime, minQualityMultiplier, widthFrameOptions } from "../shared/Constants";
import { ButtonFrameTab, ButtonLarge } from "../shared-styles/Button";
import { InputStandard, OptionTransitionType, SelectTransitionType } from "../shared-styles/Input";
import { OptionsInputLabelWrapper, OptionsSection, OptionsWrapper } from "./OptionsWrappers";
import { getFrameUpdatedDelayTime, getFrameUpdatedDisposalMethod } from "../core/FramesCore";

interface FrameOptionsProps {
    canvas: canvasType,
    setCanvas: Function,
    
    frames: Array<frameType>,
    setFrames: Function,
    
    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    setPreviewGIF: Function;

    encodeGIF: Function;
}

let keys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]

export function FrameOptions(props: FrameOptionsProps) {
    const [frameOptionsWidth, setFrameOptionsWidth] = useState("0px");
    const [frameOptionsToggleIcon, setFrameOptionsToggleIcon] = useState("arrow_back");

    function toggleFrameOptions() {
        switch (frameOptionsWidth) {
            case "0px":
                setFrameOptionsWidth(() => {return widthFrameOptions});
                setFrameOptionsToggleIcon(() => {return "arrow_forward"})
                break;
            default:
                setFrameOptionsWidth(() => {return "0px"});
                setFrameOptionsToggleIcon(() => {return "arrow_back"})
        }
    }

    function updateDelayTime(e: any) {
        let value = returnInput(e, minDelayTime, maxDelayTime);
        
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return getFrameUpdatedDelayTime(frame, value);
            } else {
                return frame;
            }
        });

        props.setFrames(newFrames);
    }

    function updateDisposalMethod(value: number) {
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return getFrameUpdatedDisposalMethod(frame, value);
            } else {
                return frame;
            }
        });

        props.setFrames(newFrames);
    }

    function duplicateFrame() {
        let newFrames: Array<frameType> = [];

        for (let i = 0; i < props.frames.length; i++) {
            newFrames.push(props.frames[i]);
            
            if (i == props.currentFrameIndex) {
                let duplicate = JSON.parse(JSON.stringify(props.frames[i]));
                duplicate.key = crypto.randomUUID();
                newFrames.push(duplicate);
            }
        }
       
        props.setFrames(newFrames);
    }

    function deleteFrame() {
        if (props.frames.length <= 1) {
            return;
        }

        if (props.currentFrameIndex == 0) {
            props.setCurrentFrameIndex((current: number) => {return current});
        } else {
            props.setCurrentFrameIndex((current: number) => {return current - 1});
        }
        
        let newFrames: Array<frameType> = [];
        
        for (let i = 0; i < props.frames.length; i++) {
            if (i != props.currentFrameIndex) {
                newFrames.push(props.frames[i]);
            }
        }
       
        props.setFrames(newFrames);
    }
    
    function moveFrameLeft() {
        if (props.currentFrameIndex == 0) {
            return;
        }
        
        let newFrames: Array<frameType> = [];
        let previousFrame: frameType = props.frames[0];
        
        for (let i = 1; i < props.frames.length; i++) {
            if (i == props.currentFrameIndex) { 
                newFrames.push(props.frames[i]);
            } else {
                newFrames.push(previousFrame);
                previousFrame = props.frames[i];
            }
        }
        
        newFrames.push(previousFrame);
        props.setFrames(newFrames);

        props.setCurrentFrameIndex((current: number) => {return current - 1});
    }

    function moveFrameRight() {
        if (props.currentFrameIndex == props.frames.length - 1) {
            return;
        }

        let newFrames: Array<frameType> = [];
        
        for (let i = 0; i < props.frames.length; i++) {
            if (i == props.currentFrameIndex) { 
                newFrames.push(props.frames[i + 1]);
                newFrames.push(props.frames[i]);
            } else if (i != props.currentFrameIndex + 1) {
                newFrames.push(props.frames[i]);
            }
        }
        
        props.setFrames(newFrames);

        props.setCurrentFrameIndex((current: number) => {return current + 1});
    }

    return (
        <>
        <ButtonFrameTab $icon={frameOptionsToggleIcon} 
                        className="material-symbols-outlined"
                        onClick={() => {toggleFrameOptions()}}/>
        
        <FrameOptionsWrapper $width={frameOptionsWidth}>
            <OptionsWrapper>

                <OptionsSection>
                    <Title>Frame</Title>

                    <OptionsInputLabelWrapper>
                        <Label>Transition:</Label>
                        <SelectTransitionType value={props.frames[props.currentFrameIndex].disposalMethod}
                                        onChange={e => updateDisposalMethod(parseInt(e.target.value))}>
                            <OptionTransitionType value={disposalMethodType.restoreToBackgroundColor}> Normal </OptionTransitionType>
                            <OptionTransitionType value={disposalMethodType.keep}>                     Keep </OptionTransitionType>
                            <OptionTransitionType value={disposalMethodType.restoreToPreviousState}>   Previous State </OptionTransitionType>
                        </SelectTransitionType>

                        <Label>Duration:</Label>
                        <InputStandard key={keys[1]} 
                            type="number"
                            min={minDelayTime.toString()}
                            max={maxDelayTime.toString()}
                            value={(props.frames[props.currentFrameIndex].delayTime).toString()}
                            onChange={e => updateDelayTime(e)}/>
                    </OptionsInputLabelWrapper>


                    <ButtonLarge onClick={e => moveFrameLeft()}  $disabled={props.currentFrameIndex == 0}>Reorder Left</ButtonLarge>
                    <ButtonLarge onClick={e => moveFrameRight()} $disabled={props.currentFrameIndex == props.frames.length - 1}>Reorder Right</ButtonLarge>
                    <ButtonLarge onClick={e => duplicateFrame()}>Duplicate</ButtonLarge>
                    <ButtonLarge onClick={e => deleteFrame()} $disabled={props.frames.length <= 1}>Delete</ButtonLarge>

                </OptionsSection>                
            </OptionsWrapper>
        </FrameOptionsWrapper>
        </>
    );
}