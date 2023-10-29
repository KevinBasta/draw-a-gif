import styled from "styled-components";

export const GifStorageWrapper = styled.div`
    width: min(70vw, 70vh);
    height: 20vh;
    padding: max(4vw, 4vh);

    gap: 3vh;
    overflow-y: scroll;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--secondary-color);
`;
