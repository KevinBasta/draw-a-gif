import styled from "styled-components";
import { Button, Input, Label, LargeTitle, Title } from "../common/CommonStyledComponents";
import { useState } from "react";


const MenuWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CreateCanvasWrapper = styled.div`
    width: 40vw;
    padding: 5vw;
    gap: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
`;

const SizePickerContainer = styled.div`
    width: 30vw;
    display: grid;
    grid-template-columns: 4fr 10fr;
`;


interface TitleScreenProps {
    initCanvas: Function;
}

export function MainMenu(props: TitleScreenProps) {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);

    return (
        <>
            <MenuWrapper>
                <LargeTitle>DRAW-A-GIF</LargeTitle>
                <CreateCanvasWrapper>
                    <Title>Canvas Options</Title>

                    <SizePickerContainer>
                        <Label>Width:</Label>
                        <Input type="number" min={1} max={10000} value={width.toString()} onChange={(e) => {setWidth(parseInt(e.target.value))}}/>

                        <Label>Height:</Label>
                        <Input type="number" min={1} max={10000} value={height.toString()} onChange={(e) => {setHeight(parseInt(e.target.value))}}/>
                    </SizePickerContainer>
                
                    <Button onClick={(e) => props.initCanvas(width, height)}>create a canvas</Button>
                </CreateCanvasWrapper>
            </MenuWrapper>
        </>
    );
}