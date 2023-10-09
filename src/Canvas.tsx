import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Pixel } from "./Pixel"
import { frame, color } from "./formats"
import { ColorTable } from './ColorTable';
import { PaintTool } from './const';

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
    background-color: var(--primary-color);
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
    currentTool: PaintTool;
    clrTable: Array<color>;
    pickedColorIndex: number;
}

export function Canvas({ canvasInfo, transparentBackground, currentFrame, clrTable, pickedColorIndex, currentTool }: MyCanvasProps) {
    let htmlCanvasSizeMultiplier = 1;
    let brushSize = 0;

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


    function drawCanvasAndSaveData(x: number, y: number) {
        let topRightIndexStreamIndex = (canvasInfo.width * y) + x;

        saveFrameDataPixel(x, y, topRightIndexStreamIndex);
        drawFrameDataPixel(x, y, getColorString(clrTable[pickedColorIndex], topRightIndexStreamIndex));
    }

    let visited: Array<number> = [];
    function populateVisited() {
        visited = [];
        for (let i = 0; i < canvasInfo.width; i++) {
            for (let j = 0; j < canvasInfo.height; j++) {
                visited.push(0);
            }
        }
    }

    function getIndexStreamIndex(x: number, y: number) {
        return (x + (canvasInfo.width * y));
    }


    function setNeighbors(x: number, y: number, colorIndexValue: number) {
        //console.log("set neightboors called");
        //console.log(currentFrame.indexStream);
        // let currentIndex = x + (canvasInfo.width * y);
        
        /* if (x < 0 || x > canvasInfo.width ||
            y < 0 || y > canvasInfo.height || 
            visited.includes(currentIndex) || 
            currentFrame.indexStream[currentIndex] != colorIndexValue) {
            return;
        } */
        let n = 0;
        let pixelsSetInIter = 0;
        let edges = [[x, y]];

        do {
            let newEdges = [];
            let adjacent = [];
            pixelsSetInIter = 0;

            for (let i = 0; i < edges.length; i++) {
                let edgeX = edges[i][0];
                let edgeY = edges[i][1];

                adjacent.push([getIndexStreamIndex(edgeX - 1, edgeY), edgeX - 1, edgeY]);
                adjacent.push([getIndexStreamIndex(edgeX + 1, edgeY), edgeX + 1, edgeY]);
                adjacent.push([getIndexStreamIndex(edgeX, edgeY - 1), edgeX, edgeY - 1]);
                adjacent.push([getIndexStreamIndex(edgeX, edgeY + 1), edgeX, edgeY + 1]);
            }

            for (let j = 0; j < adjacent.length; j++) {
                let currentIndex = adjacent[j][0];
                let currentX = adjacent[j][1];
                let currentY = adjacent[j][2];
                
                if (currentX < 0 || currentX >= canvasInfo.width ||
                    currentY < 0 || currentY >= canvasInfo.height) {
                    continue;
                }

                if (currentFrame.indexStream[currentIndex] == colorIndexValue) {
                    visited[currentIndex] = pickedColorIndex;
                    newEdges.push([currentX, currentY]);
                    pixelsSetInIter++;
                }
            }

            for (let i = 0; i < visited.length; i++) {
                if (visited[i] == pickedColorIndex) {
                    currentFrame.indexStream[i] = pickedColorIndex;
                }
            }
            
            edges = [];
            edges = newEdges.slice();
            n++;
            /* console.log(n)
            console.log(pixelsSetInIter)
            console.log(edges); */
        } while (pixelsSetInIter > 0);
        alert("done");
        console.log(n);
/*         for (let i = y; i < canvasInfo.height; i++) {
            for (let j = x; j >= 0; j--) {
                let currentIndex = j + (canvasInfo.width * i);
                if (currentFrame.indexStream[currentIndex] != colorIndexValue) {
                    break;
                } else {
                    currentFrame.indexStream[currentIndex] = pickedColorIndex;
                }
            }

            for (let j = x; j < canvasInfo.width; j++) {
                let currentIndex = j + (canvasInfo.width * i);
                if (currentFrame.indexStream[currentIndex] != colorIndexValue) {
                    break;
                } else {
                    currentFrame.indexStream[currentIndex] = pickedColorIndex;
                }
            }
        } */
        
/*         for (let i = y; i >= 0; i--) {
            for (let j = x; j >= 0; j--) {
                let currentIndex = j + (canvasInfo.width * i);
                if (currentFrame.indexStream[currentIndex] != colorIndexValue) {
                    break;
                } else {
                    currentFrame.indexStream[currentIndex] = pickedColorIndex;
                }
            }
            
            for (let j = x; j < canvasInfo.width; j++) {
                let currentIndex = j + (canvasInfo.width * i);
                if (currentFrame.indexStream[currentIndex] != colorIndexValue) {
                    break;
                } else {
                    currentFrame.indexStream[currentIndex] = pickedColorIndex;
                }
            }
        } */

    }

    function saveFrameDataPixel(x: number, y: number, topRightIndexStreamIndex: number) {
        if (currentTool != PaintTool.bucket) {
            let paintWidth = 1;
            if (currentTool == PaintTool.brush) {
                paintWidth = 10;
            }

            currentFrame.indexStream[topRightIndexStreamIndex] = pickedColorIndex;
            for (let i = 0; i < paintWidth; i++) {
                for (let j = 0; j < paintWidth; j++) {
                    currentFrame.indexStream[topRightIndexStreamIndex + i + (canvasInfo.width * j)] = pickedColorIndex;
                }
            }
        } else {
            mouseDown = 0;
            let replacingColorIndex =  currentFrame.indexStream[topRightIndexStreamIndex];
            populateVisited();
            visited[x + (canvasInfo.width * y)] = pickedColorIndex;
            
            setNeighbors(x, y, replacingColorIndex);
            drawFrameOnCanvas();
        }
    }

    function drawFrameDataPixel(x: number, y: number, color: string) {
        let canvas;
        let context;

        try {
            canvas = canvasElem;
            context = canvas.getContext("2d");
            context.fillStyle = color;
            fillContext(context, x, y);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function fillContext(context: any, x: number, y: number) {
        context.fillRect((x) * htmlCanvasSizeMultiplier,
                         (y) * htmlCanvasSizeMultiplier,
                         1 * htmlCanvasSizeMultiplier,
                         1 * htmlCanvasSizeMultiplier);
    }


    function getColorString(clr: color, indexStreamIndex: number) {

        if (clr.transparent === true) {
            let indexStreamColorTableIndex: number = transparentBackground.indexStream[indexStreamIndex];
            let colorTableColor: color = transparentBackground.localColorTable[indexStreamColorTableIndex];
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
            //console.log(x, dataMappedX, y, dataMappedY);
            drawCanvasAndSaveData(dataMappedX, dataMappedY);
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
                        let indexStreamIndex = (j * canvasInfo.width) + i;
                        let colorTableIndex = frame.indexStream[indexStreamIndex];

                        if (colorTableIndex < clrTable.length) {
                            if (frame.localColorTable != null) {
                                context.fillStyle = getColorString(frame.localColorTable[colorTableIndex], indexStreamIndex);
                            } else {
                                context.fillStyle = getColorString(clrTable[colorTableIndex], indexStreamIndex);
                            }
                            
                            fillContext(context, i, j);
                        } else {
                            currentFrame.indexStream[indexStreamIndex] = 0;
                        }
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
    }, [ currentFrame, currentFrame.indexStream, clrTable ]);

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