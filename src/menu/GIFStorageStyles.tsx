import styled from "styled-components";

export const GIFStorageWrapper = styled.div`
    width: 100%;
    height: inherit;

    gap: 3vh;
    overflow-y: scroll;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--secondary-color);
`;

export const GIFStorageItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 3vh;
    width: 70%;
    padding-bottom: 5vh;

    background-color: var(--secondary-color);
`;

export const GIFStorageItemWrapper = styled.div`
    width: 100%;
    height: 75px;
    padding: max(1.5vw, 1.5vh);
    gap: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--primary-color);
`;

export const GIFStorageItemPreviewWrapper = styled.div`
    height: 90%;
    aspect-ratio: 1/1;
    margin-right: 10px;
`;

export const GIFStorageItemTitle = styled.p`
    font-size: var(--font-size-sm);
    color: var(--tertiary-color);
    flex-grow: 1;
    margin: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;


