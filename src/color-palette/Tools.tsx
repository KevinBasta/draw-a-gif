import { toolData, toolType } from "../shared/Formats";
import { returnInput, updateInput } from "../shared/SharedUtilities";
import { ToolsWrapper } from "./ToolsStyles";
import { maxToolSize, minToolSize } from "../shared/Constants";
import { ButtonTool } from "../shared-styles/Button";
import { InputToolSize } from "../shared-styles/Input";
import { getUpdatedTool, getUpdatedToolSize } from "../core/ToolsCore";

let toolButtonKeys = [crypto.randomUUID()];

interface toolEntry {
    key: string,
    toolType: toolType,
    icon: string,
};

const tools: Array<toolEntry> = [
    {
        key: crypto.randomUUID(), 
        toolType: toolType.brush,
        icon: "brush"
    }, 
    {
        key: crypto.randomUUID(),
        toolType: toolType.bucket,
        icon: "colors"
    },
    {
        key: crypto.randomUUID(),
        toolType: toolType.eraser,
        icon: "ink_eraser"
    }
];

interface MyColorTableToolsProps {
    currentTool: toolData;
    setCurrentTool: Function;
}

export function Tools(props: MyColorTableToolsProps) {

    function updateTool(newTool: toolType) {
        props.setCurrentTool((toolObject: toolData) => {
            return getUpdatedTool(toolObject, newTool);
        });
    }

    function updateToolSize(e: any) {
        let value: string = returnInput(e, minToolSize, maxToolSize);

        props.setCurrentTool((toolObject: toolData) => {
            return getUpdatedToolSize(toolObject, value);
        });
    }

    const toolButtons = tools.map((obj: toolEntry, i: number) => {
        return <ButtonTool key={obj.key} 
                           className="material-symbols-outlined"
                           $selected={props.currentTool.tool == obj.toolType}
                           onClick={(e) => {updateTool(obj.toolType)}}>
                    {obj.icon}
                </ButtonTool>
    });

    return (
        <ToolsWrapper>
            {toolButtons}

            <InputToolSize key={toolButtonKeys[0]} 
                           type="number"
                           min={minToolSize.toString()}
                           max={maxToolSize.toString()}
                           value={props.currentTool.size}
                           onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                           /* onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}} */
                           onChange={e => updateToolSize(e)} />
        </ToolsWrapper>
    );
}