import styled from "styled-components";
import { ButtonSelectionTab, ButtonUncollapseOptions, ExpandOptionButtonsWrapper, OptionsAndToolsWrapper, OptionsControlWrapper, SelectedOptionContext, SelectionOptionsWrapper, SelectionTabsWrapper } from "./SelectionOptionsStyles";
import { useState } from "react";
import { CanvasOptions } from "./CanvasOptions";
import { canvasType, frameType, toolData } from "../shared/Formats";
import { FrameOptions } from "./FrameOptions";
import { Tools } from "./Tools";
import { widthToolsAndOptions } from "../shared/Constants";


enum tabTypes {
    none,
    layers,
    frame,
    canvas,
}

enum sidebarState {
    notDisplayed,
    buttonsDisplayed,
    sectionDisplayed,
}

interface tabType {
    key: string,
    name: string,
    icon: boolean;
    type: tabTypes,
};

const selectionTabs: Array<tabType> = [
    {
        key: crypto.randomUUID(), 
        name: "frame",
        icon: false,
        type: tabTypes.frame, 
    }, 
    {
        key: crypto.randomUUID(),
        name: "canvas",
        icon: false,
        type: tabTypes.canvas,
    },
];

const collapseButton: tabType = {
    key: crypto.randomUUID(),
    name: "top_panel_close",
    icon: true,
    type: null,
};

interface SelectionOptionsProps {
    canvas: canvasType,
    setCanvas: Function,
    
    frames: Array<frameType>,
    setFrames: Function,

    currentTool: toolData,
    setCurrentTool: Function,
    
    currentFrameIndex: number,
    setCurrentFrameIndex: Function,
    
    setPreviewGIF: Function,

    encodeGIF: Function,
    saveGIF: Function,
}

export function SelectionOptions(props: SelectionOptionsProps) {
    const [tab, setTab] = useState<tabTypes>(tabTypes.none);
    const [collapseLevel, setCollapseLevel] = useState<number>(1);
    const [optionsWidth, setOptionsWidth] = useState(widthToolsAndOptions);

    function collapseAction() {
        if (tab == tabTypes.none) {
            setCollapseLevel(() => {return sidebarState.notDisplayed;});
        } else {
            setCollapseLevel(() => {return sidebarState.buttonsDisplayed;});
        }
    }

    function tabAction(type: tabTypes) {
        if (tab == type) {
            setTab(() => {return tabTypes.none});
            setCollapseLevel(() => {return sidebarState.buttonsDisplayed;});
        } 
        else {
            setTab(() => {return type});
            setCollapseLevel(() => {return sidebarState.sectionDisplayed;});
        }
    }

    function openMenuAction() {
        setCollapseLevel(() => {return sidebarState.buttonsDisplayed;});
    }

    const tabs = selectionTabs.map((obj: tabType, i: number) => {
        if (obj.icon == true) {
            return <ButtonSelectionTab
                            key={obj.key}
                            className="material-symbols-outlined"
                            onClick={e => tabAction(obj.type)}
                            $selected={tab == obj.type}>
                        {obj.name}
                    </ButtonSelectionTab>;
        } else {
            return <ButtonSelectionTab
                            key={obj.key} 
                            onClick={e => tabAction(obj.type)}
                            $selected={tab == obj.type}>
                        {obj.name}
                    </ButtonSelectionTab>;
        }
    });


    function currentTab() {
        console.log(collapseLevel);
      if (tab == tabTypes.canvas) {

        return <CanvasOptions   canvas={props.canvas}
                                setCanvas={props.setCanvas}

                                frames={props.frames}
                                setFrames={props.setFrames}

                                currentFrameIndex={props.currentFrameIndex}
                                setCurrentFrameIndex={props.setCurrentFrameIndex}

                                setPreviewGIF={props.setPreviewGIF}

                                encodeGIF={props.encodeGIF}
                                saveGIF={props.saveGIF}/>

      } else if (tab == tabTypes.frame) {

        return <FrameOptions    canvas={props.canvas}
                                setCanvas={props.setCanvas}

                                frames={props.frames}
                                setFrames={props.setFrames}

                                currentFrameIndex={props.currentFrameIndex}
                                setCurrentFrameIndex={props.setCurrentFrameIndex}
                                
                                setPreviewGIF={props.setPreviewGIF}

                                encodeGIF={props.encodeGIF}/>
        
      } else {
        return;
      }
    };

    return (
        <>
            <ExpandOptionButtonsWrapper $width={optionsWidth} $collapse={collapseLevel == sidebarState.notDisplayed}>
                <ButtonUncollapseOptions $displayed={collapseLevel == sidebarState.notDisplayed}
                                         $icon="left_panel_open"
                                         className="material-symbols-outlined"
                                         onClick={() => {openMenuAction()}} />
            </ExpandOptionButtonsWrapper>

            <SelectionOptionsWrapper $collapsed={false}>
                <OptionsAndToolsWrapper $width={optionsWidth} $collapse={collapseLevel == sidebarState.notDisplayed}>
                    <Tools currentTool={props.currentTool} 
                           setCurrentTool={props.setCurrentTool}/>
                    <OptionsControlWrapper>
                        {tabs}

                        <ButtonSelectionTab
                                key={collapseButton.key} 
                                className="material-symbols-outlined"
                                onClick={e => collapseAction()}>
                            {collapseButton.name}
                        </ButtonSelectionTab>
                    </OptionsControlWrapper>
                </OptionsAndToolsWrapper>
                
                <SelectedOptionContext $collapsed={tab == tabTypes.none}>
                    {currentTab()}
                </SelectedOptionContext>

            </SelectionOptionsWrapper>
        </>
    );
}