import styled from "styled-components";
import { canvasType } from "../shared/Formats";
import { useState } from "react";
import { FrameOptionsToggle } from "./FrameOptionsStyles";
import { BackgroundDimmer, PreviewCenterer, PreviewElem, PreviewWrapper } from "./PreviewStyles";


interface PreviewProps {
    canvas: canvasType,
    setCanvas: Function,

    setPreviewGIF: Function,
}

export function Preview(props: PreviewProps) {
    function displayGif() {
        let imageTag;
        
        if (props.canvas.encodedData == null) {
            imageTag = <PreviewElem $widthratio={props.canvas.width} $heightratio={props.canvas.height} src={""}></PreviewElem>
        } else {
            imageTag = <PreviewElem $widthratio={props.canvas.width} $heightratio={props.canvas.height} src={props.canvas.url}></PreviewElem>
        }

        return imageTag;
    }

    return (
        <>
        <BackgroundDimmer onClick={() => {props.setPreviewGIF(() => false)}} />
        
        <PreviewCenterer>
            <PreviewWrapper>
                <FrameOptionsToggle $icon="x" onClick={() => {props.setPreviewGIF(() => false)}}></FrameOptionsToggle>
                {
                    displayGif()
                }
            </PreviewWrapper>
        </PreviewCenterer>
        </>
    );
}