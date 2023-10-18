import styled from "styled-components";
import { toolData, toolType } from "../common/Formats";

const Tools = styled.div`
    width: 10%;    
    padding: var(--standard-gap-size) 1vw;

    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 5px;
    
    background-color: var(--secondary-color);
`

const Tool = styled.div<{ $icon?: string; $selected?: boolean; }>`
    aspect-ratio: 1 / 1;
    width: var(--tool-item-width);
    background-color: var(--tertiary-color);
    place-self: center;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

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

    &:after {
        content: "${props => props.$icon}";
        font-size: var(--font-size-small);
    }
`;

const SizeInput = styled.input`
    aspect-ratio: 1 / 1;
    width: var(--tool-item-width);
    background-color: var(--tertiary-color);
    place-self: center;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0px;
    padding: 0px;
    cursor: text;

    &:hover {
        background-color: #555555;
        color: white;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }
`;

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
        let value = e.target.value;
        let valueInt = parseInt(value);
        
        if (valueInt > 100) {
            e.key = (100).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 1) {
            e.key = (1).toString();
            value = (e.key).toString();
        }
        
        props.setCurrentTool((object: toolData) => {
            return {key: object.key, tool: object.tool, size: value};
        });
        
        console.log(props.currentTool.size);
        console.log(e.target.value);
    }

    return (
        <Tools>
            <Tool key={toolButtonKeys[0]}
                  $icon={"P"}
                  $selected={props.currentTool.tool == toolType.brush}
                  onClick={(e) => {updateTool(toolType.brush)}}></Tool>
                
            <SizeInput key={toolButtonKeys[1]} 
                       type="number"
                       min="1"
                       max="100"
                       value={props.currentTool.size}
                       onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
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