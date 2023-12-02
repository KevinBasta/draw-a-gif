import { colorTableType, toolData, toolType } from "../shared/Formats";
import { getColorString } from "../shared/SharedUtilities";
import { PaletteColorsWrapper } from "./PaletteColorsStyles";
import { ButtonColor } from "../shared-styles/Button";
import { getUpdatedTool } from "../core/ToolsCore";


interface MyColorTableColorsProps {
    globalColorTable: colorTableType;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
    
    currentTool: toolData;
    setCurrentTool: Function;
}

export function PaletteColors(props: MyColorTableColorsProps) {
    
    function setColorIndexAndTool(i: number) {
        // Set the color index to the clicked color index
        props.setCurrentColorIndex(() => {return i});
        
        // Set tool to brush if it's currently an eraser
        if (props.currentTool.tool == toolType.eraser) {
            props.setCurrentTool((toolObject: toolData) => {
                return getUpdatedTool(toolObject, toolType.brush);
            });
        }
    }

    return (
        <>
            <PaletteColorsWrapper>
            {   
                props.globalColorTable.items.map((entry, i) => {
                    if (i != 0) {
                        return <ButtonColor key={entry.key} $color={getColorString(entry)} $selected={i == props.currentColorIndex} onClick={() => setColorIndexAndTool(i)} />
                    }
                })
            }
            </PaletteColorsWrapper>
        </>
    );
}