import { useState } from "react";
import styled from "styled-components";
import { canvasType, disposalMethodType, frameType } from "../common/Formats";

const CanvasOptionsToggle = styled.div<{ $icon: string; }>`
    position: absolute; 
    height: inherit;
    width: max-content;
    height: max-content;
    padding: 10px;
    z-index: 2;
    right: 0;
    top: 0;

    transition: 2s;

    display: flex;
    
    //background-color: var(--primary-color);
    font-size: var(--font-size-medium);

    &:after {
        content: "${props => props.$icon}";
    }
`;

const CanvasOptionsWrapper = styled.div<{ $width?: string; }>`
    position: absolute; 
    height: inherit;
    width: ${props => props.$width};
    z-index: 1;
    right: 0;
    top: 0;
    text-wrap: nowrap;
    transition: 0.3s;

    display: flex;
    
    background-color: var(--primary-color);
`;

const Content = styled.div`
    position: relative;
    width: 80%;
    //padding: 5px;
    margin: 30px;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.p`
    font-size: var(--font-size-large);
    color: var(--tertiary-color);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const Option = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(2vw, 2vh);
`;

const Button = styled.div<{ $disabled?: boolean }>`
    background-color: var(--tertiary-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    padding: min(1vw, 1vh);
    font-size: var(--font-size-medium);
    text-wrap: nowrap;

    box-shadow: var(--button-shadow);
    transform: var(--button-transform);
    
    ${props => props.$disabled ? 
        `
        opacity: 0.6;
        cursor: not-allowed;
        `
        :
        `
        cursor: pointer;
        transition: 0.01s;
        
        &:hover {
            background-color: var(--tertiary-color-active);
        }

        &:active {
            box-shadow: var(--button-shadow-active);
            transform: var(--button-transform-active);
        }
        `};
`;

const Input = styled.input`
    width: 100%;
    background-color: var(--tertiary-color);
    place-self: center;
    cursor: text;
    margin: 0px;
    padding: 0px;
    font-size: var(--font-size-sm);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        padding: 10px;
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }
`;

const Label = styled.p`
    width: 100%;
    font-size: var(--font-size-sm);
    color: var(--tertiary-color-active);
    margin: 0px;
`;

const Select = styled.select`
    width: 100%;
    font-size: var(--font-size-small);
    margin: 0px;
`;

let keys = [crypto.randomUUID(), crypto.randomUUID()]

interface CanvasOptionsProps {
    canvas: canvasType,
    setCanvas: Function,
    
    frames: Array<frameType>,
    setFrames: Function,

    currentFrameIndex: number;
    setCurrentFrameIndex: Function;

    encodeGIF: Function;
}

export function CanvaseOptions(props: CanvasOptionsProps) {
    const [canvasOptionsWidth, setCanvasOptionsWidth] = useState("0px");
    const [canvasOptionsToggleIcon, setcanvasOptionsToggleIcon] = useState("←");
    const [previewGIF, setPreviewGIF] = useState(false);

    function toggleCanvasOptions() {
        switch (canvasOptionsWidth) {
            case "0px":
                setCanvasOptionsWidth(() => {return "25%"});
                setcanvasOptionsToggleIcon(() => {return "→"})
                break;
            default:
                setCanvasOptionsWidth(() => {return "0px"});
                setcanvasOptionsToggleIcon(() => {return "←"})
        }

    }

    function updateDelayTime(e: any) {
        let value = e.target.value;
        let valueInt = parseInt(value);

        if (valueInt > 65535) {
            e.key = (65535).toString();
            value = (e.key).toString();
        }
        
        if (valueInt < 0) {
            e.key = (0).toString();
            value = (e.key).toString();
        }

        valueInt = parseInt(value);
        
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return {
                    key: frame.key,
                    disposalMethod: frame.disposalMethod,
                    delayTime: valueInt,
                    useLocalColorTable: frame.useLocalColorTable,
                    localColorTable: frame.localColorTable,
                    indexStream: frame.indexStream,
                }
            } else {
                return frame;
            }
        });

        props.setFrames(newFrames);
    }

    function updateDisposalMethod(value: number) {
        const newFrames = props.frames.map((frame, i) => {
            if (i == props.currentFrameIndex) {
                return {
                    key: frame.key,
                    disposalMethod: value,
                    delayTime: frame.delayTime,
                    useLocalColorTable: frame.useLocalColorTable,
                    localColorTable: frame.localColorTable,
                    indexStream: frame.indexStream,
                }
            } else {
                return frame;
            }
        });

        props.setFrames(newFrames);
    }

    return (
        <>
        <CanvasOptionsToggle $icon={canvasOptionsToggleIcon} onClick={() => {toggleCanvasOptions()}}></CanvasOptionsToggle>
        <CanvasOptionsWrapper $width={canvasOptionsWidth}>
            <Content>

                <Section>
                    <Title>Frame</Title>

                    <Label>Transition Type:</Label>
                    <Select value={props.frames[props.currentFrameIndex].disposalMethod}
                            onChange={e => updateDisposalMethod(parseInt(e.target.value))}>
                        <option value={disposalMethodType.keep}> Keep </option>
                        <option value={disposalMethodType.restoreToBackgroundColor}> Background Color </option>
                        <option value={disposalMethodType.restoreToPreviousState}> Previous State </option>
                    </Select>

                    <Label>Transition Time:</Label>
                    <Input key={keys[1]} 
                           type="number"
                           min="0"
                           max="65535"
                           value={(props.frames[props.currentFrameIndex].delayTime).toString()}
                           onChange={e => updateDelayTime(e)}/>
                </Section>
                
                <Section>
                    <Title>Canvas</Title>

                    <Option>
                        <Button onClick={() => {props.encodeGIF()}}>Create GIF</Button>
                        <Button $disabled={props.canvas.encodedData == null} onClick={() => {setPreviewGIF(() => false)}}>Show GIF</Button>
                    </Option>
                </Section>
                
            </Content>
        </CanvasOptionsWrapper>
        </>
    );
}