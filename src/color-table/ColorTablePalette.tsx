import styled from "styled-components";
import { colorTableType, toolData, toolType } from "../shared/Formats";
import { getColorString } from "../shared/SharedUtilities";
import { Color, Colors } from "./ColorTablePaletteStyles";


interface MyColorTableColorsProps {
    globalColorTable: colorTableType;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
    
    currentTool: toolData;
    setCurrentTool: Function;
}

export function ColorTablePalette(props: MyColorTableColorsProps) {
    
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
            <Colors>
            {   
                props.globalColorTable.items.map((entry, i) => {
                    if (i != 0) {
                        return <Color key={entry.key} $color={getColorString(entry)} $selected={i == props.currentColorIndex} onClick={() => setColorIndexAndTool(i)} />
                    }
                })
            }
            </Colors>
        </>
    );
}