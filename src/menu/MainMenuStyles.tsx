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
    gap: 1vh;
`;

export const MenuOptionsWrapper = styled.div`
    background-color: black;
    width: 80vw;
    height: 40vh;
    display: flex;
`;