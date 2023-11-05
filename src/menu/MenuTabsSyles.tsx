import styled from "styled-components";

export const MenuTabsWrapper = styled.div`
    min-width: 10vw;
    height: inherit;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    background-color: red;
`;

export const MenuTab = styled.div`
    background-color: #214021;
    font-size: var(--font-size-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1/1;
    border: 1px solid black;
`;