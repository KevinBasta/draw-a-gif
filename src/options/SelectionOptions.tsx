import styled from "styled-components";
import { ButtonSelectionTab, SelectedOptionContext, SelectionOptionsWrapper, SelectionTabsWrapper } from "./SelectionOptionsStyles";
import { useState } from "react";
import { CanvasOptions } from "./CanvasOptions";
import { canvasType, frameType } from "../shared/Formats";
import { FrameOptions } from "./FrameOptions";


enum tabTypes {
    none,
    layers,
    frame,
    canvas,
}

interface tabType {
    key: string,
    name: string,
    type: tabTypes,
};

const selectionTabs: Array<tabType> = [
    {
        key: crypto.randomUUID(), 
        name: "frame",
        type: tabTypes.frame, 
    }, 
    {
        key: crypto.randomUUID(),
        name: "canvas",
        type: tabTypes.canvas,
    }
];


interface SelectionOptionsProps {
    canvas: canvasType,
    setCanvas: Function,
    
    frames: Array<frameType>,
    setFrames: Function,
    
    currentFrameIndex: number;
    setCurrentFrameIndex: Function;
    
    setPreviewGIF: Function;

    encodeGIF: Function;
    saveGIF: Function;
}

export function SelectionOptions(props: SelectionOptionsProps) {
    const [tab, setTab] = useState<tabTypes>(tabTypes.none);

    function switchToTab(type: tabTypes) {
        if (tab == type) {
            setTab(() => {return tabTypes.none});
        } else {
            setTab(() => {return type});
        }

    }

    const tabs = selectionTabs.map((obj: tabType, i: number) => {
        return <ButtonSelectionTab
                        key={obj.key} 
                        onClick={e => switchToTab(obj.type)}
                        $selected={tab == obj.type}>
                    {obj.name}
                </ButtonSelectionTab>
    });

    function currentTab() {
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
            <SelectionOptionsWrapper>
                <SelectionTabsWrapper>
                    {tabs}
                </SelectionTabsWrapper>

                <SelectedOptionContext $collapsed={tab == tabTypes.none}>
                    {currentTab()}
                </SelectedOptionContext>

            </SelectionOptionsWrapper>
        </>
    );
}