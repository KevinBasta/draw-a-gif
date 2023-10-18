import styled from "styled-components";
import { canvasType } from "../common/Formats";
import { useState } from "react";

const PreviewWrapper = styled.div`

`;

const PreviewGIF = styled.img`

`;

interface PreviewProps {
    canvas: canvasType,
    setCanvas: Function,
}

export function Preview(props: PreviewProps) {
    function displayGif() {
        let imageTag;
        
        if (props.canvas.encodedData == null) {
            imageTag = <PreviewGIF src={}></PreviewGIF>
        } else if (props.canvas.url == null || props.canvas.blob == null) {
            let encodedBlob = new Blob([props.canvas.encodedData.buffer], { type: 'image/gif' })
            let blobUrl  = URL.createObjectURL(encodedBlob);

            props.setCanvas((currentCanvas: canvasType) => {
                return {
                    key: currentCanvas.key,
                    canvasElement: currentCanvas.canvasElement,
                    width: currentCanvas.width,
                    height: currentCanvas.height,
                    encodedData: currentCanvas.encodedData,
                    blob: encodedBlob,
                    url: blobUrl,
                }
            });
        
            imageTag = <PreviewGIF src={blobUrl}></PreviewGIF>
        } else {
            imageTag = <PreviewGIF src={props.canvas.url}></PreviewGIF>
        }

        return imageTag;
    }

    return (
        <PreviewWrapper>
            {
                displayGif()        
            }
        </PreviewWrapper>
    );
}