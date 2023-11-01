import styled from "styled-components";

export const LargeButton = styled.div<{ $disabled?: boolean }>`
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

export const ButtonColorTableOption = styled.button<{ $disabled?: boolean; }>`
    background-color: var(--tertiary-color);
    color: black;
    border: 2px solid #555555;
    aspect-ratio: 1/1;
    flex-grow: 1;
    padding: 7%;
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
