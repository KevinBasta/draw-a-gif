import styled from "styled-components";

export const GifStorageItemWrapper = styled.div`
    width: min(63vw, 63vh);
    height: 75px;
    padding: max(1.5vw, 1.5vh);
    gap: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--primary-color);
`;



export const GifStorageItemTitle = styled.p`
    font-size: var(--font-size-sm);
    color: var(--tertiary-color);
    flex-grow: 1;
    margin: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const GifStorageItemPreviewWrapper = styled.div`
    height: 90%;
    aspect-ratio: 1/1;
`;

export const GifStorageItemPreview = styled.img<{ $widthratio: number; $heightratio: number; }>`
    max-width: 90%;
    max-height: 90%;

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio};
`;

export const GifStorageItemButton = styled.button<{ $disabled?: boolean; }>`
    background-color: var(--tertiary-color);
    color: black;
    border: 2px solid #555555;
    border: none;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: var(--font-size-sm);
    
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
            background-color: var(--tertiary-color-active);
        }

        &:active {
            box-shadow: var(--button-shadow-active);
            transform: var(--button-transform-active);
        }
    `};
`;
