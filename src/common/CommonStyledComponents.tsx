import styled from "styled-components";


export const LargeTitle = styled.p`
    font-size: var(--font-size-extra-large);
    color: var(--tertiary-color);
    font-weight: bold;
    
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
    font-size: var(--font-size-medium);
    color: var(--tertiary-color-active);
    margin: 0px;
`;

export const Input = styled.input`
    width: 100%;
    background-color: var(--tertiary-color);
    place-self: center;
    cursor: text;
    margin: 0px;
    padding: 0px;
    font-size: var(--font-size-sm);
`;

export const Button = styled.div<{ $disabled?: boolean }>`
    background-color: var(--tertiary-color);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    width: 100%;
    padding: min(1vw, 1vh);
    font-size: var(--font-size-medium);
    text-wrap: nowrap;

    box-shadow: var(--button-shadow);
    transform: var(--button-transform);
    
    ${props => props.$disabled ? 
        `
        opacity: 0.6;
        cursor: not-allowed;
        `
        :
        `
        cursor: pointer;
        transition: 0.01s;
        
        &:hover {
            background-color: var(--tertiary-color-active);
        }

        &:active {
            box-shadow: var(--button-shadow-active);
            transform: var(--button-transform-active);
        }
        `};
`;
