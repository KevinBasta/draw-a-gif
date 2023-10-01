import styled from "styled-components";
import { Pixel } from "./Pixel"

const CanvasElem = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    background-color: #2196F3;
    aspect-ratio: ${props => props.width} / ${props => props.height};
    ${props => props.size};
`;

const PixelElem = styled.div`
    background-color: ${props => props.color};
    aspect-ratio: 1/1;
    border: 1px solid black;
`;

interface MyCanvasProps {
    canvasInfo: any;
    currentFrame: any;
    colorTable: Array;
}

export function Canvas({ canvasInfo, currentFrame, colorTable }: MyCanvasProps) {
    let widthInPixels = canvasInfo.width;
    let heightInPixels = canvasInfo.height;
    
    let canvasSizeControl;
    if (widthInPixels > heightInPixels) {
        canvasSizeControl = "width: 50vw";
    } else {
        canvasSizeControl = "height: min(100%, 80vw);";
    }
    let list = [];
    return (
        <>
        <CanvasElem size={canvasSizeControl} width={canvasInfo.width} height={canvasInfo.height}>
        {
        [...Array(canvasInfo.height)].map((_, i) => {
            return (
                [...Array(canvasInfo.width)].map((_, j) => {
                    try {
                        console.log()
                        return (<PixelElem id={(i * canvasInfo.width) + j} key={crypto.randomUUID()} color={colorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]} />)
                    } catch (e) {
                        console.log(e);
                        return (<PixelElem key={crypto.randomUUID()} color={"#000000"} />)
                    }
                })
            )
        })
        }
        </CanvasElem>
        </>
    )
}