import styled from "styled-components";

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