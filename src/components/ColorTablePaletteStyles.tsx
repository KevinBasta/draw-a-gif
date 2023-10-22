import styled from "styled-components";

export const Colors = styled.div`
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

export const Color = styled.div<{ $color?: string; $selected?: boolean; }>`
    aspect-ratio: 1 / 1;
    height: var(--color-table-item-width);
    background-color: ${props => props.$color};
    margin: 0px 12px 1vh 12px;
    border: 1px solid white;

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
`;

