import { useEffect, useState } from "react"

import { Canvas } from "./canvas/Canvas";
import { ColorTable } from "./color-palette/PaletteWrapper";
import { FramePicker } from "./frame-picker/FramePicker";
import { FrameOptions } from "./options/FrameOptions";
import { CanvasOptions } from "./options/CanvasOptions";
import { Preview } from "./options/Preview";

import { canvasType, frameType, colorTableType, toolType, toolData, disposalMethodType, gifRecord } from "./shared/Formats"
import { aKey, bKey, dKey, eKey, leftArrow, minDelayTime, minQualityMultiplier, pKey, rightArrow } from "./shared/Constants";
import { validateAndConvertInput } from "./shared/SharedUtilities";

import { getEmptyFrame, getTransparentFrame, getValidatedFrames } from "./core/FramesCore";
import { getNewCanvas, getCanvasUpdatedEncode, getSavedCanvas, getValidatedCanvas } from "./core/CanvasCore";
import { getNewTool, getUpdatedTool } from "./core/ToolsCore";
import "./styles.css"
import { Tools } from "./options/Tools";
import { SelectionOptions } from "./options/SelectionOptions";

let worker = new Worker("/encoderWorker.js");
worker.postMessage(["load"]);



interface GIFEditorProps {
  canvas: canvasType,
  setCanvas: Function,
  
  frames: Array<frameType>,
  setFrames: Function,
  
  globalColorTable: colorTableType;
  setGlobalColorTable: Function;
}

export function GIFEditor({ canvas, setCanvas, frames, setFrames, globalColorTable, setGlobalColorTable }: GIFEditorProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(1);
  const [currentTool, setCurrentTool]             = useState<toolData>(getNewTool());
  const [previewGIF, setPreviewGIF]               = useState(false);


  /* GIF encoder worker functions  */
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


  /* Save to local storage */
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


  /* Editor shortcuts */
  function reactToKeyPress(e: any) {
    if (canvas == null) {
      return;
    }

    let key = e.keyCode;

    if ((key == leftArrow || key == aKey) && 
        (currentFrameIndex - 1 >= 0)) {
      setCurrentFrameIndex((current) => {return current - 1});
    }
    else if ((key == rightArrow || key == dKey) &&
             (frames.length - 1) >= (currentFrameIndex + 1)) {
      setCurrentFrameIndex((current) => {return current + 1});
    }

    if (key == eKey) {
      setCurrentTool((current) => {return getUpdatedTool(current, toolType.eraser)});
    } else if (key == pKey) {
      setCurrentTool((current) => {return getUpdatedTool(current, toolType.brush)});
    } else if (key == bKey) {
      setCurrentTool((current) => {return getUpdatedTool(current, toolType.bucket)});
    }
  }

  useEffect(() => {      
    window.addEventListener('keydown', reactToKeyPress);
    
    return () => {
      // remove on dismount
      window.removeEventListener('keydown', reactToKeyPress);
    }
  }, [reactToKeyPress]);



  return (
    <>
        {previewGIF && <Preview canvas={canvas} setCanvas={setCanvas} setPreviewGIF={setPreviewGIF} />}

        <div className="tempflex">
          <div className="header">
            <FramePicker canvas={canvas}

                          frames={frames}
                          setFrames={setFrames}

                          currentFrameIndex={currentFrameIndex}
                          setCurrentFrameIndex={setCurrentFrameIndex}

                          globalColorTable={globalColorTable}/>
          </div>
          
          <div className="canvasMenueWrapper">
            <SelectionOptions canvas={canvas}
                                setCanvas={setCanvas}

                                frames={frames}
                                setFrames={setFrames}

                                currentTool={currentTool} 
                                setCurrentTool={setCurrentTool}

                                currentFrameIndex={currentFrameIndex}
                                setCurrentFrameIndex={setCurrentFrameIndex}

                                setPreviewGIF={setPreviewGIF}

                                encodeGIF={encodeGIF}
                                saveGIF={saveGIF}></SelectionOptions>

            <div className="mainContent">
              <div className="smearWrapper">
              <Canvas canvas={canvas}
                      
                      frames={frames}
                      setFrames={setFrames}
                      
                      currentFrameIndex={currentFrameIndex}
                      setCurrentFrameIndex={setCurrentFrameIndex}
                      
                      currentTool={currentTool} 
                      
                      globalColorTable={globalColorTable}
                      setGlobalColorTable={setGlobalColorTable}

                      currentColorIndex={currentColorIndex} />
              </div>
            </div>
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
  );
}