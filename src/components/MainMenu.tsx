import { Button, Input, Label, LargeTitle, Title } from "../common/CommonStyledComponents";
import { useState } from "react";
import { updateInput, validateAndConvertInput } from "../common/commonUtilities";
import { CreateCanvasWrapper, MenuWrapper, SizePickerContainer } from "./MainMenuStyles";
import { maxCanvasSize, minCanvasSize } from "../common/constants";

interface TitleScreenProps {
    initCanvas: Function;
}

export function MainMenu(props: TitleScreenProps) {
    const [width, setWidth] = useState<string>('10');
    const [height, setHeight] = useState<string>('10');
    
    return (
        <>
            <MenuWrapper>
                <LargeTitle>DRAW-A-GIF</LargeTitle>
                <CreateCanvasWrapper>
                    <Title>Canvas Options</Title>

                    <SizePickerContainer>
                        <Label>Width:</Label>
                        <Input type="number" 
                               min={minCanvasSize.toString()}
                               max={maxCanvasSize.toString()}
                               value={width}
                               onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                               onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}}
                               onChange={(e) => {updateInput(e, setWidth, 1, 3000)}}/>

                        <Label>Height:</Label>
                        <Input type="number"
                               min={minCanvasSize.toString()}
                               max={maxCanvasSize.toString()}
                               value={height} 
                               onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                               onMouseLeave={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.blur();}}
                               onChange={(e) => {updateInput(e, setHeight, 1, 3000)}}/>
                    </SizePickerContainer>
                
                    <Button onClick={(e) => {
                        props.initCanvas(validateAndConvertInput(width, minCanvasSize), validateAndConvertInput(height, minCanvasSize));
                    }}>create a canvas</Button>
                </CreateCanvasWrapper>
            </MenuWrapper>
        </>
    );
}