import styled from "styled-components";

export const MenuWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CreateCanvasWrapper = styled.div`
    width: 40vw;
    padding: 5vw;
    gap: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
`;

export const SizePickerContainer = styled.div`
    width: 30vw;
    display: grid;
    grid-template-columns: 4fr 10fr;
`;
