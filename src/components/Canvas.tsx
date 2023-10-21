import { useEffect } from 'react';
import styled from "styled-components";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData, interactionType } from "../common/Formats"
import { getColorString } from '../common/colorUtilities';

// For detecting clicks on canvas
var mouseDown = 0;
var touchDown = 0;

document.body.onmousedown = function() { 
    mouseDown = 1;
}

document.body.onmouseup = function() {
    mouseDown = 0;
}

document.body.ontouchstart = function() {
    touchDown = 1;
}

document.body.ontouchend = function() {
    touchDown = 0;
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
    position: relative;
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

    frames: Array<frameType>;
    setFrames: Function;

    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    currentTool: toolData;
    
    globalColorTable: colorTableType,
    setGlobalColorTable: Function,

    currentColorIndex: number,
}

export function Canvas(props: CanvasProps) {
    let canvasWidthInPixels = props.canvas.width;
    let canvasHeightInPixels = props.canvas.height;
    
    // Set width/height css property directly depending on width/height ratio
    let canvasSizeControl;
    if (canvasWidthInPixels > canvasHeightInPixels) {
        canvasSizeControl = "width: 90vw";
    } else {
        canvasSizeControl = "max-height: inherit; max-width: 90%;";
    }

    function getIndexStreamIndex(x: number, y: number) {
        return (canvasWidthInPixels * y) + x;
    }

    /**
     * Get the color object related to the current index stream index
     * or the color object related to the transparent background
     * @param indexStreamIndex The current index in index stream
     * @returns The color object currently in use
     */
    function getColorObject(indexStreamIndex: number) {
        let colorObject: colorType;
        let colorTableIndex: number = props.frames[props.currentFrameIndex].indexStream[indexStreamIndex];
        
        if (colorTableIndex < props.globalColorTable.items.length) {
            if (colorTableIndex == props.globalColorTable.transparentColorIndex) {
                let transparentColorTableIndex: number = props.transparentBackground.indexStream[indexStreamIndex];
                colorObject = props.transparentBackground.localColorTable.items[transparentColorTableIndex];
            } else {
                colorObject = props.globalColorTable.items[colorTableIndex];
            }
        }

        return colorObject;
    }

    /**
     * Modify the index stream array, and draw the data on canvas.
     * Both actions are separate. Updating the index stream is not
     * meant to directly affect the canvas as that would hinder preformance.
     * @param x     User click x
     * @param y     User click y
     */
    function drawUserInputPixel(x: number, y: number, interaction: interactionType) {
        if ((interaction != interactionType.click && mouseDown == 0) &&
            (interaction != interactionType.touch && touchDown == 0)) {
            return;
        }

        let [cx, cy] = props.canvas.canvasElement.getDataMappedXY(x, y);
        let topRightIndex = getIndexStreamIndex(cx, cy);

        if (props.currentTool.tool == toolType.bucket) {
            if (interaction == interactionType.click || interaction == interactionType.touch) {
                let pixelColor = props.frames[props.currentFrameIndex].indexStream[topRightIndex];
                let bucketColor = props.currentColorIndex;
                initVisitedPixels();
                visited[topRightIndex] = bucketColor;
                fillConnectedArea(cx, cy, pixelColor, bucketColor);

                drawFrameOnCanvas();
            }
        } else {
            saveUserDrawInput(topRightIndex);
            renderUserDrawInput(cx, cy, topRightIndex);
        }
    }

    /**
     * Save the user input drawing to the frame index stream
     * @param x     Index Stream array x
     * @param y     Index Stream array y
     * @param topRightIndex Calculated index in index stream
     */
    function saveUserDrawInput(topRightIndex: number) {
        let tool: toolType = props.currentTool.tool;
        let toolSize: number = parseInt(props.currentTool.size);

        if (tool == toolType.brush || tool == toolType.eraser) {
            let paintColor = (tool == toolType.eraser) ? 
                             props.globalColorTable.transparentColorIndex : 
                             props.currentColorIndex;

            for (let i = 0; i < toolSize; i++) {
                for (let j = 0; j < toolSize; j++) {
                    // avoid wrapping to next line
                    if ((topRightIndex % canvasWidthInPixels) + i + 1 > canvasWidthInPixels) {
                        break;
                    }

                    props.frames[props.currentFrameIndex].indexStream[topRightIndex + i + (canvasWidthInPixels * j)] = paintColor;
                }
            }
        }
    }

    /**
     * Render only the user input on brush or erase,
     * and rerender the entire canvas on bucket
     * @param x     Index Stream array x
     * @param y     Index Stream array y
     * @param topRightIndex Calculated index in index stream
     */
    function renderUserDrawInput(x: number, y: number, topRightIndex: number) {
        let tool = props.currentTool.tool;
        let toolSize = parseInt(props.currentTool.size);
        
        if (tool == toolType.brush) {
            // Using top right index value to avoid
            // possible color change in between calls
            let color: string = getColorString(getColorObject(topRightIndex));
            props.canvas.canvasElement.drawRectangle(color, x, y, toolSize);
        } 
        else if (tool == toolType.eraser) {
            // Need to get the transparent color values of each pixel
            for (let i = 0; i < parseInt(props.currentTool.size) && (x + i < canvasWidthInPixels); i++) {
                for (let j = 0; j < parseInt(props.currentTool.size) && (y + j < canvasHeightInPixels); j++) {
                    let currentX = x + i;
                    let currentY = y + j;
                    let color: string = getColorString(getColorObject(getIndexStreamIndex(currentX, currentY)));
                    props.canvas.canvasElement.drawRectangle(color, currentX, currentY, 1);
                }
            }
        }
    }

    /**
     * Draw a full frame on canvas from the current
     * index stream when currentFrame changes
     */
    function drawFrameOnCanvas() {
        [...Array(props.canvas.width)].map((_, i) => {
            return (
                [...Array(props.canvas.height)].map((_, j) => {
                    try {
                        let indexStreamIndex = (j * props.canvas.width) + i;
                        
                        let colorObject: colorType = getColorObject(indexStreamIndex);
                        let colorString: string = getColorString(colorObject);
                        props.canvas.canvasElement.drawRectangle(colorString, i, j, 1);
                    } catch (e) {
                        console.log(e);

                        let colorString: string = "#ff0000";
                        props.canvas.canvasElement.drawRectangle(colorString, i, j, 1);
                    }
                })
            )
        })
    }





    let visited: Array<number> = [];
    function initVisitedPixels() {
        visited = [];
        for (let i = 0; i < canvasWidthInPixels; i++) {
            for (let j = 0; j < canvasHeightInPixels; j++) {
                visited.push(0);
            }
        }
    }

    function checkVisitedStatus(index: number): boolean {
        return visited[index] == 0;
    }

    function fillConnectedArea(x: number, y: number, pixelColor: number, bucketColor: number) {
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

                let one = getIndexStreamIndex(edgeX - 1, edgeY);
                checkVisitedStatus(one) ? adjacent.push([one, edgeX - 1, edgeY]) : false;
                
                let two = getIndexStreamIndex(edgeX + 1, edgeY);
                checkVisitedStatus(two) ? adjacent.push([two, edgeX + 1, edgeY]) : false;
                
                let three = getIndexStreamIndex(edgeX, edgeY - 1);
                checkVisitedStatus(three) ? adjacent.push([three, edgeX, edgeY - 1]) : false;
                
                let four = getIndexStreamIndex(edgeX, edgeY + 1);
                checkVisitedStatus(four) ? adjacent.push([four, edgeX, edgeY + 1]) : false;
            }

            for (let j = 0; j < adjacent.length; j++) {
                let currentIndex = adjacent[j][0];
                let currentX = adjacent[j][1];
                let currentY = adjacent[j][2];
                
                if (currentX < 0 || currentX >= canvasWidthInPixels ||
                    currentY < 0 || currentY >= canvasHeightInPixels) {
                    continue;
                }

                if (props.frames[props.currentFrameIndex].indexStream[currentIndex] == pixelColor) {
                    visited[currentIndex] = bucketColor;
                    newEdges.push([currentX, currentY]);
                    pixelsSetInIter++;
                }
            }
            
            edges = [];
            edges = newEdges.slice();
            n++;
            console.log(edges, newEdges, adjacent)
        } while (pixelsSetInIter > 0 && edges.length > 0);
        
        
        for (let i = 0; i < visited.length; i++) {
            if (visited[i] == bucketColor) {
                props.frames[props.currentFrameIndex].indexStream[i] = bucketColor;
            }
        }

        console.log(visited);
    }













    // Set the current canvas element on load
    useEffect(() => {
        props.canvas.canvasElement.setElement(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
    }, []);

    // Redraw the html canvas each time the 
    // current frame or color table change
    useEffect(() => {
        drawFrameOnCanvas();
    }, [ props.currentFrameIndex, props.globalColorTable ]);

    return (
        <>
        <CanvasWrapper key={props.canvas.key}
                       onMouseDown={(e) => {drawUserInputPixel(e.clientX, e.clientY, interactionType.click)}}
                       onMouseMove={(e) => {drawUserInputPixel(e.clientX, e.clientY, interactionType.drag)}}
                       onTouchStart={(e) => {drawUserInputPixel(e.touches[0].clientX, e.touches[0].clientY, interactionType.touch)}}
                       onTouchMove={(e) => {drawUserInputPixel(e.touches[0].clientX, e.touches[0].clientY, interactionType.drag)}}
                       size={canvasSizeControl}
                       width={canvasWidthInPixels * props.canvas.canvasElement.getQualityMultiplier()}
                       height={canvasHeightInPixels * props.canvas.canvasElement.getQualityMultiplier()}
                       $ratiowidth={canvasWidthInPixels}
                       $ratioheight={canvasHeightInPixels} />
        </>
    )
}