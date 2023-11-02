import styled from "styled-components";

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
