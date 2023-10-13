import { useState } from "react";
import styled from "styled-components";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData } from "./formats"

const ColorTableWrapper = styled.div`
    width: inherit;
    height: inherit;
    height: 10vh;
    background-color: grey;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;




const Tools = styled.div`
    width: 10%;    
    padding: var(--standard-gap-size) 1vw;

    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 5px;
    
    background-color: var(--secondary-color);
`

const Tool = styled.div<{ $icon?: string; }>`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: var(--tertiary-color);
    place-self: center;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    cursor: pointer;

    &:after {
        content: "${props => props.$icon}";
        font-size: var(--color-table-icon-width);
    }
`;



const Colors = styled.div`
    width: 70%;
    background-color: "#6693c7";
    overflow-y: scroll;
    padding: var(--standard-gap-size) 0;
    background-color: var(--scroll-background-color);
    border: 5px solid var(--primary-color);

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
`

const Color = styled.div<{ $color?: string; }>`
    aspect-ratio: 1 / 1;
    height: var(--color-table-item-width);
    background-color: ${props => props.$color};
    margin: 0px 12px 1vh 12px;
    cursor: pointer;
`;




const ColorOptions = styled.div`
    width: 20%;
    background-color: var(--secondary-color);
    padding: var(--standard-gap-size) 2vw;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.2vw;
`;

const ColorPicker = styled.input`
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    width: 50%;
    height: 100%;
    cursor: pointer;
    border: none;
    
    &::-webkit-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }
    
    &::-moz-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }

    &:hover {
        &::-webkit-color-swatch {
            border: 5px solid #555555;
        }

        &::-moz-color-swatch {
            border: 5px solid #555555;
        }
    }
`;

const ButtonManager = styled.div`
    width: 50%;
    padding: 10px;
    background-color: var(--primary-color);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.5vh;
`;

const Button = styled.button`
    background-color: var(--tertiary-color);
    color: black;
    border: 2px solid #555555;

    border: none;
    width: 100%;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: large;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #555555;
        color: white;
    }
`;



const SizeInput = styled.input`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: var(--tertiary-color);
    place-self: center;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
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


/* function onInputMouseUp(e: Event) {
    console.log(e)
}

function onInputMouseMove(e: Event) {
    console.log(e)
}

function setInputDragEvents(e: HTMLElement) {
    e.addEventListener('mosueup', onInputMouseUp);
    e.addEventListener('mousemove', onInputMouseMove); 
}*/

interface MyColorTableProps {
    currentColorTable: colorTableType;
    setCurrentColorTable: Function;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
    
    currentTool: toolData;
    setCurrentTool: Function;
}

export function ColorTable(props: MyColorTableProps) {
    function addNewColor() {
        let [r, g, b] = getColorPickerValues();

        props.setCurrentColorTable((table: colorTableType) => {
            return {
                transparentColorIndex: table.transparentColorIndex,
                items: [
                    ...table.items,
                    {red: r, green: g, blue: b},
                ]
            }
        });
    }

    function renderAddButton() {
        if (props.currentColorTable.items.length < 255) {
            return <Button key={crypto.randomUUID()} onClick={() => {addNewColor()}}> Add </Button>
        } else {
            return <Button key={crypto.randomUUID()} style={{  opacity: 0.6, cursor: "not-allowed", }}> Add </Button>
        }
    }

    function doSomething(e: any) {
        let leftclick = (e.button == 0);
        let rightclick = (e.button == 2);

        if (leftclick) {
            //currentColor = clickData;
        }
    }

    function getColorString(object: colorType) {
        return "rgb(" + object.red + ", " + object.green + ", " + object.blue + ")"
    }

    function getColorPickerValues() {
        let hexInputColor = document.getElementById("favcolor").value;
        
        let r: string, g: string, b: string;
        if (hexInputColor.length == 4) {
            r = "0x" + hexInputColor[1] + hexInputColor[1];
            g = "0x" + hexInputColor[2] + hexInputColor[2];
            b = "0x" + hexInputColor[3] + hexInputColor[3];
        } else if (hexInputColor.length == 7) {
            r = "0x" + hexInputColor[1] + hexInputColor[2];
            g = "0x" + hexInputColor[3] + hexInputColor[4];
            b = "0x" + hexInputColor[5] + hexInputColor[6];
        }

        return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
    }

    function setClr() {
        let [r, g, b] = getColorPickerValues();

        props.setCurrentColorTable((object: colorTableType) => {
            return {
                transparentColorIndex: object.transparentColorIndex,
                items: object.items.map((colorObject: colorType, i: number) => {
                    if (i == props.currentColorIndex) {
                        colorObject.red    = r;
                        colorObject.green  = g;
                        colorObject.blue   = b;
                    }
                    
                    console.log(object);
                    return colorObject;
                })

            }
        });
    }

    function removeClr() {
        // Don't allow removal of first transparent color
        if (props.currentColorTable.items.length == 2) {
            return;
        }

        props.setCurrentColorTable((object: colorTableType) => {
            return {
                transparentColorIndex: object.transparentColorIndex,
                items: object.items.filter((_, i) => {return i != props.currentColorIndex}),
            }
        });

        if (props.currentColorIndex > 1) {
            props.setCurrentColorIndex((currentIndex: number) => {
                return currentIndex - 1;
            });
        }

        console.log(props.currentColorTable);
    }

    function colorTableColorClicked(i: number) {
        props.setCurrentColorIndex(() => {return i});

        let r = props.currentColorTable.items[i].red.toString(16);
        let g = props.currentColorTable.items[i].green.toString(16);
        let b = props.currentColorTable.items[i].blue.toString(16);

        if (r.length < 2) {r = '0' + r}
        if (g.length < 2) {g = '0' + g}
        if (b.length < 2) {b = '0' + b}

        //document.getElementById("colorInput").value = ("#" + r + g + b);
    }

    function updateCurrentColor() {

        //currentColor.red = newColor
    }

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
            e.key = (0).toString();
            value = (e.key).toString();
        }
        
        props.setCurrentTool((object: toolData) => {
            return {key: object.key, tool: object.tool, size: value};
        });
        
        console.log(props.currentTool.size);
        console.log(e.target.value);
    }
    
    function setColorIndexAndTool(i: number) {
        // Set the color to the clicked color index
        props.setCurrentColorIndex(() => {return i});
        
        // Set tool to brush if it's not brush
        if (props.currentTool.tool != toolType.brush) {
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
        <ColorTableWrapper>
            <Tools>
                <Tool key={crypto.randomUUID()} $icon={"P"}  onClick={(e) => {updateTool(toolType.brush)}}></Tool>
                <SizeInput key={props.currentTool.key} 
                           type="number"
                           min="1"
                           max="100"
                           value={props.currentTool.size}
                           onMouseOver={e => e.target.focus()}
                           onChange={e => updateToolSize(e)}></SizeInput>
                <Tool key={crypto.randomUUID()} $icon={"B"} onClick={(e) => {updateTool(toolType.bucket)}}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"E"}  onClick={(e) => {updateTool(toolType.eraser)}}></Tool>
            </Tools>
            <Colors>
            {   
                props.currentColorTable.items.map((entry, i) => {
                    if (i != 0) {
                        return <Color key={crypto.randomUUID()} $color={getColorString(entry)} onClick={() => setColorIndexAndTool(i)} />
                    }
                })
            }
            </Colors>
            <ColorOptions>
                <ColorPicker type="color" id="favcolor" name="favcolor"></ColorPicker>
                <ButtonManager>
                    <Button onClick={() => setClr()}> Set </Button>
                    <Button onClick={() => removeClr()}> Remove </Button>
                    {
                        renderAddButton()
                    }
                </ButtonManager>
            </ColorOptions>
        </ColorTableWrapper>
        </>
    );
}