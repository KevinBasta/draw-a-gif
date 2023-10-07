import styled from "styled-components";
import { Pixel } from "./Pixel";
import { useState } from "react";
import { color } from "./formats"
import { PaintTool } from "./const";

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


interface MyColorTableProps {
    clrTable: Array<color>;
    setCurrentColorTable: Function;
    currentTool: PaintTool;
    setCurrentTool: Function;
    pickedColorIndex: number;
    setPickedColorIndex: Function;
}

export function ColorTable({ clrTable, setCurrentColorTable, currentTool, setCurrentTool, pickedColorIndex, setPickedColorIndex }: MyColorTableProps) {
    
    function addNewColor() {
        let [r, g, b] = getColorPickerValues();

        setCurrentColorTable((colorTable: Array<color>) => {
            return [
                ...colorTable,
                {transparent: false, red: r, green: g, blue: b}
            ]
        });
    }

    function renderAddButton() {
        if (clrTable.length < 255) {
            return <Button key={crypto.randomUUID()} onClick={() => {addNewColor()}}> Add </Button>
        }
    }

    function doSomething(e: any) {
        let leftclick = (e.button == 0);
        let rightclick = (e.button == 2);

        if (leftclick) {
            //currentColor = clickData;
        }
    }

    function getColorString(clr: color) {
        if (clr.transparent == true) {
            return "rgb(70, 70, 70)"
        }

        return "rgb(" + clr.red + ", " + clr.green + ", " + clr.blue + ")"
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

        setCurrentColorTable((colorTable) => {
            return colorTable.map((colorObject: color, i) => {
                if (i == pickedColorIndex) {
                    colorObject.red    = r;
                    colorObject.green  = g;
                    colorObject.blue   = b;
                }
                
                console.log(colorTable);
                return colorObject;
            })
        });

    }

    function removeClr() {
        setCurrentColorTable((colors: Array<color>) => {
            return colors.filter((clr, i) => {return i != pickedColorIndex});
        });
    }

    function colorTableColorClicked(i: number) {
        setPickedColorIndex(() => {return i});

        let r = clrTable[i].red.toString(16);
        let g = clrTable[i].green.toString(16);
        let b = clrTable[i].blue.toString(16);

        if (r.length < 2) {r = '0' + r}
        if (g.length < 2) {g = '0' + g}
        if (b.length < 2) {b = '0' + b}

        //document.getElementById("colorInput").value = ("#" + r + g + b);
    }

    function updateCurrentColor() {

        //currentColor.red = newColor
    }

    function setTool(tool: PaintTool) {
        setCurrentTool(() => {
            return tool;
        });
    }

    return (
        <>
        <ColorTableWrapper>
            <Tools>
                <Tool key={crypto.randomUUID()} $icon={"P"}  onClick={(e) => {setTool(PaintTool.pencil)}}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"B"}  onClick={(e) => {setTool(PaintTool.brush)}}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"Bu"} onClick={(e) => {setTool(PaintTool.bucket)}}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"E"}  onClick={(e) => {setTool(PaintTool.eraser)}}></Tool>
            </Tools>
            <Colors>
            {   
                clrTable.map((entry, i) => {
                    return <Color key={crypto.randomUUID()} $color={getColorString(entry)} onClick={(e) => {setPickedColorIndex(() => {return i})}} />
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