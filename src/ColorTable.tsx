import styled from "styled-components";
import { Pixel } from "./Pixel";

const ColorTableWrapper = styled.div`
    flex-basis: 20%;
    width: 100vw;
    background-color: grey;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface MyColorTableProps {
    clrTable: Array<string>;
}

export function ColorTable({ clrTable }: MyColorTableProps) {
    return (
        <>
        <ColorTableWrapper>
            {   
                clrTable.map((entry) => {
                    return <Pixel color={entry} height={"4vw"} />
                })
            }
            <Pixel color={"#000000"} height={"2vw"}/>
        </ColorTableWrapper>
        </>
    );
}