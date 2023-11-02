import { toolData, toolType } from "../shared/Formats";
import { returnInput, updateInput } from "../shared/SharedUtilities";
import { ToolsWrapper } from "./ToolsStyles";
import { maxToolSize, minToolSize } from "../shared/Constants";
import { ButtonTool } from "../shared-styles/Button";
import { InputToolSize } from "../shared-styles/Input";

let toolButtonKeys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

interface MyColorTableToolsProps {
    currentTool: toolData;
    setCurrentTool: Function;
}

export function Tools(props: MyColorTableToolsProps) {

    function updateTool(newTool: toolType) {
        props.setCurrentTool((object: toolData) => {
            return {key: object.key, tool: newTool, size: object.size};
        });
    }

    function updateToolSize(e: any) {
        let value = returnInput(e, minToolSize, maxToolSize);

        props.setCurrentTool((object: toolData) => {
            return {key: object.key, tool: object.tool, size: value};
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