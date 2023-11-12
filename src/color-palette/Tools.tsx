import { toolData, toolType } from "../shared/Formats";
import { returnInput, updateInput } from "../shared/SharedUtilities";
import { ToolsSizeControlWrapper, ToolsWrapper } from "./ToolsStyles";
import { maxToolSize, minToolSize, widthTools } from "../shared/Constants";
import { ButtonTool, ButtonToolsTab } from "../shared-styles/Button";
import { InputToolSize } from "../shared-styles/Input";
import { getUpdatedTool, getUpdatedToolSize } from "../core/ToolsCore";
import { useState } from "react";

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
    const [toolsWidth, setToolsWidth] = useState(widthTools);
    const [toolsToggleIcon, setToolsToggleIcon] = useState("arrow_back");

    function toggleToolsMenu() {
        switch (toolsWidth) {
            case "0px":
                setToolsWidth(() => {return widthTools});
                setToolsToggleIcon(() => {return "arrow_back"})
                break;
            default:
                setToolsWidth(() => {return "0px"});
                setToolsToggleIcon(() => {return "arrow_forward"})
        }
    }

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
        <>
            <ToolsWrapper $width={toolsWidth} $display={toolsWidth == widthTools}>
                <ToolsSizeControlWrapper>
                    {toolButtons}

                    <InputToolSize key={toolButtonKeys[0]} 
                                type="number"
                                min={minToolSize.toString()}
                                max={maxToolSize.toString()}
                                value={props.currentTool.size}
                                onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                                /* onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}} */
                                onChange={e => updateToolSize(e)} />
                </ToolsSizeControlWrapper>

            </ToolsWrapper>

            <ButtonToolsTab $icon={toolsToggleIcon}
                            className="material-symbols-outlined"
                            onClick={() => {toggleToolsMenu()}}></ButtonToolsTab>
        </>
    );
}