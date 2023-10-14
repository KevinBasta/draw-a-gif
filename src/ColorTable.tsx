import { useState } from "react";
import styled from "styled-components";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData } from "./Formats"
import { ColorTableTools } from "./ColorTableTools";
import { ColorTableOptions } from "./ColorTableOptions";
import { getColorString } from "./ColorUtil";

const ColorTableWrapper = styled.div`
    width: inherit;
    height: inherit;
    height: 10vh;
    background-color: grey;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

const Colors = styled.div`
    width: 70%;
    background-color: "#6693c7";
    overflow-y: scroll;
    padding: var(--standard-gap-size) 0;
    background-color: var(--scroll-background-color);
    border: 5px solid var(--primary-color);

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
`

const Color = styled.div<{ $color?: string; $selected?: boolean; }>`
    aspect-ratio: 1 / 1;
    height: var(--color-table-item-width);
    background-color: ${props => props.$color};
    margin: 0px 12px 1vh 12px;
    border: 1px solid white;

    transition: 0.1s;

    ${props => props.$selected ?
        `
        box-shadow: var(--button-shadow-small-active);
        transform: var(--button-transform-small-active);
        `
        : 
        `
        box-shadow: var(--button-shadow-small);
        transform: var(--button-transform-small);
        `};

    cursor: pointer;
`;



interface MyColorTableProps {
    currentColorTable: colorTableType;
    setCurrentColorTable: Function;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
    
    currentTool: toolData;
    setCurrentTool: Function;
}

export function ColorTable(props: MyColorTableProps) {
    function setColorIndexAndTool(i: number) {
        // Set the color to the clicked color index
        props.setCurrentColorIndex(() => {return i});
        
        // Set tool to brush if it's currently an eraser
        if (props.currentTool.tool == toolType.eraser) {
            props.setCurrentTool((object: toolData) => {
                return {
                    key: object.key,
                    tool: toolType.brush,
                    size: object.size,
                }
            });
        }
    }

    return (
        <>
        <ColorTableWrapper>
            <ColorTableTools currentTool={props.currentTool} 
                             setCurrentTool={props.setCurrentTool} />

            <Colors>
            {   
                props.currentColorTable.items.map((entry, i) => {
                    if (i != 0) {
                        return <Color key={entry.key} $color={getColorString(entry)} $selected={i == props.currentColorIndex} onClick={() => setColorIndexAndTool(i)} />
                    }
                })
            }
            </Colors>

            <ColorTableOptions currentColorTable={props.currentColorTable} 
                               setCurrentColorTable={props.setCurrentColorTable}
                               currentColorIndex={props.currentColorIndex}
                               setCurrentColorIndex={props.setCurrentColorIndex}/>
        </ColorTableWrapper>
        </>
    );
}