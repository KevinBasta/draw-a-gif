import styled from "styled-components";

interface MyFramePickerProps {
    frames: any;
}

const FramePickerElem = styled.div`
    flex-basis: 10%;
    width: 100vw;

    background-color: #758acb;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;

    overflow-x: scroll;
`;

const FramePreview = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: green;
    margin: 0px min(2vw, 20px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const FrameAdder = styled.div`
    aspect-ratio: 1 / 1;
    height: 70%;
    background-color: green;
    margin: 0px min(2vw, 20px);
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