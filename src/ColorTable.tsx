import styled from "styled-components";
import { Pixel } from "./Pixel";
import { useState } from "react";
import { color } from "./formats"
const ColorTableWrapper = styled.div`
    flex-basis: 20%;
    width: 100vw;
    height: min-content;
    background-color: grey;
    padding: var(--standard-gap-size) 0;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: var(--standard-gap-size);
`;

const Tools = styled.div`
    width: inherit;
    background-color: "#215693";

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Colors = styled.div`
    width: 100%;
    background-color: "#6693c7";

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Tool = styled.div<{ $icon?: string; }>`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: green;
    margin: 0px var(--standard-gap-size);
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    &:after {
        content: "${props => props.$icon}";
        font-size: var(--color-table-icon-width);
    }
`;

const Color = styled.div<{ $color?: string; }>`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: ${props => props.$color};
    margin: 0px var(--standard-gap-size);
`;

const ColorManager = styled.div`
    width: min(20vw, 300px);
    height: 60px;
    background-color: green;
    margin: 0px var(--standard-gap-size);
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const ColorPicker = styled.input`

`;

const SetButton = styled.button`
    
`;


interface MyColorTableProps {
    clrTable: Array<color>;
    setCurrentColorTable: Function;
    currentTool: any;
    pickedColorIndex: number;
    setPickedColorIndex: Function;
}

export function ColorTable({ clrTable, setCurrentColorTable, currentTool, pickedColorIndex, setPickedColorIndex }: MyColorTableProps) {
    
    function addNewColor() {
        setCurrentColorTable((colorTable: Array<color>) => {
            return [
                ...colorTable,
                {index: colorTable.length, transparent: false, red: 255, green: 255, blue: 255}
            ]
        });
    }

    function renderAddButton() {
        if (clrTable.length < 255) {
            return <Tool key={crypto.randomUUID()} $icon={"+"} onClick={() => {addNewColor()}}/>
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

    function setClr() {
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
        
        setCurrentColorTable((colorTable) => {
            return colorTable.map((colorObject: color) => {
                if (colorObject.index == pickedColorIndex) {
                    colorObject.red    = parseInt(r, 16);
                    colorObject.green  = parseInt(g, 16);
                    colorObject.blue   = parseInt(b, 16);
                }
                
                console.log(colorTable);
                return colorObject;
            })
        });

    }

    function removeClr(entry: color) {
        setCurrentColorTable((colors: Array<color>) => {
            return colors.filter((clr) => {return clr != entry});
        });
    }

    function updateCurrentColor() {

        //currentColor.red = newColor
    }

    return (
        <>
        <ColorTableWrapper>
            <Tools>
                <Tool key={crypto.randomUUID()} $icon={"✏️"}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"🖌️"}></Tool>
                <Tool key={crypto.randomUUID()} $icon={"🪣"}></Tool>
            </Tools>
            <Colors>
            {   
                clrTable.map((entry) => {
                    return <Color key={crypto.randomUUID()} $color={getColorString(entry)} onClick={(e) => {setPickedColorIndex(() => {return entry.index})}} />
                })
            }
            {
                renderAddButton()
            }
            </Colors>
            <ColorManager>
                <ColorPicker type="color" id="favcolor" name="favcolor"></ColorPicker>
                <SetButton onClick={() => setClr()}/>
                <SetButton onClick={() => removeClr()}/>
            </ColorManager>
        </ColorTableWrapper>
        </>
    );
}