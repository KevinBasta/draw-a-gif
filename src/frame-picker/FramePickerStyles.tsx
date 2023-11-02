import styled from "styled-components";

export const FramePickerWrapper = styled.div`
    height: 10vh;

    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: min(3vw, 40px);

    padding: 0px 1vw;

    overflow-x: scroll;
`;

export const FrameImg = styled.img<{ $widthratio: number; $heightratio: number; }>`
    max-width: 90%;
    max-height: 90%;

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio};
`;

export const FrameNumb = styled.p<{ $text: number }>`
    max-width: 90%;
    max-height: 90%;
    font-size: var(--font-size-medium);

    &:after {
        content:  "${props => props.$text + 1}";
    }
`;
