import styled from "styled-components";

export const CreateCanvasWrapper = styled.div`
    width: min(70vw, 70vh);
    padding: max(4vw, 4vh);
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
