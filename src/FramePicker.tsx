import styled from "styled-components";

interface MyFramePickerProps {
    frames: any;
    addFrame: any;
    displayFrame: any;
}

const FramePickerElem = styled.div`
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

const FramePreview = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const FrameAdder = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    &:after {
        content: "+";
        font-size: 3cqw;
    }
`;

export function FramePicker({ frames, addFrame, displayFrame }: MyFramePickerProps) {
    return (
        <FramePickerElem>
        {
            [...Array(frames.length)].map((_, i) => {
                return <FramePreview key={frames[i].key} onClick={() => displayFrame(frames[i])} />
            })
        }
        <FrameAdder onClick={() => addFrame()} />
        </FramePickerElem>
    );
}