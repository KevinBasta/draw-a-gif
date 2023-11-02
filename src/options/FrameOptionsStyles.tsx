import styled from "styled-components";

export const FrameOptionsWrapper = styled.div<{ $width?: string; }>`
    position: absolute; 
    height: inherit;
    width: ${props => props.$width};
    z-index: 1;
    right: 0;
    top: 0;
    text-wrap: nowrap;
    transition: 0.3s;

    display: flex;
    justify-content: center;
    
    background-color: var(--primary-color);
`;
