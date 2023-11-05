import styled from "styled-components";

export const InputStandard = styled.input`
    width: 100%;
    background-color: var(--tertiary-color);
    font-family: 'DotGothic16', sans-serif;

    place-self: center;
    text-align: center;
    cursor: text;
    margin: 0px;
    padding: 0px;
    font-size: var(--font-size-sm);
`;

export const InputJsonFile = styled.input`

`;

export const InputToolSize = styled.input`
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

export const SelectTransitionType = styled.select`
    width: 100%;
    height: max(2vh, var(--font-size-large));
    font-size: var(--font-size-sm);
    font-family: 'DotGothic16', sans-serif;
    margin: 0px;
`;

export const OptionTransitionType = styled.option`
    font-family: 'DotGothic16', sans-serif;
    font-size: var(--font-size-sm);
`;

