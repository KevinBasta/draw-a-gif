import styled from "styled-components";
import { canvasType } from "../common/Formats";
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

const PreviewWrapper = styled.div`
    position: absolute;
    height: fit-content;
    width: fit-content;
    padding: min(5vw, 5vh);
    background-color: var(--primary-color);
    z-index: 6;
`;

const PreviewElem = styled.img`
    width: min(80vw, 80vh);
    height: min(80vw, 80vh);
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
            imageTag = <PreviewElem src={"https://pbs.twimg.com/media/F4yoR3oWsAA_w_K?format=jpg&name=large"}></PreviewElem>
        } else {
            imageTag = <PreviewElem src={props.canvas.url}></PreviewElem>
        }

        return imageTag;
    }

    return (
        <>
        <BackgroundDimmer /* onClick={() => {props.setPreviewGIF(() => false)}} */>
            <PreviewWrapper>
                <CanvasOptionsToggle $icon="x" onClick={() => {props.setPreviewGIF(() => false)}}></CanvasOptionsToggle>
                {
                    displayGif()
                }
            </PreviewWrapper>
        </BackgroundDimmer>
        </>
    );
}