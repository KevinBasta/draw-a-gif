import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import "./styles.css"

import { Canvas } from "./components/Canvas";
import { ColorTable } from "./components/Palette";
import { FramePicker } from "./components/FramePicker";

import { canvasType, frameType, colorType, colorTableType, toolType, toolData, disposalMethodType } from "./common/Formats"
import { CanvasObject } from "./common/canvasClass";
import { CanvaseOptions } from "./components/CanvasMenu";
import { Preview } from "./components/Preview";

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

let worker = new Worker("/src/encoder/EncodeWorker.ts");
worker.postMessage(["load"]);

export default function App() {

  const [canvas, setCanvas] = useState<canvasType>(
    { 
      key: crypto.randomUUID(),
      canvasElement: new CanvasObject(10, 10),
      width: 10,
      height: 10,
      qualityMultiplier: 10,
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
  const [previewGIF, setPreviewGIF] = useState(false);

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
      previewUrl: null,
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
      previewUrl: null,
    }
  }

  function expandFrames() {
    for (let i = 0; i < frames.length; i++) {

    }
  }

  function encodeFramePreview() {
    worker.postMessage(["framePreview", canvas, frames, currentFrameIndex, globalColorTable]);
  }

  function saveFramePreviewUrl(data: Uint8Array, index: number) {
    let encodedBlob = new Blob([data.buffer], { type: 'image/gif' })
    let blobUrl  = URL.createObjectURL(encodedBlob);

    const newFrames = frames.map((frame, i) => {
      if (i == index) {
          return {
              key: frame.key,
              disposalMethod: frame.disposalMethod,
              delayTime: frame.delayTime,
              useLocalColorTable: frame.useLocalColorTable,
              localColorTable: frame.localColorTable,
              indexStream: frame.indexStream,
              previewUrl: blobUrl,
          }
      } else {
          return frame;
      }
    });

    setFrames(() => newFrames);
  }

  function encodeGIF() {
    setCanvas((currentCanvas) => {
      return {
        key: currentCanvas.key,
        canvasElement: currentCanvas.canvasElement,
        width: currentCanvas.width,
        height: currentCanvas.height,
        qualityMultiplier: currentCanvas.qualityMultiplier,
        encodedData: null,
        blob: null,
        url: null
      }
    });

    //setPreviewGIF(() => true)

    worker.postMessage(["encode", canvas, frames, globalColorTable]);
  }

  function saveEncodedData(data: Uint8Array) {
    let encodedBlob = new Blob([data.buffer], { type: 'image/gif' })
    let blobUrl  = URL.createObjectURL(encodedBlob);

    setCanvas((currentCanvas) => {
      return {
        key: currentCanvas.key,
        canvasElement: currentCanvas.canvasElement,
        width: currentCanvas.width,
        height: currentCanvas.height,
        qualityMultiplier: currentCanvas.qualityMultiplier,
        encodedData: data,
        blob: encodedBlob,
        url: blobUrl
      }
    });
  }
  
  worker.onmessage = (e) => {
    if (e.data[0] == 'data') {
      console.log(e.data)
      saveEncodedData(e.data[1])
    } else if (e.data[0] == 'frameData') {
      saveFramePreviewUrl(e.data[1], e.data[2]);
    } 
    else if (e.data[0] == 'err') {
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
      {previewGIF && <Preview canvas={canvas} setCanvas={setCanvas} setPreviewGIF={setPreviewGIF} />}

      <div className="tempflex">
        <div className="header">
          <FramePicker frames={frames}
                       setFrames={setFrames}

                       currentFrameIndex={currentFrameIndex}
                       setCurrentFrameIndex={setCurrentFrameIndex}
                       
                       encodeFramePreview={encodeFramePreview}

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
          
          <CanvaseOptions canvas={canvas}
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
  )
}