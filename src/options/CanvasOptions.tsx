import { useState } from "react";
import { canvasType, frameType } from "../shared/Formats";
import { CanvasOptionsToggle, CanvasOptionsWrapper } from "./CanvasOptionsStyles";
import { Content, Section, SectionWrapper } from "./FrameOptionsStyles";
import { Button, Input, Label, Title } from "../shared/SharedStyledComponents";
import { maxCanvasSize, maxQualityMultiplier, minCanvasSize, minQualityMultiplier } from "../shared/Constants";
import { returnInput } from "../shared/SharedUtilities";

interface CanvasOptionsProps {
    canvas: canvasType,
    setCanvas: Function,
    
    frames: Array<frameType>,
    setFrames: Function,
    
    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    setPreviewGIF: Function;

    encodeGIF: Function;
    saveGIF: Function;
}

let keys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]

export function CanvasOptions(props: CanvasOptionsProps) {
    const [canvasOptionsWidth, setCanvasOptionsWidth] = useState("0px");
    const [canvasOptionsToggleIcon, setCanvasOptionsToggleIcon] = useState("arrow_forward");

    function toggleCanvasOptions() {
        switch (canvasOptionsWidth) {
            case "0px":
                setCanvasOptionsWidth(() => {return "100%"});
                setCanvasOptionsToggleIcon(() => {return "arrow_back"})
                break;
            default:
                setCanvasOptionsWidth(() => {return "0px"});
                setCanvasOptionsToggleIcon(() => {return "arrow_forward"})
        }
    }

    function updateQualityMultiplier(e: any) {
        let value = returnInput(e, minQualityMultiplier, maxQualityMultiplier);
        
        const newCanvas = {
            key: props.canvas.key,
            canvasName: props.canvas.canvasName,
            canvasElement: props.canvas.canvasElement,
            width: props.canvas.width,
            height: props.canvas.height,
            qualityMultiplier: value,
            encodedData: props.canvas.encodedData,
            blob: props.canvas.blob,
            url: props.canvas.url,
        };

        props.setCanvas(newCanvas);
    }

    function togglePreview() {
        if (props.canvas.encodedData != null) {
            props.setPreviewGIF(() => true);
        }
    }

    return (
        <>
            <CanvasOptionsToggle $icon={canvasOptionsToggleIcon} 
                                 className="material-symbols-outlined"
                                 onClick={() => {toggleCanvasOptions()}}/>

            <CanvasOptionsWrapper $width={canvasOptionsWidth}>
                <Content>
                <Section>
                    <Title>Canvas</Title>

                    <SectionWrapper>
                    <Section>
                        <Label>Quality Multiplier</Label>
                            <Input key={keys[0]}
                                type="number"
                                min={minQualityMultiplier.toString()}
                                max={maxQualityMultiplier.toString()}
                                value={(props.canvas.qualityMultiplier).toString()}
                                onChange={e => updateQualityMultiplier(e)} />

                            <Label>Width</Label>
                            <Input key={keys[1]}
                                type="number"
                                min={minCanvasSize.toString()}
                                max={maxCanvasSize.toString()}
                                value={(props.canvas.width).toString()}
                                onChange={e => {e.target.value = (props.canvas.width).toString()}}
                                /* onChange={e => updateCanvasWidth(e)} */ />

                            <Label>Height</Label>
                            <Input key={keys[2]}
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
                        <Button onClick={() => {props.saveGIF()}}>Save GIF</Button>
                    </SectionWrapper>
                </Section>
                </Content>
            </CanvasOptionsWrapper>
        </>
    );
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