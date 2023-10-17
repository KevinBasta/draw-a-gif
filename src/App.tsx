import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import "./styles.css"

import { Canvas } from "./Canvas";
import { ColorTable } from "./ColorTable";
import { FramePicker } from "./FramePicker";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData, disposalMethodType } from "./Formats"
import { CanvasObject } from "./CanvasObject";
import { CanvaseOptions } from "./CanvasOptions";

const GlobalStyles = createGlobalStyle`
  :root {
    
    // Canvas Color Palette
    // Other Matching Colors: A1D2CE F3DE8A E1D89F B4C4AE D4B483 E4DFDA 758acb
    --background-color: #686868;
    --primary-color: #2D5D7B;
    --secondary-color: #457EAC;
    --tertiary-color: #E0E2DB; 
    --tertiary-color-active: #cacbc5; 
    --quaternary-color: #000000;
    --quinary-color: ;
    --senary-color: ;
    
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

    --font-size-small: min(1.5vw, 1.5vh);
    --font-size-sm: min(2vw, 2vh);
    --font-size-medium: min(2.5vw, 2.5vh);
    --font-size-ml: min(3vw, 3vh);
    --font-size-large: min(3.5vw, 3.5vh);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

let worker = new Worker("/src/EncodeHelper.ts");
worker.postMessage(["load"]);

export default function App() {

  const [canvas, setCanvas] = useState<canvasType>(
    { 
      key: crypto.randomUUID(),
      canvasElement: new CanvasObject(10, 10),
      width: 10,
      height: 10,
      encodedData: null,
      blob: null,
      url: null,
    });
  
  const [frames, setFrames] = useState<Array<frameType>>([getEmptyFrame()]);
  
  // Initializing color table with two colors
  // First is for "erase" functionality
  // Second is for the first user color
  const [globalColorTable, setGlobalColorTable] = useState<colorTableType>(
    {
      transparentColorIndex: 0,
      items: [
        {key: crypto.randomUUID(),red: 0, green: 0, blue: 0}, 
        {key: crypto.randomUUID(), red: 0, green: 0, blue: 0}
      ],
    }
  );
  
  //{key: NaN, useLocalColorTable: null, localColorTable: null, indexStream: null}
  const [currentFrameIndex, setCurrentFrameIndex]         = useState<number>(0);
  const [currentColorTable, setCurrentColorTable]         = useState<colorTableType>(globalColorTable);
  const [currentColorIndex, setCurrentColorIndex]         = useState<number>(1);
  const [currentTool, setCurrentTool]                     = useState<toolData>({key: crypto.randomUUID(), tool: toolType.brush, size: "1"});
  
  // create a checkered trasparent background
  const [transparentBackground, setTransparentBackground] = useState<frameType>(
    {
      key: crypto.randomUUID(),
      disposalMethod: disposalMethodType.restoreToBackgroundColor,
      delayTime: 0,
      useLocalColorTable: true,
      localColorTable: {
        transparentColorIndex: NaN,
        items: [
          {key: crypto.randomUUID(), red: 226, green: 226, blue: 226},
          {key: crypto.randomUUID(), red: 255, green: 255, blue: 255}
        ],
      },
      indexStream: Array.from(
        {length: canvas.width * canvas.height},
        (_, i) => {
          if (canvas.width % 2 == 0) {
            return Math.floor(i / canvas.width) % 2 == 0 ? ((i % 2 == 0) ? 1 : 0) : ((i % 2 == 0) ? 0 : 1);
          } else {
            return (i % 2 == 0) ? 1 : 0;
          }
        }
      ),
    }
  );

  function getEmptyFrame(): frameType {
    return {
      key: crypto.randomUUID(),
      disposalMethod: disposalMethodType.restoreToBackgroundColor,
      delayTime: 0,
      useLocalColorTable: false,
      localColorTable: null,
      indexStream: Array.from(
        {length: canvas.width * canvas.height},
        (_, i) => 0
      ),
    }
  }

  function encodeGIF() {
    worker.postMessage(["encode", canvas, frames, globalColorTable]);
  }

  function saveEncodedData(data: Uint8Array) {
    setCanvas((currentCanvas) => {
      return {
        key: currentCanvas.key,
        canvasElement: currentCanvas.canvasElement,
        width: currentCanvas.width,
        height: currentCanvas.height,
        encodedData: data,
        blob: null,
        url: null
      }
    });
  }
  
  worker.onmessage = (e) => {
    if (e.data[0] == 'data') {
      console.log(e.data)
      saveEncodedData(e.data[1])
    } else if (e.data[0] == 'err') {
      console.log("error")
      console.log(e.data)
    }
  }


  // Set initial states
  useEffect(() => {
    //addFrame();
    //displayFrame(frames[0]);
  }, []);

  return (
    <>
      <GlobalStyles />

      <div className="tempflex">
        <div className="header">
          <FramePicker frames={frames}
                       setFrames={setFrames}

                       currentFrameIndex={currentFrameIndex}
                       setCurrentFrameIndex={setCurrentFrameIndex}
                       
                       getEmptyFrame={getEmptyFrame}/>
        </div>
        
        <div className="canvasMenueWrapper">
          <div className="mainContent">
            <Canvas canvas={canvas}
                    transparentBackground={transparentBackground}
                    
                    frames={frames}
                    setFrames={setFrames}
                    
                    currentFrameIndex={currentFrameIndex}
                    setCurrentFrameIndex={setCurrentFrameIndex}
                    
                    currentTool={currentTool} 
                    
                    currentColorTable={currentColorTable}
                    currentColorIndex={currentColorIndex} />
          </div>
          
          <CanvaseOptions canvas={canvas}
                          setCanvas={setCanvas}

                          frames={frames}
                          setFrames={setFrames}

                          currentFrameIndex={currentFrameIndex}
                          setCurrentFrameIndex={setCurrentFrameIndex}
                          
                          encodeGIF={encodeGIF}/>
        </div>
        
        <div className="footer">
          <ColorTable currentColorTable={currentColorTable}
                      setCurrentColorTable={setCurrentColorTable}
                      
                      currentColorIndex={currentColorIndex} 
                      setCurrentColorIndex={setCurrentColorIndex} 
                      
                      currentTool={currentTool} 
                      setCurrentTool={setCurrentTool} />
        </div>
        
      </div>
      
    </>
  )
}