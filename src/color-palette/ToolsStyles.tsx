import styled from "styled-components";

export const ToolsWrapper = styled.div<{ $width: string; $display: boolean }>`
    position: absolute; 
    height: inherit;
    width: min(${props => props.$width}, 100px);
    z-index: 1;
    left: 0;
    top: 0;
    transition: 0.3s;

    ${props => props.$display ?
        `
        display: flex;
        `
        : 
        `
        display: none;
        `};
    
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    background-color: var(--secondary-color);
`;

export const ToolsSizeControlWrapper = styled.div`
    text-wrap: nowrap;
    width: 70%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    padding-top: max(10px, 1vh);
    gap: max(10px, 1vh);
`;