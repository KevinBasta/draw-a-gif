import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import "./styles.css"

import { Canvas } from "./canvas/Canvas";
import { ColorTable } from "./color-palette/PaletteWrapper";
import { FramePicker } from "./frame-picker/FramePicker";

import { canvasType, frameType, colorTableType, toolType, toolData, disposalMethodType, gifRecord } from "./shared/Formats"
import { CanvasObject } from "./canvas/CanvasClass";
import { FrameOptions } from "./options/FrameOptions";
import { Preview } from "./options/Preview";
import { MainMenu } from "./menu/MainMenu";
import { minDelayTime, minQualityMultiplier } from "./shared/Constants";
import { validateAndConvertInput } from "./shared/SharedUtilities";
import { CanvasOptions } from "./options/CanvasOptions";
import { getEmptyFrame, getTransparentFrame, getValidatedFrames } from "./core/FramesCore";
import { getNewCanvas, getCanvasUpdatedEncode, getSavedCanvas, getValidatedCanvas } from "./core/CanvasCore";

const leftArrow = '37';
const aKey = '65';

const rightArrow = '39';
const dKey = '68';

const eKey = '69';
const pKey = '80';
const bKey = '66';

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
    --font-size-extra-large: min(4.5vw, 4.5vh);

    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

let worker = new Worker("/encoderWorker.js");
worker.postMessage(["load"]);

export default function App() {
  const [canvas, setCanvas] = useState<canvasType>();
  const [frames, setFrames] = useState<Array<frameType>>();
  const [globalColorTable, setGlobalColorTable] = useState<colorTableType>();
  
  const [currentFrameIndex, setCurrentFrameIndex]         = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex]         = useState<number>(1);
  const [currentTool, setCurrentTool]                     = useState<toolData>({key: crypto.randomUUID(), tool: toolType.brush, size: "1"});
  
  const [transparentBackground, setTransparentBackground] = useState<frameType>();
  const [previewGIF, setPreviewGIF] = useState(false);

  function encodeGIF() {
    let validatedCanvas = getValidatedCanvas(canvas);
    setCanvas(() => {
      return validatedCanvas;
    });
    
    let validatedFrames = getValidatedFrames(frames);
    setFrames(() => {
      return validatedFrames;
    });
    
    worker.postMessage(["encode", validatedCanvas, validatedFrames, globalColorTable]);
  }

  function saveEncodedGIF(data: Uint8Array) {
    let blob = new Blob([data.buffer], { type: 'image/gif' })
    let url  = URL.createObjectURL(blob);

    setCanvas((currentCanvas) => {
      return getCanvasUpdatedEncode(currentCanvas, data, blob, url);
    });
  }
  
  worker.onmessage = (e) => {
    if (e.data[0] == 'data') {
      console.log(e.data)
      saveEncodedGIF(e.data[1])
    }
    else if (e.data[0] == 'err') {
      console.log("error")
      console.log(e.data)
    }
  }

  function initTransparentBackground(width: number, height: number) {
    setTransparentBackground(() => {
      return getTransparentFrame(width, height);
    });
  }


  function initCanvas(canvasName: string, width: number, height: number) {
    setCanvas(() => {
      return getNewCanvas(canvasName, width, height);
    });

    setFrames(() => {
      return [getEmptyFrame(width, height)];
    });

    // Initializing color table with two colors
    // First is for "erase" functionality
    // Second is for the first user color
    setGlobalColorTable(() => {
      return {
        transparentColorIndex: 0,
        items: [
          {key: crypto.randomUUID(),red: 0, green: 0, blue: 0}, 
          {key: crypto.randomUUID(), red: 0, green: 0, blue: 0}
        ],
      }
    });

    // create a checkered trasparent background
    initTransparentBackground(width, height);
  }

  function initCanvasFromSave(savedCanvas: canvasType, savedFrames: Array<frameType>, savedGlobalColorTable: colorTableType) {
    setCanvas(() => {
      return getSavedCanvas(savedCanvas);
    });

    setFrames(() => { return savedFrames });

    setGlobalColorTable(() => { return savedGlobalColorTable });

    initTransparentBackground(savedCanvas.width, savedCanvas.height);
  }

  function reactToKeyPress(e: any) {
    if (canvas == null) {
      return;
    }

    let key = e.keyCode;

    if ((key == leftArrow || key == aKey) && 
        (currentFrameIndex - 1 >= 0))
    {
      setCurrentFrameIndex((current) => {return current - 1;})
    }
    else if ((key == rightArrow || key == dKey) &&
             (frames.length - 1) >= (currentFrameIndex + 1)) 
    {
      setCurrentFrameIndex((current) => {return current + 1;})
    }


    if (key == eKey) {
      setCurrentTool((current) => {
        return {
          key: current.key,
          tool: toolType.eraser,
          size: current.size,
        }
      })
    }

    if (key == pKey) {
      setCurrentTool((current) => {
        return {
          key: current.key,
          tool: toolType.brush,
          size: current.size,
        }
      })
    }

    if (key == bKey) {
      setCurrentTool((current) => {
        return {
          key: current.key,
          tool: toolType.bucket,
          size: current.size,
        }
      })
    }
  }

  function saveGIF() {
    let savedGIFs: Array<gifRecord> = JSON.parse(localStorage.getItem("GIFS") || "[]");

    let canvasEdit: canvasType = JSON.parse(JSON.stringify(canvas));
    canvasEdit.url = null;

    
    let framesEdit: Array<frameType> = JSON.parse(JSON.stringify(frames));
    for (let i = 0; i < framesEdit.length; i++) {
      framesEdit[i].previewBlob = null;
      framesEdit[i].previewUrl = null;
    }

    let currentGIF: gifRecord = {
      canvas: canvasEdit,
      frames: framesEdit,
      globalColorTable: globalColorTable,
    }

    savedGIFs.push(currentGIF);

    localStorage.setItem("GIFS", JSON.stringify(savedGIFs));
  }

  // Set initial states
  useEffect(() => {      
    window.addEventListener('keydown', reactToKeyPress);
    
    return () => {
      // remove on dismount
      window.removeEventListener('keydown', reactToKeyPress);
    }
    //addFrame();
    //displayFrame(frames[0]);
  }, [reactToKeyPress]);





  function titleOrApp() {
    if (canvas == null)
    {
      return <>
        <GlobalStyles />
        <MainMenu initCanvas={initCanvas}
                  initCanvasFromSave={initCanvasFromSave}/>;
      </>
    }
    else
    {
      return <>
      <GlobalStyles />
        {previewGIF && <Preview canvas={canvas} setCanvas={setCanvas} setPreviewGIF={setPreviewGIF} />}

        <div className="tempflex">
          <div className="header">
            <FramePicker canvas={canvas}

                          frames={frames}
                          setFrames={setFrames}

                          currentFrameIndex={currentFrameIndex}
                          setCurrentFrameIndex={setCurrentFrameIndex}

                          globalColorTable={globalColorTable}
                          
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
                      
                      globalColorTable={globalColorTable}
                      setGlobalColorTable={setGlobalColorTable}

                      currentColorIndex={currentColorIndex} />
            </div>

            <CanvasOptions canvas={canvas}
                           setCanvas={setCanvas}

                           frames={frames}
                           setFrames={setFrames}

                            currentFrameIndex={currentFrameIndex}
                            setCurrentFrameIndex={setCurrentFrameIndex}

                            setPreviewGIF={setPreviewGIF}

                            encodeGIF={encodeGIF}
                            saveGIF={saveGIF}/>
            
            <FrameOptions canvas={canvas}
                            setCanvas={setCanvas}

                            frames={frames}
                            setFrames={setFrames}

                            currentFrameIndex={currentFrameIndex}
                            setCurrentFrameIndex={setCurrentFrameIndex}
                            
                            setPreviewGIF={setPreviewGIF}

                            encodeGIF={encodeGIF}/>
          </div>
          
          <div className="footer">
            <ColorTable frames={frames}
                        setFrames={setFrames}
                        
                        globalColorTable={globalColorTable}
                        setGlobalColorTable={setGlobalColorTable}

                        currentFrameIndex={currentFrameIndex}

                        currentColorIndex={currentColorIndex} 
                        setCurrentColorIndex={setCurrentColorIndex} 
                        
                        currentTool={currentTool} 
                        setCurrentTool={setCurrentTool} />
          </div>
          
        </div>
      </>
    }
  }

  return (
    <>
    {
      titleOrApp()
    }
    </>
  );
}