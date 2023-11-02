import { toolData, toolType } from "../shared/Formats";
import { returnInput, updateInput } from "../shared/SharedUtilities";
import { ToolsWrapper } from "./ToolsStyles";
import { maxToolSize, minToolSize } from "../shared/Constants";
import { ButtonTool } from "../shared-styles/Button";
import { InputToolSize } from "../shared-styles/Input";
import { getUpdatedTool, getUpdatedToolSize } from "../core/ToolsCore";

let toolButtonKeys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

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

    return (
        <ToolsWrapper>
            <ButtonTool key={toolButtonKeys[0]}
                  className="material-symbols-outlined"
                  $selected={props.currentTool.tool == toolType.brush}
                  onClick={(e) => {updateTool(toolType.brush)}}>brush</ButtonTool>
                
            <InputToolSize key={toolButtonKeys[1]} 
                       type="number"
                       min={minToolSize.toString()}
                       max={maxToolSize.toString()}
                       value={props.currentTool.size}
                       onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                       /* onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}} */
                       onChange={e => updateToolSize(e)}></InputToolSize>

            <ButtonTool key={toolButtonKeys[2]}
                  className="material-symbols-outlined"
                  $selected={props.currentTool.tool == toolType.bucket}
                  onClick={(e) => {updateTool(toolType.bucket)}}>colors</ButtonTool>
                
            <ButtonTool key={toolButtonKeys[3]}
                  className="material-symbols-outlined"
                  $selected={props.currentTool.tool == toolType.eraser}
                  onClick={(e) => {updateTool(toolType.eraser)}}>ink_eraser</ButtonTool>
        </ToolsWrapper>
    );
}