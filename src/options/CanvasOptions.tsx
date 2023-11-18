import { useState } from "react";
import { canvasType, frameType } from "../shared/Formats";
import { CanvasOptionsWrapper } from "./CanvasOptionsStyles";
import { Label, Title } from "../shared-styles/Text";
import { maxCanvasSize, maxQualityMultiplier, minCanvasSize, minQualityMultiplier, widthCanvasOptions } from "../shared/Constants";
import { returnInput } from "../shared/SharedUtilities";
import { ButtonCanvasTab, ButtonLarge } from "../shared-styles/Button";
import { OptionsInputLabelWrapper, OptionsSection, OptionsWrapper } from "./OptionsWrappers";
import { getCanvasUpdatedQualityMultiplier } from "../core/CanvasCore";
import { InputStandard } from "../shared-styles/Input";

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
    function updateQualityMultiplier(e: any) {
        let value = returnInput(e, minQualityMultiplier, maxQualityMultiplier);
        
        const newCanvas = getCanvasUpdatedQualityMultiplier(props.canvas, value);

        props.setCanvas(newCanvas);
    }

    function togglePreview() {
        if (props.canvas.encodedData != null) {
            props.setPreviewGIF(() => true);
        }
    }

    return (
        <>
            <CanvasOptionsWrapper>
                <OptionsWrapper>
                    <OptionsSection>
                        <Title>Canvas</Title>
                        <OptionsInputLabelWrapper>
                            <Label>Quality Multiplier</Label>
                            <InputStandard key={keys[0]}
                                type="number"
                                min={minQualityMultiplier.toString()}
                                max={maxQualityMultiplier.toString()}
                                value={(props.canvas.qualityMultiplier).toString()}
                                onChange={e => updateQualityMultiplier(e)} />

                            <Label>Width</Label>
                            <InputStandard key={keys[1]}
                                type="number"
                                min={minCanvasSize.toString()}
                                max={maxCanvasSize.toString()}
                                value={(props.canvas.width).toString()}
                                onChange={e => {e.target.value = (props.canvas.width).toString()}}
                                /* onChange={e => updateCanvasWidth(e)} */ />

                            <Label>Height</Label>
                            <InputStandard key={keys[2]}
                                type="number"
                                min={minCanvasSize.toString()}
                                max={maxCanvasSize.toString()}
                                value={(props.canvas.height).toString()}
                                onChange={e => {e.target.value = (props.canvas.height).toString()}}
                                /* onChange={e => updateCanvasHeight(e)} */ />
                        </OptionsInputLabelWrapper>

                        <ButtonLarge onClick={() => {props.encodeGIF()}}>Create GIF</ButtonLarge>
                        <ButtonLarge $disabled={props.canvas.encodedData == null} 
                                     onClick={() => {togglePreview()}}>Show GIF</ButtonLarge>
                        <ButtonLarge onClick={() => {props.saveGIF()}}>Save GIF</ButtonLarge>
                    </OptionsSection>
                </OptionsWrapper>
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