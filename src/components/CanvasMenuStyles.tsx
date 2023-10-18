import styled from "styled-components";

export const CanvasOptionsToggle = styled.div<{ $icon: string; }>`
    position: absolute; 
    height: inherit;
    width: max-content;
    height: max-content;
    padding: 10px;
    z-index: 2;
    right: 0;
    top: 0;

    transition: 2s;

    display: flex;
    
    //background-color: var(--primary-color);
    font-size: var(--font-size-medium);

    &:after {
        content: "${props => props.$icon}";
    }
`;

export const CanvasOptionsWrapper = styled.div<{ $width?: string; }>`
    position: absolute; 
    height: inherit;
    width: ${props => props.$width};
    z-index: 1;
    right: 0;
    top: 0;
    text-wrap: nowrap;
    transition: 0.3s;

    display: flex;
    
    background-color: var(--primary-color);
`;

export const Content = styled.div`
    position: relative;
    width: 80%;
    //padding: 5px;
    margin: 30px;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
`;

export const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.p`
    font-size: var(--font-size-large);
    color: var(--tertiary-color);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

export const Option = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(2vw, 2vh);
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

export const Input = styled.input`
    width: 100%;
    background-color: var(--tertiary-color);
    place-self: center;
    cursor: text;
    margin: 0px;
    padding: 0px;
    font-size: var(--font-size-sm);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        padding: 10px;
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }
`;

export const Label = styled.p`
    width: 100%;
    font-size: var(--font-size-sm);
    color: var(--tertiary-color-active);
    margin: 0px;
`;

export const Select = styled.select`
    width: 100%;
    font-size: var(--font-size-small);
    margin: 0px;
`;
