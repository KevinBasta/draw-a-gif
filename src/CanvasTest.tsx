import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Pixel } from "./Pixel"



interface CanvasWrapperProps {
    $ratiowidth: number;
    $ratioheight: number;
    size: string;
}

const CanvasWrapper = styled.canvas<CanvasWrapperProps>`
    background-color: #3f7cae;
    border: 3px solid black;
    aspect-ratio: ${props => props.$ratiowidth} / ${props => props.$ratioheight};
    ${props => props.size};
`;




interface MyCanvasProps {
    canvasInfo: any;
    currentFrame: any;
    colorTable: Array<string>;
}

export function CanvasTest({ canvasInfo, currentFrame, colorTable }: MyCanvasProps) {
    const htmlCanvasSizeMultiplier = 50;
    const canvasElemMounted = useRef(null);
    const [canvasElem, setCanvasElem] = useState(null);
    
    
    let widthInPixels = canvasInfo.width;
    let heightInPixels = canvasInfo.height;
    
    let canvasSizeControl;
    if (widthInPixels > heightInPixels) {
        canvasSizeControl = "width: 90vw";
    } else {
        canvasSizeControl = "height: min(100%, 90vw);";
    }

    function saveCanvasElem() {
        setCanvasElem(() => {
            return document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
        })
    }

    function waitForCanvas() {
        return new Promise(resolve => {
            setTimeout(() => {
                if (canvasElemMounted != null) {
                    saveCanvasElem();
                    return resolve(canvasElemMounted);
                }
            }, 10);
        });
    }

    useEffect(() => {
        waitForCanvas();
    }, []);

    function drawPixel(x: number, y: number, color: string) {
        let canvasElemWidth = canvasInfo.width * htmlCanvasSizeMultiplier;
        let canvasElemHeight = canvasInfo.height * htmlCanvasSizeMultiplier;

        let canvas;
        let context;

        try {
            canvas = canvasElem;

            const rect = canvas.getBoundingClientRect();
            let mpx = x - rect.left;
            let mpy = y - rect.top;
            let mappedX = Math.round(((mpx - (mpx % canvasInfo.width)) / htmlCanvasSizeMultiplier) * canvas.width / rect.width);
            let mappedY = Math.round(((mpy - (mpy % canvasInfo.height)) / htmlCanvasSizeMultiplier) * canvas.width / rect.width);
            console.log(x, mappedX, y, mappedY)

            context = canvas.getContext("2d");
            context.fillStyle = color;
            context.fillRect(mappedX * htmlCanvasSizeMultiplier,
                             mappedY * htmlCanvasSizeMultiplier,
                             1 * htmlCanvasSizeMultiplier,
                             1 * htmlCanvasSizeMultiplier);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function drawCanvas() {
        [...Array(canvasInfo.height)].map((_, i) => {
            return (
                [...Array(canvasInfo.width)].map((_, j) => {
                    try {
                        if (currentFrame.localColorTable != null) {
                            drawPixel(i, j, currentFrame.localColorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]);
                        } else {
                            drawPixel(i, j, colorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]);
                        }
                    } catch (e) {
                        console.log(e);
                        drawPixel(i, j, "#000000");
                    }
                })
            )
        })
    }

    return (
        <>
        <CanvasWrapper ref={canvasElemMounted} 
                       onClick={(e) => drawPixel(e.clientX, e.clientY, "#000000")}
                       onLoad={() => drawCanvas()}
                       size={canvasSizeControl}
                       width={canvasInfo.width * htmlCanvasSizeMultiplier}
                       height={canvasInfo.height * htmlCanvasSizeMultiplier}
                       $ratiowidth={canvasInfo.width}
                       $ratioheight={canvasInfo.height} />
        </>
    )
}