import styled from "styled-components";

export const FrameOptionsWrapper = styled.div<{ $width?: string; }>`
    height: 100%;
    width: 100%;
    text-wrap: nowrap;

    display: flex;
    justify-content: center;
    
    background-color: var(--primary-color);
`;
