import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Pixel } from "./Pixel"
import { frame, color } from "./formats"

var mouseDown = 0;

document.body.onmousedown = function() { 
mouseDown = 1;
}

document.body.onmouseup = function() {
mouseDown = 0;
}

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
    transparentBackground: frame;
    currentFrame: frame;
    colorTable: Array<color>;
    pickedColorIndex: number;
}

export function Canvas({ canvasInfo, transparentBackground, currentFrame, colorTable, pickedColorIndex }: MyCanvasProps) {
    let htmlCanvasSizeMultiplier = 1;
    if (canvasInfo.width < 100 || canvasInfo.height < 100) {
        htmlCanvasSizeMultiplier = 50;
    } else if (canvasInfo.width < 250 || canvasInfo.height < 250) {
        htmlCanvasSizeMultiplier = 25;
    } else if (canvasInfo.width < 550 || canvasInfo.height < 550) {
        htmlCanvasSizeMultiplier = 10;
    }
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

    function getColorString(clr: color, indexStreamIndex: number) {
        if (clr.transparent === true) {
            let indexStreamColorTableIndex: number = transparentBackground.indexStream[indexStreamIndex];
            let colorTableColor: color = transparentBackground.localColorTable[indexStreamColorTableIndex];
            console.log(colorTableColor);
            return "rgba(" + colorTableColor.red + ", " + colorTableColor.green + ", " + colorTableColor.blue + ", 0.99)"
        }
        
        return "rgb(" + clr.red + ", " + clr.green + ", " + clr.blue + ")"
    }

    function drawUserInputPixel(x: number, y: number) {
        if (mouseDown == 0) {
            return;
        }

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
            let indexStreamIndex = (canvasInfo.width * dataMappedY) + dataMappedX;
            console.log(pickedColorIndex);
            currentFrame.indexStream[indexStreamIndex] = pickedColorIndex;
            drawFrameDataPixel(dataMappedX, dataMappedY, getColorString(colorTable[pickedColorIndex], indexStreamIndex));
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
    }, [ currentFrame ]);

    useEffect(() => {
        console.log(pickedColorIndex);
    }, [ pickedColorIndex ]);

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