import styled from "styled-components";
import { Pixel } from "./Pixel"

const CanvasElem = styled.div<{ $size?: string; }>`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 60px);
    background-color: #2196F3;
    height: min-content;
    width: min-content;
`;

interface MyCanvasProps {
    canvasInfo: any;
    currentFrame: any;
}

export function Canvas({ canvasInfo, currentFrame }: MyCanvasProps) {
        //grid-template-columns: repeat(${canvasInfo.width}, ${pixelWidth});


    return (
        <>
        <CanvasElem width={canvasInfo.width}>
        {
        [...Array(canvasInfo.height)].map((value1, index1) => {
            return (
                [...Array(canvasInfo.width)].map((value2, index2) => {
                    return (<Pixel id={index2 + 1} key={index2} pixelColor={'#FFFFFF'} />)
                })
            )
        })
        }
        </CanvasElem>
        </>
    )
}