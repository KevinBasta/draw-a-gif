import styled from "styled-components";
import { Pixel } from "./Pixel";
import { useState } from "react";

const ColorTableWrapper = styled.div`
    flex-basis: 10%;
    width: 100vw;
    height: max-content;
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
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: green;
    margin: 0px var(--standard-gap-size);
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

interface MyColorTableProps {
    clrTable: Array<string>;
    currentTool: any;
    currentColor: any;
}

export function ColorTable({ clrTable, currentTool, currentColor }: MyColorTableProps) {

    const [clickData, setClickData] = useState(null);
    
    function addNewColor() {

    }

    function renderAddButton() {
        if (clrTable.length < 255) {
            return <Tool key={crypto.randomUUID()} $icon={"+"} />
        }
    }

    function doSomething(e: any) {
        let leftclick = (e.button == 0);
        let rightclick = (e.button == 2);

        if (leftclick) {
            currentColor = clickData;
        }
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
                    return <Color key={crypto.randomUUID()} $color={entry} onMouseDown={(e) => {setClickData(entry)}} />
                })
            }
            {
                renderAddButton()
            }
            </Colors>
        </ColorTableWrapper>
        </>
    );
}