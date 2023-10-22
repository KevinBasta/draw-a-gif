import styled from "styled-components";

export const Tools = styled.div`
    width: 10%;    
    padding: var(--standard-gap-size) 1vw;

    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 5px;
    
    background-color: var(--secondary-color);
`

export const Tool = styled.div<{ $icon?: string; $selected?: boolean; }>`
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

export const SizeInput = styled.input`
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
