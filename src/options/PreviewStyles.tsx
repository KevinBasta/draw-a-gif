import styled from "styled-components";

export const BackgroundDimmer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PreviewCenterer = styled.div`
    pointer-events: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 6;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PreviewWrapper = styled.div`
    pointer-events: auto;
    position: absolute;
    height: fit-content;
    width: fit-content;
    padding: min(5vw, 5vh);
    background-color: var(--primary-color);
    z-index: 6;
`;

export const PreviewElem = styled.img<{ $widthratio: number; $heightratio: number; }>`
    /* width: calc(${props => props.$widthratio} * 30px);
    height: calc(${props => props.$heightratio} * 30px); */
    max-width: min(80vw, 80vh);
    max-height: min(80vw, 80vh);

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio};
`;
