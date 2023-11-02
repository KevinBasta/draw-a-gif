import styled from "styled-components";

export const CanvasOptionsToggle = styled.div<{ $icon: string; }>`
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
    left: 0;
    top: 0;
    text-wrap: nowrap;
    transition: 0.3s;

    display: flex;
    justify-content: center;
    
    background-color: var(--primary-color);
`;