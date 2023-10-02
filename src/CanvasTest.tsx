import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Pixel } from "./Pixel"



interface CanvasWrapperProps {
    width: number;
    height: number;
    size: string;
}

const CanvasWrapper = styled.div<CanvasWrapperProps>`
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

export function CanvasTest({ canvasInfo, currentFrame, colorTable }: MyCanvasProps) {
    const htmlCanvasSizeMultiplier = 100;
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
        let canvas;
        let context;

        try {
            if (canvasElem != null) {
                canvas = canvasElem;
                context = canvas.getContext("2d");
                context.fillStyle = color;
                context.fillRect(x * htmlCanvasSizeMultiplier,
                                 y * htmlCanvasSizeMultiplier,
                                 1 * htmlCanvasSizeMultiplier,
                                 1 * htmlCanvasSizeMultiplier);
            } else {
                waitForCanvas().then(() => {
                    canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
                    context = canvas.getContext("2d");
                    context.fillStyle = color;
                    context.fillRect(x * htmlCanvasSizeMultiplier,
                                     y * htmlCanvasSizeMultiplier,
                                     1 * htmlCanvasSizeMultiplier,
                                     1 * htmlCanvasSizeMultiplier);
                });
            }
        } catch (e) {
            console.log(e);
            return;
        }
    }

    return (
        <>
        <CanvasWrapper onClick={() => drawPixel(8, 7, "#000000")} size={canvasSizeControl} width={canvasInfo.width} height={canvasInfo.height}>
        <canvas ref={canvasElemMounted} className="htmlCanvas" width={canvasInfo.width * htmlCanvasSizeMultiplier} height={canvasInfo.height * htmlCanvasSizeMultiplier}></canvas>
        {
        [...Array(canvasInfo.height)].map((_, i) => {
            return (
                [...Array(canvasInfo.width)].map((_, j) => {
                    try {
                        console.log()
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
        </CanvasWrapper>
        </>
    )
}