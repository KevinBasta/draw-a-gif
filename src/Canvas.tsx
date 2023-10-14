import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData } from "./Formats"
import { CanvasObject } from './CanvasObject';
import { getColorString } from './ColorUtil';

// For detecting clicks on canvas
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



interface CanvasProps {
    canvas: canvasType;
    transparentBackground: frameType;

    currentFrame: frameType;
    setCurrentFrame: Function;
    
    currentTool: toolData;
    
    currentColorTable: colorTableType;
    currentColorIndex: number;
}

let canvasElement: CanvasObject = null;
export function Canvas(props: CanvasProps) {
    let canvasWidthInPixels = props.canvas.width;
    let canvasHeightInPixels = props.canvas.height;
    
    // Set width/height css property directly depending on width/height ratio
    let canvasSizeControl;
    if (canvasWidthInPixels > canvasHeightInPixels) {
        canvasSizeControl = "width: 90vw";
    } else {
        canvasSizeControl = "height: min(100%, 90vw);";
    }

    // Set the factor to multiply canvas by to make frames sharper
    let qualityMultiplier = 1;
    if (canvasWidthInPixels < 100 || canvasHeightInPixels < 100) {
        qualityMultiplier = 50;
    } else if (canvasWidthInPixels < 250 || canvasHeightInPixels < 250) {
        qualityMultiplier = 25;
    } else if (canvasWidthInPixels < 550 || canvasHeightInPixels < 550) {
        qualityMultiplier = 10;
    }

    function getColorObject(indexStreamIndex: number) {
        let colorObject: colorType = {red: 0, blue: 0, green: 0};
        let colorTableIndex: number = props.currentFrame.indexStream[indexStreamIndex];
        
        if (colorTableIndex < props.currentColorTable.items.length) {
            if (colorTableIndex == props.currentColorTable.transparentColorIndex) {
                let transparentColorTableIndex: number = props.transparentBackground.indexStream[indexStreamIndex];
                colorObject = props.transparentBackground.localColorTable.items[transparentColorTableIndex];
            } else {
                colorObject = props.currentColorTable.items[colorTableIndex];
            }
        }

        return colorObject;
    }

    let visited: Array<number> = [];
    function populateVisited() {
        visited = [];
        for (let i = 0; i < canvasWidthInPixels; i++) {
            for (let j = 0; j < canvasHeightInPixels; j++) {
                visited.push(0);
            }
        }
    }

    function getIndexStreamIndex(x: number, y: number) {
        return (x + (canvasWidthInPixels * y));
    }


    function setNeighbors(x: number, y: number, colorIndexValue: number) {
        let n = 0;
        let pixelsSetInIter = 0;
        let edges = [[x, y]];

        // This is too slow for larger canvases
        // recursive (even tail recursive sol) attempted but is too expensive
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
                
                if (currentX < 0 || currentX >= canvasWidthInPixels ||
                    currentY < 0 || currentY >= canvasHeightInPixels) {
                    continue;
                }

                if (props.currentFrame.indexStream[currentIndex] == colorIndexValue) {
                    visited[currentIndex] = props.currentColorIndex;
                    newEdges.push([currentX, currentY]);
                    pixelsSetInIter++;
                }
            }

            for (let i = 0; i < visited.length; i++) {
                if (visited[i] == props.currentColorIndex) {
                    props.currentFrame.indexStream[i] = props.currentColorIndex;
                }
            }
            
            edges = [];
            edges = newEdges.slice();
            n++;
        } while (pixelsSetInIter > 0 && edges.length > 0);
        alert("done");
        console.log(n);
    }

    /**
     * 
     * @param x 
     * @param y 
     * @param topRightIndexStreamIndex 
     */
    function saveUserDrawInput(x: number, y: number, topRightIndexStreamIndex: number) {
        let tool: toolType = props.currentTool.tool;
        let toolSize: string = props.currentTool.size;

        if (tool == toolType.brush || tool == toolType.eraser) {
            let paintWidth = parseInt(toolSize);
            let paintColor = tool == toolType.eraser ? 0 : props.currentColorIndex;

            for (let i = 0; i < paintWidth; i++) {
                for (let j = 0; j < paintWidth; j++) {
                    // avoid wrapping to next line
                    if ((topRightIndexStreamIndex % canvasWidthInPixels) + i + 1 > canvasWidthInPixels) {
                        break;
                    }

                    props.currentFrame.indexStream[topRightIndexStreamIndex + i + (canvasWidthInPixels * j)] = paintColor;
                }
            }
        }
        else if (tool == toolType.bucket) {
            mouseDown = 0;
            let replacingColorIndex =  props.currentFrame.indexStream[topRightIndexStreamIndex];
            populateVisited();
            visited[x + (canvasWidthInPixels * y)] = props.currentColorIndex;
            
            setNeighbors(x, y, replacingColorIndex);
            drawFrameOnCanvas();
        }
    }

    function renderUserDrawInput(x: number, y: number, topRightIndexStreamIndex: number) {
        let tool = props.currentTool.tool;
        let toolSize = parseInt(props.currentTool.size);
        
        if (tool == toolType.brush) {
            // Using top right index value to avoid possible
            // color change in between calls
            let color: string = getColorString(getColorObject(topRightIndexStreamIndex));
            canvasElement.drawRectangle(color, x, y, toolSize);
        } 
        else if (tool == toolType.eraser) {
            // Need to get the transparent color values of each pixel
            for (let i = 0; i < parseInt(props.currentTool.size) && (x + i < canvasWidthInPixels); i++) {
                for (let j = 0; j < parseInt(props.currentTool.size) && (y + j < canvasHeightInPixels); j++) {
                    let currentX = x + i;
                    let currentY = y + j;
                    let color: string = getColorString(getColorObject(getIndexStreamIndex(currentX, currentY)));
                    canvasElement.drawRectangle(color, currentX, currentY, 1);
                }
            }
        }
    }

    /**
     * Modify the index stream array, and draw the data on canvas.
     * Both actions are separate. Updating the index stream is not
     * meant to directly affect the canvas as that would hinder preformance.
     * @param x     Index Stream array x
     * @param y     Index Stream array y
     */
    function drawUserInputPixel(x: number, y: number) {
        if (mouseDown == 0) {
            return;
        }

        let [cx, cy] = canvasElement.getDataMappedXY(x, y);
        let topRightIndexStreamIndex = (canvasWidthInPixels * cy) + cx;

        saveUserDrawInput(cx, cy, topRightIndexStreamIndex);
        renderUserDrawInput(cx, cy, topRightIndexStreamIndex);
    }

    /**
     * Draw a full frame on canvas from
     * the current index stream
     */
    function drawFrameOnCanvas() {
        let frame: frameType;
        
        if (props.currentFrame == null) {
            return;
        } else {
            frame = props.currentFrame;
        }

        canvasElement.drawFrame(getColorObject);
    }


    
    useEffect(() => {
        canvasElement = new CanvasObject(props.canvas.width, props.canvas.height);
        canvasElement.setElement(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
    }, []);

    // Redraw the html canvas each time the current 
    // frame or color table change
    useEffect(() => {
        drawFrameOnCanvas();
    }, [ props.currentFrame, props.currentColorTable ]);


    return (
        <>
        <CanvasWrapper onMouseMove={(e) => {drawUserInputPixel(e.clientX, e.clientY)}}
                       size={canvasSizeControl}
                       width={canvasWidthInPixels * qualityMultiplier}
                       height={canvasHeightInPixels * qualityMultiplier}
                       $ratiowidth={canvasWidthInPixels}
                       $ratioheight={canvasHeightInPixels} />
        </>
    )
}