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
    font-size: var(--font-size-m);
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
    font-size: var(--font-size-m);
    
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
        font-size: var(--font-size-s);
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


export const ButtonFramePreview = styled.div<{ $selected?: boolean; }>`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    transition: 0.2s;

    ${props => props.$selected ?
        `
        box-shadow: var(--button-shadow-active);
        transform: var(--button-transform-active);
        `
        : 
        `
        box-shadow: var(--button-shadow);
        transform: var(--button-transform);
        &:hover {
            background-color: var(--tertiary-color-active);
        }
        `};
    
    cursor: pointer;
`;

export const ButtonFrameAdder = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    box-shadow: var(--button-shadow);
    transform: var(--button-transform);
    
    transition: 0.01s;
    
    &:hover {
        background-color: var(--tertiary-color-active);
    }

    &:active {
        box-shadow: var(--button-shadow-active);
        transform: var(--button-transform-active);
    }
    
    &:after {
        content: "add";
        font-size: var(--font-size-m);
    }
`;

export const ButtonPreviewClose = styled.div<{ $icon: string; }>`
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
    font-size: var(--font-size-m);

    &:after {
        content: "${props => props.$icon}";
    }
`;


export const ButtonFrameTab = styled.div<{ $icon: string; }>`
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
    font-size: var(--font-size-m);

    &:after {
        content: "${props => props.$icon}";
    }
`;

export const ButtonCanvasTab = styled.div<{ $icon: string; }>`
    position: absolute; 
    height: inherit;
    width: max-content;
    height: max-content;
    padding: 10px;
    z-index: 2;
    left: 0;
    top: 0;

    /* font-family: 'DotGothic16', sans-serif; */
    transition: 2s;

    display: flex;
    
    //background-color: var(--primary-color);
    font-size: var(--font-size-m);

    &:after {
        content: "${props => props.$icon}";
    }
`;

export const ButtonGIFStorageItem = styled.button<{ $disabled?: boolean; }>`
    background-color: #638796;
    height: var(--font-size-xl);
    aspect-ratio: 1/1;
    color: black;
    border: 2px solid #555555;
    border: none;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: var(--font-size-m);
    
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
        transition: 0.01s;
        
        &:hover {
            background-color: #4F6D7A;
        }

        &:active {
            box-shadow: var(--button-shadow-active);
            transform: var(--button-transform-active);
        }
    `};
`;
