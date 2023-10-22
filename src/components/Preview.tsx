import styled from "styled-components";
import { canvasType } from "../common/formats";
import { useState } from "react";
import { CanvasOptionsToggle } from "./CanvasMenuStyles";


const BackgroundDimmer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PreviewCenterer = styled.div`
    pointer-events: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 6;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PreviewWrapper = styled.div`
    pointer-events: auto;
    position: absolute;
    height: fit-content;
    width: fit-content;
    padding: min(5vw, 5vh);
    background-color: var(--primary-color);
    z-index: 6;
`;

const PreviewElem = styled.img<{ $widthratio: number; $heightratio: number; }>`
    /* width: calc(${props => props.$widthratio} * 30px);
    height: calc(${props => props.$heightratio} * 30px); */
    max-width: min(80vw, 80vh);
    max-height: min(80vw, 80vh);

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio};
`;

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
                <CanvasOptionsToggle $icon="x" onClick={() => {props.setPreviewGIF(() => false)}}></CanvasOptionsToggle>
                {
                    displayGif()
                }
            </PreviewWrapper>
        </PreviewCenterer>
        </>
    );
}