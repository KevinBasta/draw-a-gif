import styled from "styled-components";

export const LargeTitle = styled.p`
    font-size: var(--font-size-extra-large);
    color: var(--tertiary-color);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

export const Title = styled.p`
    font-size: var(--font-size-large);
    color: var(--tertiary-color);
    margin: 0px;

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

export const Label = styled.p`
    width: 100%;
    color: var(--tertiary-color-active);
    font-size: var(--font-size-medium);
    margin: 0px;
`;

export const Input = styled.input`
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
