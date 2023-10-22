import styled from "styled-components";
import { toolData, toolType } from "../common/formats";
import { returnInput, updateInput } from "../common/commonUtilities";
import { SizeInput, Tool, Tools } from "./PaletteToolsStyles";
import { maxToolSize, minToolSize } from "../common/constants";

let toolButtonKeys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

interface MyColorTableToolsProps {
    currentTool: toolData;
    setCurrentTool: Function;
}

export function ColorTableTools(props: MyColorTableToolsProps) {

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
        <Tools>
            <Tool key={toolButtonKeys[0]}
                  $icon={"P"}
                  $selected={props.currentTool.tool == toolType.brush}
                  onClick={(e) => {updateTool(toolType.brush)}}></Tool>
                
            <SizeInput key={toolButtonKeys[1]} 
                       type="number"
                       min={minToolSize.toString()}
                       max={maxToolSize.toString()}
                       value={props.currentTool.size}
                       onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                       /* onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}} */
                       onChange={e => updateToolSize(e)}></SizeInput>

            <Tool key={toolButtonKeys[2]}
                  $icon={"B"}
                  $selected={props.currentTool.tool == toolType.bucket}
                  onClick={(e) => {updateTool(toolType.bucket)}}></Tool>
                
            <Tool key={toolButtonKeys[3]}
                  $icon={"E"}
                  $selected={props.currentTool.tool == toolType.eraser}
                  onClick={(e) => {updateTool(toolType.eraser)}}></Tool>
        </Tools>
    );
}