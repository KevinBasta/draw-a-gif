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

    /**
     * Modify the index stream array, and draw the data on canvas.
     * Both actions are separate. Updating the index stream is not
     * meant to directly affect the canvas as that would hinder preformance.
     * @param x     User click x
     * @param y     User click y
     */
    function drawUserInputPixel(x: number, y: number) {
        if (mouseDown == 0) {
            return;
        }

        let [cx, cy] = props.canvas.canvasElement.getDataMappedXY(x, y);
        let topRightIndex = getIndexStreamIndex(cx, cy);

        saveUserDrawInput(topRightIndex);
        renderUserDrawInput(cx, cy, topRightIndex);
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
                             props.currentColorTable.transparentColorIndex : 
                             props.currentColorIndex;

            for (let i = 0; i < toolSize; i++) {
                for (let j = 0; j < toolSize; j++) {
                    // avoid wrapping to next line
                    if ((topRightIndex % canvasWidthInPixels) + i + 1 > canvasWidthInPixels) {
                        break;
                    }

                    props.currentFrame.indexStream[topRightIndex + i + (canvasWidthInPixels * j)] = paintColor;
                }
            }
        }
        else if (tool == toolType.bucket) {
            console.log("bucket data");
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
        else if (tool == toolType.bucket) {
            console.log("bucket");
            drawFrameOnCanvas();
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

    // Set the current canvas element on load
    useEffect(() => {
        props.canvas.canvasElement.setElement(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
    }, []);

    // Redraw the html canvas each time the 
    // current frame or color table change
    useEffect(() => {
        drawFrameOnCanvas();
    }, [ props.currentFrame, props.currentColorTable ]);

    return (
        <>
        <CanvasWrapper onMouseMove={(e) => {drawUserInputPixel(e.clientX, e.clientY)}}
                       size={canvasSizeControl}
                       width={canvasWidthInPixels * props.canvas.canvasElement.getQualityMultiplier()}
                       height={canvasHeightInPixels * props.canvas.canvasElement.getQualityMultiplier()}
                       $ratiowidth={canvasWidthInPixels}
                       $ratioheight={canvasHeightInPixels} />
        </>
    )
}