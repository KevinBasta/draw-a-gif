import { useState } from "react";
import { CreateCanvasWrapper, SizePickerContainer } from "./CreateCanvasStyles";
import { Label, Title } from "../shared-styles/Text";
import { InputStandard } from "../shared-styles/Input";
import { maxCanvasSize, minCanvasSize } from "../shared/Constants";
import { updateInput, validateAndConvertInput } from "../shared/SharedUtilities";
import { ButtonLarge } from "../shared-styles/Button";

interface CreateCanvasProps {
    initCanvas: Function;
    initCanvasFromSave: Function;
}

export function CreateCanvas(props: CreateCanvasProps) {
    const [name, setName] = useState<string>('');
    const [width, setWidth] = useState<string>('10');
    const [height, setHeight] = useState<string>('10');
        
    return (
        <>
            <CreateCanvasWrapper>
                <Title>Canvas Options</Title>

                <SizePickerContainer>
                    <Label>GIF Name:</Label>
                    <InputStandard type="text" 
                        value={name}
                        placeholder="GIF Name"
                        onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                        onChange={(e) => {setName(e.target.value)}}/>

                    <Label>Width:</Label>
                    <InputStandard type="number" 
                        min={minCanvasSize.toString()}
                        max={maxCanvasSize.toString()}
                        value={width}
                        onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                        onChange={(e) => {updateInput(e, setWidth, 1, 3000)}}/>

                    <Label>Height:</Label>
                    <InputStandard type="number"
                        min={minCanvasSize.toString()}
                        max={maxCanvasSize.toString()}
                        value={height} 
                        onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                        onChange={(e) => {updateInput(e, setHeight, 1, 3000)}}/>
                </SizePickerContainer>

                <ButtonLarge onClick={(e) => {
                    props.initCanvas(name, validateAndConvertInput(width, minCanvasSize), validateAndConvertInput(height, minCanvasSize));
                }}>create a canvas</ButtonLarge>
            </CreateCanvasWrapper>
        </>
    );
}
