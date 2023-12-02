import { canvasType, frameType, colorType, colorTableType, toolType, toolData } from "../shared/Formats"
import { Tools } from "../options/Tools";
import { PaletteOptions } from "./PaletteOptions";
import { getColorString } from "../shared/SharedUtilities";
import { PaletteColors } from "./PaletteColors";
import { PaletteWrapper } from "./PaletteWrapperStyles";

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
        <PaletteWrapper>
            <PaletteColors  globalColorTable={props.globalColorTable}
                            currentColorIndex={props.currentColorIndex}
                            setCurrentColorIndex={props.setCurrentColorIndex}
                            currentTool={props.currentTool}
                            setCurrentTool={props.setCurrentTool} />

            <PaletteOptions currentColorTable={props.globalColorTable} 
                            setCurrentColorTable={props.setGlobalColorTable}
                            currentColorIndex={props.currentColorIndex}
                            setCurrentColorIndex={props.setCurrentColorIndex}/>
        </PaletteWrapper>
    );
}