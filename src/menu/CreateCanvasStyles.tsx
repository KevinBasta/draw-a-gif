import styled from "styled-components";

export const CreateCanvasWrapper = styled.div`
    width: 65vw;
    padding: 0 5vw;
    gap: 3vh;
    height: inherit;

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
