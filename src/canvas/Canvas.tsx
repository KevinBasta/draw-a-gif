import { useEffect, useRef } from 'react';
import styled from "styled-components";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData, interactionType } from "../shared/Formats"
import { getColorString } from '../shared/SharedUtilities';
import { CanvasWrapper } from './CanvasStyles';

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

interface CanvasProps {
    canvas: canvasType;

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
    let canvasSizeControl = "max-height: inherit; max-width: 90%";
    if (canvasWidthInPixels > canvasHeightInPixels) {
        canvasSizeControl = "max-height: inherit; max-width: 90%";
    } else {
        canvasSizeControl = "max-height: inherit; max-width: 90%;";
    }


    // Prevent scrolling when drawing on mobile devices
    const canvasElem = useRef(null);
    useEffect(() => {
        canvasElem.current.addEventListener('touchstart', touchHandler, { passive: false });
        canvasElem.current.addEventListener('touchmove', touchHandler, { passive: false });

        return () => {
            canvasElem.current.removeEventListener('touchstart', touchHandler);
            canvasElem.current.removeEventListener('touchmove', touchHandler);
        };
    }, []);

    function touchHandler(e) {
        e.preventDefault();
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
                let transparentColorTableIndex: number = props.canvas.transparentBackground.indexStream[indexStreamIndex];
                colorObject = props.canvas.transparentBackground.localColorTable.items[transparentColorTableIndex];
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
                spanFill(cx, cy, pixelColor, bucketColor);

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

    function sfInside(x: number, y: number, pixelColor: number, bucketColor: number): boolean {
        if (x < 0 || x >= canvasWidthInPixels ||
            y < 0 || y >= canvasHeightInPixels) {
            return false;
        }

        let currentFrame = props.frames[props.currentFrameIndex];
        let indexStreamIndex = getIndexStreamIndex(x, y);
        
        if (indexStreamIndex > currentFrame.indexStream.length) {
            return false;
        }
        
        if (currentFrame.indexStream[indexStreamIndex] == bucketColor) {
            return false;
        }
        
        if (currentFrame.indexStream[indexStreamIndex] == pixelColor) {
            return true;
        }
        
        return false;
    }

    function sfSet(x: number, y: number, bucketColor: number) {
        props.frames[props.currentFrameIndex].indexStream[getIndexStreamIndex(x, y)] = bucketColor;
    }

    /**
     * Algorithm for bucket implementation
     * @param ix initial x click position
     * @param iy initial y click position
     * @param pixelColor initial color index of clicked pixel
     * @param bucketColor color index to fill with bucked
     */
    function spanFill(ix: number, iy: number, pixelColor: number, bucketColor: number) {
        if (!sfInside(ix, iy, pixelColor, bucketColor)) {
            return;
        }

        let s = [];
        s.push([ix, ix, iy, 1]);
        s.push([ix, ix, iy - 1, -1]);

        while (s.length != 0) { 
            let [x1, x2, y, dy] = s.pop();

            let x = x1;
            if (sfInside(x, y, pixelColor, bucketColor)) {
                while (sfInside(x - 1, y, pixelColor, bucketColor)) {
                    sfSet(x - 1, y, bucketColor);
                    x =  x - 1;
                }
                if (x < x1) {
                    s.push([x, x1 - 1, y - dy, -dy]);

                }
            }

            while(x1 <= x2) {
                while (sfInside(x1, y, pixelColor, bucketColor)) {
                    sfSet(x1, y, bucketColor);
                    x1 = x1 + 1;
                }
                if (x1 > x) {
                    s.push([x, x1 - 1, y + dy, dy]);
                }
                if (x1 - 1 > x2) {
                    s.push([x2 + 1, x1 - 1, y - dy, -dy]);
                }
                x1 = x1 + 1;

                while (x1 < x2 && !sfInside(x1, y, pixelColor, bucketColor)) {
                    x1 = x1 + 1;
                }

                x = x1
            }
        }
    }

    // Set the current canvas element on load
    useEffect(() => {
        props.canvas.canvasElement.setElement(document.getElementsByTagName("canvas")[0] as HTMLCanvasElement);
    }, []);

    // Redraw the html canvas each time the 
    // current frame or color table change
    useEffect(() => {
        drawFrameOnCanvas();
    }, [ props.currentFrameIndex, props.frames, props.globalColorTable ]);
    // props.frmaes SHOULD NO BE HERE, NEDD TO FIND DIFFERENT WAY TO UPDATE WHEN currentFrameindex is updated to the smae value


    return (
        <>
        <CanvasWrapper ref={canvasElem}
                       key={props.canvas.key}
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