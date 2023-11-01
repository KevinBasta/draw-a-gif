import { useState } from "react";
import { Input, Label, LargeTitle, Title } from "../shared/SharedStyledComponents";
import { updateInput, validateAndConvertInput } from "../shared/SharedUtilities";
import { CreateCanvasWrapper, MenuWrapper, SizePickerContainer } from "./MainMenuStyles";
import { maxCanvasSize, minCanvasSize } from "../shared/Constants";
import { GifStorageContext } from "./GifStorageContext";
import { LargeButton } from "../shared-styles/Button";

interface TitleScreenProps {
    initCanvas: Function;
    initCanvasFromSave: Function;
}

export function MainMenu(props: TitleScreenProps) {
    const [name, setName] = useState<string>('');
    const [width, setWidth] = useState<string>('10');
    const [height, setHeight] = useState<string>('10');
    
    return (
        <>
            <MenuWrapper>
                <LargeTitle>DRAW-A-GIF</LargeTitle>
                <CreateCanvasWrapper>
                    <Title>Canvas Options</Title>

                    <SizePickerContainer>
                        <Label>GIF Name:</Label>
                        <Input type="text" 
                               value={name}
                               placeholder="GIF Name"
                               onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                               onChange={(e) => {setName(e.target.value)}}/>

                        <Label>Width:</Label>
                        <Input type="number" 
                               min={minCanvasSize.toString()}
                               max={maxCanvasSize.toString()}
                               value={width}
                               onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                               onChange={(e) => {updateInput(e, setWidth, 1, 3000)}}/>

                        <Label>Height:</Label>
                        <Input type="number"
                               min={minCanvasSize.toString()}
                               max={maxCanvasSize.toString()}
                               value={height} 
                               onMouseOver={(e) => {let element: HTMLInputElement = e.target as HTMLInputElement; element.focus();}}
                               onChange={(e) => {updateInput(e, setHeight, 1, 3000)}}/>
                    </SizePickerContainer>
                
                    <LargeButton onClick={(e) => {
                        props.initCanvas(name, validateAndConvertInput(width, minCanvasSize), validateAndConvertInput(height, minCanvasSize));
                    }}>create a canvas</LargeButton>
                </CreateCanvasWrapper>
                <GifStorageContext initCanvasFromSave={props.initCanvasFromSave}></GifStorageContext>
            </MenuWrapper>
        </>
    );
}