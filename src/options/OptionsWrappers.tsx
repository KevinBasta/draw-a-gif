import styled from "styled-components";

export const OptionsTabBodyWrapper = styled.div<{ $width?: string; }>`
    height: 100%;
    width: ${props => props.$width};
    text-wrap: nowrap;

    display: flex;
    justify-content: center;
    
    background-color: var(--primary-color);
`;

export const OptionsWrapper = styled.div`
    position: relative;
    width: 80%;
    //padding: 5px;
    margin: 30px;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
`;

export const OptionsSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: min(2vw, 2vh);
`;

export const OptionsInputLabelWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
