import { useState } from "react";
import { canvasType, disposalMethodType, frameType } from "../shared/Formats";
import { FrameOptionsToggle, FrameOptionsWrapper, Content, Section, Option, Select, SectionWrapper } from "./FrameOptionsStyles"
import { Button, Input, Label, Title } from "../shared/SharedStyledComponents";
import { returnInput, validateAndConvertInput } from "../shared/SharedUtilities";
import { maxCanvasSize, maxDelayTime, maxQualityMultiplier, minCanvasSize, minDelayTime, minQualityMultiplier } from "../shared/Constants";
import React from "react";

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
                let duplicate =JSON.parse(JSON.stringify(props.frames[i]));
                duplicate.key = crypto.randomUUID();
                newFrames.push(duplicate);
            }
        }
       
        props.setFrames(newFrames);
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

                    <Button onClick={e => duplicateFrame()}>Duplicate</Button>

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