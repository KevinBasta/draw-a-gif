import styled from "styled-components";

export const FramePickerElem = styled.div`
    height: 10vh;

    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: min(3vw, 40px);

    padding: 0px 1vw;

    overflow-x: scroll;
`;

export const FramePreview = styled.div<{ $selected?: boolean; }>`
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

export const FrameAdder = styled.div`
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
        content: "+";
        font-size: var(--font-size-medium);
    }
`;

export const FrameImg = styled.img<{ $widthratio: number; $heightratio: number; }>`
    max-width: 90%;
    max-height: 90%;

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio}
`;
