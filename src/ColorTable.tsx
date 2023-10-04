import styled from "styled-components";
import { Pixel } from "./Pixel";

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

const ColorPicker = styled.input`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: green;
    margin: 0px var(--standard-gap-size);
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;


const Color = styled.div<{ $color?: string; }>`
    aspect-ratio: 1 / 1;
    width: var(--color-table-item-width);
    background-color: ${props => props.$color};
    margin: 0px var(--standard-gap-size);
`;


interface MyColorTableProps {
    clrTable: Array<string>;
}

export function ColorTable({ clrTable }: MyColorTableProps) {

    
    function addNewColor() {

    }

    function renderAddButton() {
        if (clrTable.length < 255) {
            return <ColorPicker key={crypto.randomUUID()} type="color" value="#ffA0A0" />
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
                    return <Color key={crypto.randomUUID()} $color={entry} />
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