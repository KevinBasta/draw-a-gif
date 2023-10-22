import styled from "styled-components";

export const ColorOptions = styled.div`
    width: 20%;
    background-color: var(--secondary-color);
    padding: var(--standard-gap-size) 2vw;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.2vw;
`;

export const ColorPicker = styled.input`
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    width: 50%;
    height: 100%;
    cursor: pointer;
    border: none;
    
    &::-webkit-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }
    
    &::-moz-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }

    &:hover {
        &::-webkit-color-swatch {
            border: 5px solid #555555;
        }

        &::-moz-color-swatch {
            border: 5px solid #555555;
        }
    }
`;

export const ButtonManager = styled.div`
    width: 50%;
    height: 90%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    
    gap: 0.5vh;
`;

export const Button = styled.button<{ $disabled?: boolean; }>`
    background-color: var(--tertiary-color);
    color: black;
    border: 2px solid #555555;
    aspect-ratio: 1/1;
    flex-grow: 2;

    border: none;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: var(--font-size-medium);
    
    box-shadow: var(--button-shadow-small);
    transform: var(--button-transform-small);
    
    ${props => props.$disabled ? 
        `
        opacity: 0.6;
        cursor: not-allowed;
        `
        :
        `
        cursor: pointer;
        &:active {
            box-shadow: var(--button-shadow-small-active);
            transform: var(--button-transform-samll-active);
        }
        `};

    &:hover {
        ${props => props.$disabled ?
        `` :
        `background-color: #555555;
         color: white;`};
      }
`;
