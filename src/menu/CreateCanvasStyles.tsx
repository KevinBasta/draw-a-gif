import styled from "styled-components";

export const CreateCanvasWrapper = styled.div`
    width: 100%;
    padding: 0 3vw;
    gap: 3vh;
    height: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--secondary-color);
`;

export const SizePickerContainer = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: 4fr 10fr;
    grid-row-gap: min(1vw, 1vh);
`;
