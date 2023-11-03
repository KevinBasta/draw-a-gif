import { useState } from "react";
import { LargeTitle } from "../shared-styles/Text";
import { MenuWrapper } from "./MainMenuStyles";
import { GIFStorage } from "./GIFStorage";
import { CreateCanvas } from "./CreateCanvas";

interface TitleScreenProps {
    initCanvas: Function;
    initCanvasFromSave: Function;
}

export function MainMenu(props: TitleScreenProps) {
    return (
        <>
            <MenuWrapper>
                <LargeTitle>DRAW-A-GIF</LargeTitle>
                <CreateCanvas initCanvas={props.initCanvas}
                              initCanvasFromSave={props.initCanvasFromSave} />
                <GIFStorage initCanvasFromSave={props.initCanvasFromSave} />
            </MenuWrapper>
        </>
    );
}