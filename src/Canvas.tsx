import styled from "styled-components";
import { Pixel } from "./Pixel"


interface CanvasWrapperProps {
    width: number;
    height: number;
    size: string;
}

const CanvasWrapper = styled.div<CanvasWrapperProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    background-color: #3f7cae;
    border: 3px solid black;
    aspect-ratio: ${props => props.width} / ${props => props.height};
    ${props => props.size};
`;




interface MyCanvasProps {
    canvasInfo: any;
    currentFrame: any;
    colorTable: Array<string>;
}

export function Canvas({ canvasInfo, currentFrame, colorTable }: MyCanvasProps) {
    let widthInPixels = canvasInfo.width;
    let heightInPixels = canvasInfo.height;
    
    let canvasSizeControl;
    if (widthInPixels > heightInPixels) {
        canvasSizeControl = "width: 90vw";
    } else {
        canvasSizeControl = "height: min(100%, 90vw);";
    }

    return (
        <>
        <CanvasWrapper size={canvasSizeControl} width={canvasInfo.width} height={canvasInfo.height}>
        {
        [...Array(canvasInfo.height)].map((_, i) => {
            return (
                [...Array(canvasInfo.width)].map((_, j) => {
                    try {
                        console.log()
                        if (currentFrame.localColorTable != null) {
                            return (<Pixel key={crypto.randomUUID()} color={currentFrame.localColorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]} />)
                        } else {
                            return (<Pixel key={crypto.randomUUID()} color={colorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]} />)
                        }
                    } catch (e) {
                        console.log(e);
                        return (<Pixel key={crypto.randomUUID()} color={"#000000"} />)
                    }
                })
            )
        })
        }
        </CanvasWrapper>
        </>
    )
}