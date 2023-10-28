import { useState } from "react";
import * as cloneDeep from 'lodash/cloneDeep';
import { canvasType, disposalMethodType, frameType } from "../shared/Formats";
import { FrameOptionsToggle, FrameOptionsWrapper, Content, Section, Option, Select, SectionWrapper } from "./FrameOptionsStyles"
import { Button, Input, Label, Title } from "../shared/SharedStyledComponents";
import { returnInput, validateAndConvertInput } from "../shared/SharedUtilities";
import { maxCanvasSize, maxDelayTime, maxQualityMultiplier, minCanvasSize, minDelayTime, minQualityMultiplier } from "../shared/Constants";

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
                setFrameOptionsWidth(() => {return "25%"});
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
                return {
                    key: frame.key,
                    disposalMethod: frame.disposalMethod,
                    delayTime: value,
                    useLocalColorTable: frame.useLocalColorTable,
                    localColorTable: frame.localColorTable,
                    indexStream: frame.indexStream,
                    previewUrl: frame.previewUrl,
                }
            } else {
                return frame;
            }
        });

        props.setFrames(newFrames);
    }

    function updateDisposalMethod(value: number) {
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return {
                    key: frame.key,
                    disposalMethod: value,
                    delayTime: frame.delayTime,
                    useLocalColorTable: frame.useLocalColorTable,
                    localColorTable: frame.localColorTable,
                    indexStream: frame.indexStream,
                    previewUrl: frame.previewUrl
                }
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
                let duplicate = cloneDeep(props.frames[i]);
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
        <FrameOptionsToggle $icon={frameOptionsToggleIcon} 
                            className="material-symbols-outlined"
                            onClick={() => {toggleFrameOptions()}}/>
        
        <FrameOptionsWrapper $width={frameOptionsWidth}>
            <Content>

                <Section>
                    <Title>Frame</Title>

                    <Button onClick={e => moveFrameLeft()}  $disabled={props.currentFrameIndex == 0}>Reorder Left</Button>
                    <Button onClick={e => moveFrameRight()} $disabled={props.currentFrameIndex == props.frames.length - 1}>Reorder Right</Button>
                    <Button onClick={e => duplicateFrame()}>Duplicate</Button>
                    <Button onClick={e => deleteFrame()} $disabled={props.frames.length <= 1}>Delete</Button>

                    <Label>Transition:</Label>
                    <Select value={props.frames[props.currentFrameIndex].disposalMethod}
                            onChange={e => updateDisposalMethod(parseInt(e.target.value))}>
                        <Option value={disposalMethodType.restoreToBackgroundColor}> Normal </Option>
                        <Option value={disposalMethodType.keep}> Keep </Option>
                        <Option value={disposalMethodType.restoreToPreviousState}> Previous State </Option>
                    </Select>

                    <Label>Duration:</Label>
                    <Input key={keys[1]} 
                           type="number"
                           min={minDelayTime.toString()}
                           max={maxDelayTime.toString()}
                           value={(props.frames[props.currentFrameIndex].delayTime).toString()}
                           onChange={e => updateDelayTime(e)}/>
                </Section>                
            </Content>
        </FrameOptionsWrapper>
        </>
    );
}