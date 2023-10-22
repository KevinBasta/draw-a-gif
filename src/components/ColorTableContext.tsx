import { canvasType, frameType, colorType, colorTableType, toolType, toolData } from "../common/formats"
import { ColorTableTools } from "./ColorTableTools";
import { ColorTableOptions } from "./ColorTableOptions";
import { getColorString } from "../common/commonUtilities";
import { ColorTablePalette } from "./ColorTablePalette";
import { ColorTableWrapper } from "./ColorTableContextStyles";

interface MyColorTableProps {
    frames: Array<frameType>,
    setFrames: Function,

    currentFrameIndex: number,

    globalColorTable: colorTableType,
    setGlobalColorTable: Function,

    currentColorIndex: number;
    setCurrentColorIndex: Function;
    
    currentTool: toolData;
    setCurrentTool: Function;
}

export function ColorTable(props: MyColorTableProps) {
    return (
        <>
        <ColorTableWrapper>
            <ColorTableTools currentTool={props.currentTool} 
                             setCurrentTool={props.setCurrentTool} />

            <ColorTablePalette globalColorTable={props.globalColorTable}
                               currentColorIndex={props.currentColorIndex}
                               setCurrentColorIndex={props.setCurrentColorIndex}
                               currentTool={props.currentTool}
                               setCurrentTool={props.setCurrentTool} />

            <ColorTableOptions currentColorTable={props.globalColorTable} 
                               setCurrentColorTable={props.setGlobalColorTable}
                               currentColorIndex={props.currentColorIndex}
                               setCurrentColorIndex={props.setCurrentColorIndex}/>
        </ColorTableWrapper>
        </>
    );
}