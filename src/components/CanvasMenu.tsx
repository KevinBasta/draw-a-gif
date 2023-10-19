import { useState } from "react";
import { canvasType, disposalMethodType, frameType } from "../common/Formats";
import { CanvasOptionsToggle, CanvasOptionsWrapper, Content, Section, Option, Select } from "./CanvasMenuStyles"
import { Button, Input, Label, Title } from "../common/CommonStyledComponents";



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
        let value = e.target.value;
        let valueInt = parseInt(value);

        if (valueInt > 65535) {
            e.key = (65535).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 0) {
            e.key = (0).toString();
            value = (e.key).toString();
        }

        valueInt = parseInt(value);
        
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return {
                    key: frame.key,
                    disposalMethod: frame.disposalMethod,
                    delayTime: valueInt,
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
        let value = e.target.value;
        let valueInt = parseInt(value);

        if (valueInt > 1000) {
            e.key = (1000).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 1) {
            e.key = (1).toString();
            value = (e.key).toString();
        }

        valueInt = parseInt(value);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: props.canvas.width,
            height: props.canvas.height,
            qualityMultiplier: valueInt,
            encodedData: props.canvas.encodedData,
            blob: props.canvas.blob,
            url: props.canvas.url,
        };

        props.setCanvas(newCanvas);
    }

    /* function updateCanvasWidth(e: any) {
        let value = e.target.value;
        let valueInt = parseInt(value);
        let oldWidth = valueInt;

        if (valueInt > 10000) {
            e.key = (10000).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 1) {
            e.key = (1).toString();
            value = (e.key).toString();
        }

        valueInt = parseInt(value);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: valueInt,
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
        let value = e.target.value;
        let valueInt = parseInt(value);
        let oldHeight = valueInt;

        if (valueInt > 10000) {
            e.key = (10000).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 1) {
            e.key = (1).toString();
            value = (e.key).toString();
        }

        valueInt = parseInt(value);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasElement: props.canvas.canvasElement,
            width: props.canvas.width,
            height: valueInt,
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
 
    function expandIndexStream(indexStream: Array<number>, oldWidth: number, newWidth: number, oldHeight: number, newHeight: number) {
        

        //for (let i = 0; i < )
    }

    // called for resizing of canvas
    function expandFrames(oldWidth: number, newWidth: number, oldHeight: number, newHeight: number) {
        const newFrames = props.frames.map((frame, i) => {
            let newIndexStream =  expandIndexStream(frame.indexStream, oldWidth, newWidth, oldHeight, newHeight);
            
            return {
                key: frame.key,
                disposalMethod: frame.disposalMethod,
                delayTime: frame.delayTime,
                useLocalColorTable: frame.useLocalColorTable,
                localColorTable: frame.localColorTable,
                indexStream: newIndexStream,
                previewUrl: frame.previewUrl,
            }
        });
      
        props.setFrames(() => newFrames);
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

                    <Label>Transition Type:</Label>
                    <Select value={props.frames[props.currentFrameIndex].disposalMethod}
                            onChange={e => updateDisposalMethod(parseInt(e.target.value))}>
                        <option value={disposalMethodType.keep}> Keep </option>
                        <option value={disposalMethodType.restoreToBackgroundColor}> Background Color </option>
                        <option value={disposalMethodType.restoreToPreviousState}> Previous State </option>
                    </Select>

                    <Label>Transition Time:</Label>
                    <Input key={keys[1]} 
                           type="number"
                           min="0"
                           max="65535"
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
                                min="1"
                                max="1000"
                                value={(props.canvas.qualityMultiplier).toString()}
                                onChange={e => updateQualityMultiplier(e)} />

                            <Label>Width</Label>
                            <Input key={keys[3]}
                                type="number"
                                min="1"
                                max="10000"
                                value={(props.canvas.width).toString()}
                                onChange={e => {e.target.value = (props.canvas.width).toString()}}
                                /* onChange={e => updateCanvasWidth(e)} */ />

                            <Label>Height</Label>
                            <Input key={keys[4]}
                                type="number"
                                min="1"
                                max="10000"
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