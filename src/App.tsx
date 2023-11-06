import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";

import { canvasType, colorTableType, frameType } from "./shared/Formats";

import { getNewCanvas, getSavedCanvas } from "./core/CanvasCore";
import { getEmptyFrame } from "./core/FramesCore";

import { GIFEditor } from "./GIFEditor";
import { MainMenu } from "./menu/MainMenu";

import "./styles.css"

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'DotGothic16', sans-serif;

    // Canvas Color Palette
    // Other Matching Colors: A1D2CE F3DE8A E1D89F B4C4AE D4B483 E4DFDA 758acb
    --background-color: #686868;
    --primary-color: #2D5D7B;
    --secondary-color: #457EAC;
    --tertiary-color: #E0E2DB; 
    --tertiary-color-active: #cacbc5; 
    --quaternary-color: #000000;
    --quinary-color: #4795d4;
    --senary-color: ;

    --snd-btn-clr: #638796;
    --snd-btn-hvr-clr: #4F6D7A;
    
    --scroll-background-color: #E0E2DB;
    --scroll-handle-color: #686868;
    --scroll-hover-color: #555;

    --button-shadow: -4px 4px var(--quaternary-color);
    --button-shadow-active: 0px 0px var(--quaternary-color);

    --button-transform: translate(4px, -4px);
    --button-transform-active: translate(0px, 0px);

    --button-shadow-small: -2px 2px var(--quaternary-color);
    --button-shadow-small-active: 0px 0px var(--quaternary-color);

    --button-transform-small: translate(2px, -2px);
    --button-transform-small-active: translate(0px, 0px);

    --standard-gap-size: min(1vw, 20px);
    --color-table-item-width: min(4vw, 30px);
    --tool-item-width: min(3vw, 3vh);

    --font-size-s: min(1.5vw, 1.5vh);
    --font-size-sm: min(2vw, 2vh);
    --font-size-m: min(2.5vw, 2.5vh);
    --font-size-ml: min(3vw, 3vh);
    --font-size-l: min(3.5vw, 3.5vh);
    --font-size-xl: min(4.5vw, 4.5vh);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

export default function App() {
  const [canvas, setCanvas] = useState<canvasType>();
  const [frames, setFrames] = useState<Array<frameType>>();
  const [globalColorTable, setGlobalColorTable] = useState<colorTableType>();

  function initCanvas(canvasName: string, width: number, height: number) {
    setCanvas(() => {
      return getNewCanvas(canvasName, width, height);
    });

    setFrames(() => {
      return [getEmptyFrame(width, height)];
    });

    setGlobalColorTable(() => {
      return {
        transparentColorIndex: 0,
        items: [
          {key: crypto.randomUUID(),red: 0, green: 0, blue: 0}, 
          {key: crypto.randomUUID(), red: 0, green: 0, blue: 0}
        ],
      }
    });
  }

  function initCanvasFromSave(savedCanvas: canvasType, savedFrames: Array<frameType>, savedGlobalColorTable: colorTableType) {
    setCanvas(() => {
      return getSavedCanvas(savedCanvas);
    });

    setFrames(() => { return savedFrames });

    setGlobalColorTable(() => { return savedGlobalColorTable });
  }

  return (
    <>
      <GlobalStyles />
      { 
      (canvas == null) ? 
          <MainMenu initCanvas={initCanvas}
                    initCanvasFromSave={initCanvasFromSave}/> 
          :
          <GIFEditor canvas={canvas}
                     setCanvas={setCanvas}
                     frames={frames}
                     setFrames={setFrames}
                     globalColorTable={globalColorTable}
                     setGlobalColorTable={setGlobalColorTable} />
      }
    </>
  );
}
