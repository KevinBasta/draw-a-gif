import styled from "styled-components";

export const ButtonLarge = styled.div<{ $disabled?: boolean }>`
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

export const ButtonPaletteOption = styled.button<{ $disabled?: boolean; }>`
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

export const ButtonTool = styled.div<{ $icon?: string; $selected?: boolean; }>`
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


export const ButtonColor = styled.div<{ $color?: string; $selected?: boolean; }>`
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