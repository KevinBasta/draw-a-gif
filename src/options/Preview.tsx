import styled from "styled-components";
import { canvasType } from "../shared/Formats";
import { useState } from "react";
import { BackgroundDimmer, PreviewCenterer, PreviewElem, PreviewWrapper } from "./PreviewStyles";
import { ButtonPreviewClose } from "../shared-styles/Button";


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
                <ButtonPreviewClose $icon="x" onClick={() => {props.setPreviewGIF(() => false)}}></ButtonPreviewClose>
                {
                    displayGif()
                }
            </PreviewWrapper>
        </PreviewCenterer>
        </>
    );
}