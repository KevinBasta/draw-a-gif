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

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;




interface MyCanvasProps {
    canvasInfo: any;
    transparentBackground: any;
    currentFrame: any;
    colorTable: Array<string>;
}

export function Canvas({ canvasInfo, transparentBackground, currentFrame, colorTable }: MyCanvasProps) {
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

    function drawFrameDataPixel(x: number, y: number, color: string) {
        let canvas;
        let context;

        try {
            canvas = canvasElem;
            context = canvas.getContext("2d");
            context.fillStyle = color;
            context.fillRect(x * htmlCanvasSizeMultiplier,
                             y * htmlCanvasSizeMultiplier,
                             1 * htmlCanvasSizeMultiplier,
                             1 * htmlCanvasSizeMultiplier);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function drawUserInputPixel(x: number, y: number) {
        if (currentFrame == transparentBackground) {
            return;
        }

        let canvas;
        let context;

        try {
            canvas = canvasElem;
            const rect = canvas.getBoundingClientRect();
            let contextX = (x - rect.left) * canvas.width / rect.width;
            let contextY = (y - rect.top) * canvas.height / rect.height;
            let dataMappedX = Math.round(((contextX - (contextX % htmlCanvasSizeMultiplier)) / htmlCanvasSizeMultiplier));
            let dataMappedY = Math.round(((contextY - (contextY % htmlCanvasSizeMultiplier)) / htmlCanvasSizeMultiplier));
            console.log(x, dataMappedX, y, dataMappedY);
            currentFrame.indexStream[(canvasInfo.width * dataMappedY) + dataMappedX] = 1;
            console.log((canvasInfo.width * dataMappedY) + dataMappedX)
            console.log(currentFrame);
            drawFrameDataPixel(dataMappedX, dataMappedY, "#000000");
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function drawFrameOnCanvas() {
        let frame: any;
        if (currentFrame == null) {
            if (transparentBackground == null) {
                throw new Error('No frame or transparentBackground');
            } else {
                frame = transparentBackground;
            }
        } else { 
            frame = currentFrame;
        }

        let canvas = canvasElem;
        if (canvas == null) {
            return;
        }
        
        let context = canvas.getContext("2d");
        
        
        [...Array(canvasInfo.width)].map((_, i) => {
            return (
                [...Array(canvasInfo.height)].map((_, j) => {
                    try {
                        let colorTableIndex = frame.indexStream[(j * canvasInfo.width) + i];

                        if (colorTableIndex == 0) {
                            let transparentBackgroundEntry = transparentBackground.indexStream[(j * canvasInfo.width) + i];
                            context.fillStyle = transparentBackground.localColorTable[transparentBackgroundEntry];
                        } else if (frame.localColorTable != null) {
                            context.fillStyle = frame.localColorTable[colorTableIndex];
                        } else {
                            context.fillStyle = colorTable[colorTableIndex];
                        }
                        
                        context.fillRect(i * htmlCanvasSizeMultiplier,
                                         j * htmlCanvasSizeMultiplier,
                                         1 * htmlCanvasSizeMultiplier,
                                         1 * htmlCanvasSizeMultiplier);
                    } catch (e) {
                        console.log(e);
                        drawFrameDataPixel(i, j, "#000000");
                    }
                })
            )
        })
    }

    useEffect(() => {
        drawFrameOnCanvas();
    }, [ currentFrame.indexStream ]);

    return (
        <>
        <CanvasWrapper ref={canvasElemMounted} 
                       onMouseMove={(e) => {drawUserInputPixel(e.clientX, e.clientY)}}
                       size={canvasSizeControl}
                       width={canvasInfo.width * htmlCanvasSizeMultiplier}
                       height={canvasInfo.height * htmlCanvasSizeMultiplier}
                       $ratiowidth={canvasInfo.width}
                       $ratioheight={canvasInfo.height} />
        </>
    )
}