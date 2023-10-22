import { useState } from "react";
import { canvasType, disposalMethodType, frameType } from "../common/formats";
import { CanvasOptionsToggle, CanvasOptionsWrapper, Content, Section, Option, Select } from "./CanvasMenuStyles"
import { Button, Input, Label, Title } from "../common/CommonStyledComponents";
import { returnInput, validateAndConvertInput } from "../common/commonUtilities";
import { maxCanvasSize, maxDelayTime, maxQualityMultiplier, minCanvasSize, minDelayTime, minQualityMultiplier } from "../common/constants";

interface CanvasOptionsProps {
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

export function CanvaseOptions(props: CanvasOptionsProps) {
    const [canvasOptionsWidth, setCanvasOptionsWidth] = useState("0px");
    const [canvasOptionsToggleIcon, setcanvasOptionsToggleIcon] = useState("←");

    function toggleCanvasOptions() {
        switch (canvasOptionsWidth) {
            case "0px":
                setCanvasOptionsWidth(() => {return "25%"});
                setcanvasOptionsToggleIcon(() => {return "→"})
                break;
            default:
                setCanvasOptionsWidth(() => {return "0px"});
                setcanvasOptionsToggleIcon(() => {return "←"})
        }

    }

    function updateDelayTime(e: any) {
        let value = returnInput(e, minDelayTime, maxDelayTime);
        
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return {
                    key: frame.key,
                    disposalMethod: frame.disposalMethod,
                    delayTime: validateAndConvertInput(value, minDelayTime),
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

    function updateQualityMultiplier(e: any) {
        let value = returnInput(e, minQualityMultiplier, maxQualityMultiplier);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: props.canvas.width,
            height: props.canvas.height,
            qualityMultiplier: validateAndConvertInput(value, minQualityMultiplier),
            encodedData: props.canvas.encodedData,
            blob: props.canvas.blob,
            url: props.canvas.url,
        };

        props.setCanvas(newCanvas);
    }

    /* function updateCanvasWidth(e: any) {
        let value = returnInput(e, minCanvasSize, maxCanvasSize);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: validateAndConvertInput(value, minCanvasSize),
            height: props.canvas.height,
            qualityMultiplier: props.canvas.qualityMultiplier,
            encodedData: props.canvas.encodedData,
            blob: props.canvas.blob,
            url: props.canvas.url,
        };
        
        expandFrames(oldWidth, valueInt, props.canvas.height, props.canvas.height);
        props.setCanvas(newCanvas);
    }
    
    function updateCanvasHeight(e: any) {
        let value = returnInput(e, minCanvasSize, maxCanvasSize);

        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: props.canvas.width,
            height: validateAndConvertInput(value, minCanvasSize),
            qualityMultiplier: props.canvas.qualityMultiplier,
            encodedData: props.canvas.encodedData,
            blob: props.canvas.blob,
            url: props.canvas.url,
        };

        expandFrames(props.canvas.width, props.canvas.width, oldHeight, valueInt)
        props.setCanvas(newCanvas);
    } */

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
    
    function togglePreview() {
        if (props.canvas.encodedData != null) {
            props.setPreviewGIF(() => true);
        }
    }

    return (
        <>
        <CanvasOptionsToggle $icon={canvasOptionsToggleIcon} onClick={() => {toggleCanvasOptions()}}></CanvasOptionsToggle>
        <CanvasOptionsWrapper $width={canvasOptionsWidth}>
            <Content>

                <Section>
                    <Title>Frame</Title>

                    <Label>Transition:</Label>
                    <Select value={props.frames[props.currentFrameIndex].disposalMethod}
                            onChange={e => updateDisposalMethod(parseInt(e.target.value))}>
                        <option value={disposalMethodType.restoreToBackgroundColor}> normal </option>
                        <option value={disposalMethodType.keep}> Keep </option>
                        <option value={disposalMethodType.restoreToPreviousState}> Previous State </option>
                    </Select>

                    <Label>Duration:</Label>
                    <Input key={keys[1]} 
                           type="number"
                           min={minDelayTime.toString()}
                           max={maxDelayTime.toString()}
                           value={(props.frames[props.currentFrameIndex].delayTime).toString()}
                           onChange={e => updateDelayTime(e)}/>
                </Section>
                
                <Section>
                    <Title>Canvas</Title>

                    <Option>
                    <Section>
                        <Label>Quality Multiplier</Label>
                            <Input key={keys[2]}
                                type="number"
                                min={minQualityMultiplier.toString()}
                                max={maxQualityMultiplier.toString()}
                                value={(props.canvas.qualityMultiplier).toString()}
                                onChange={e => updateQualityMultiplier(e)} />

                            <Label>Width</Label>
                            <Input key={keys[3]}
                                type="number"
                                min={minCanvasSize.toString()}
                                max={maxCanvasSize.toString()}
                                value={(props.canvas.width).toString()}
                                onChange={e => {e.target.value = (props.canvas.width).toString()}}
                                /* onChange={e => updateCanvasWidth(e)} */ />

                            <Label>Height</Label>
                            <Input key={keys[4]}
                                type="number"
                                min={minCanvasSize.toString()}
                                max={maxCanvasSize.toString()}
                                value={(props.canvas.height).toString()}
                                onChange={e => {e.target.value = (props.canvas.height).toString()}}
                                /* onChange={e => updateCanvasHeight(e)} */ />

                    </Section>

                        <Button onClick={() => {props.encodeGIF()}}>Create GIF</Button>
                        <Button $disabled={props.canvas.encodedData == null} 
                                onClick={() => {togglePreview()}}>Show GIF</Button>
                    </Option>
                </Section>
                
            </Content>
        </CanvasOptionsWrapper>
        </>
    );
}