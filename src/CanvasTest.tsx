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
    currentFrame: any;
    colorTable: Array<string>;
}

export function CanvasTest({ canvasInfo, currentFrame, colorTable }: MyCanvasProps) {
    const htmlCanvasSizeMultiplier = 50;
    const canvasElemMounted = useRef(null);
    const [canvasElem, setCanvasElem] = useState(null);
    
    var mouseDown = 0;
    document.body.onmousedown = function() { 
    ++mouseDown;
    }
    document.body.onmouseup = function() {
    --mouseDown;
    }

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

    function drawUserInputPixel(x: number, y: number, color: string) {
        let canvas;
        let context;

        try {
            canvas = canvasElem;

            const rect = canvas.getBoundingClientRect();
            let mpx = (x - rect.left) * canvas.width / rect.width;
            let mpy = (y - rect.top) * canvas.height / rect.height;
            let mappedX = Math.round(((mpx - (mpx % htmlCanvasSizeMultiplier)) / htmlCanvasSizeMultiplier));
            let mappedY = Math.round(((mpy - (mpy % htmlCanvasSizeMultiplier)) / htmlCanvasSizeMultiplier));
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

    function drawFrameOnCanvas() {
        [...Array(canvasInfo.height)].map((_, i) => {
            return (
                [...Array(canvasInfo.width)].map((_, j) => {
                    try {
                        if (currentFrame.localColorTable != null) {
                            drawFrameDataPixel(i, j, currentFrame.localColorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]);
                        } else {
                            drawFrameDataPixel(i, j, colorTable[currentFrame.indexStream[(i * canvasInfo.width) + j]]);
                        }
                    } catch (e) {
                        console.log(e);
                        drawFrameDataPixel(i, j, "#000000");
                    }
                })
            )
        })
    }

    return (
        <>
        <CanvasWrapper ref={canvasElemMounted} 
                       onMouseMove={(e) => {if (mouseDown == 1) {drawUserInputPixel(e.clientX, e.clientY, "#000000")}}}
                       onClick={() => drawFrameOnCanvas()}
                       size={canvasSizeControl}
                       width={canvasInfo.width * htmlCanvasSizeMultiplier}
                       height={canvasInfo.height * htmlCanvasSizeMultiplier}
                       $ratiowidth={canvasInfo.width}
                       $ratioheight={canvasInfo.height} />
        </>
    )
}