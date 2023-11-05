import { useState } from "react";
import { LargeTitle } from "../shared-styles/Text";
import { MenuOptionsWrapper, MenuWrapper } from "./MainMenuStyles";
import { GIFStorage } from "./GIFStorage";
import { CreateCanvas } from "./CreateCanvas";
import { MenuTabs } from "./MenuTabs";

interface TitleScreenProps {
    initCanvas: Function;
    initCanvasFromSave: Function;
}

export function MainMenu(props: TitleScreenProps) {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    function getCurrentTab() {
        switch (currentTabIndex) {
            case 0: 
                return <CreateCanvas initCanvas={props.initCanvas}
                                     initCanvasFromSave={props.initCanvasFromSave} />
            case 1:
                return <GIFStorage initCanvasFromSave={props.initCanvasFromSave} />
            default: 
                return
        }        
    }

    return (
        <>
            <MenuWrapper>
                <LargeTitle>DRAW-A-GIF</LargeTitle>
                <MenuOptionsWrapper>
                    <MenuTabs currentTabIndex={currentTabIndex} 
                              setCurrentTabIndex={setCurrentTabIndex}/>

                    {getCurrentTab()}
                    
                </MenuOptionsWrapper>
            </MenuWrapper>
        </>
    );
}