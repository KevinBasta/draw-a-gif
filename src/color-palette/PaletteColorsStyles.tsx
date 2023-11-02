import styled from "styled-components";

export const PaletteColorsWrapper = styled.div`
    width: 70%;
    background-color: "#6693c7";
    overflow-y: scroll;
    padding: var(--standard-gap-size) 0;
    background-color: var(--scroll-background-color);
    border: 5px solid var(--secondary-color);

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
`
