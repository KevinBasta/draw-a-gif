import styled from "styled-components";

export const CanvasOptionsToggle = styled.div<{ $icon: string; }>`
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
    right: 0;
    top: 0;
    text-wrap: nowrap;
    transition: 0.3s;

    display: flex;
    
    background-color: var(--primary-color);
`;

export const Content = styled.div`
    position: relative;
    width: 80%;
    //padding: 5px;
    margin: 30px;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
`;

export const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(2vw, 2vh);
`;

export const Select = styled.select`
    width: 100%;
    height: 2vh;
    font-size: var(--font-size-sm);
    font-family: 'DotGothic16', sans-serif;
    margin: 0px;
`;

export const Option = styled.option`
    font-family: 'DotGothic16', sans-serif;
    font-size: var(--font-size-sm);
`;