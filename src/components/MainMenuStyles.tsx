import styled from "styled-components";

export const MenuWrapper = styled.div`
    background-color: var(--primary-color);
    
    width: 100vw;
    height: 95vh;
    padding-top: 5vh;
    
    z-index: 10;
    
    position: absolute;
    top: 0;
    left: 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const CreateCanvasWrapper = styled.div`
    width: min(40vw, 40vh);
    padding: max(2vw, 2vh);
    gap: 3vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
`;

export const SizePickerContainer = styled.div`
    width: inherit;
    display: grid;
    grid-template-columns: 4fr 10fr;
    grid-row-gap: min(1vw, 1vh);
`;
