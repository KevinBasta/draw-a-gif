import { useEffect, useState } from "react"
import { Canvas } from "./Canvas";
import "./styles.css"
import { FramePicker } from "./FramePicker";
import { ColorTable } from "./ColorTable";
import { CanvasTest } from "./CanvasTest";
export default function App() {
  const [canvasInfo, setCanvasInfo] = useState({ width: 10, height: 10 });
  const [globalColorTable, setGlobalColorTable] = useState([]);
  const [currentColorTable, setCurrentColorTable] =  useState(globalColorTable);

  // create a checkers background
  const [emptyFrame, setEmptyFrame] = useState({
    key: crypto.randomUUID(),
    localColorTable: ['rgba(226, 226, 226, 0.99)', 'rgba(255, 255, 255, 0.99)'],
    indexStream: Array.from(
      {length: canvasInfo.width * canvasInfo.height},
      (_, i) => {
        if (canvasInfo.width % 2 == 0) {
            return Math.floor(i / canvasInfo.width) % 2 == 0 ? ((i % 2 == 0) ? 1 : 0) : ((i % 2 == 0) ? 0 : 1);
        } else {
          return (i % 2 == 0) ? 1 : 0;
        }
      })
  });
  const [frames, setFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(emptyFrame);


  function addFrame() {
    setFrames((currentFrames) => {
      return [
        ...currentFrames,
        {
          key: crypto.randomUUID(),
          localColorTable: null,
          indexStream: Array.from(
            {length: canvasInfo.width * canvasInfo.height},
            (_, i) => 1),
        }
      ]
    });
  }

  function displayFrame(frame: any) {
    setCurrentFrame(() => {return frame;});
  }


  return (
  <>
  <div className="tempflex">
    <ColorTable clrTable={currentColorTable}/>
    <div className="mainContent">
      <CanvasTest canvasInfo={canvasInfo} currentFrame={currentFrame} colorTable={globalColorTable}/>
    </div>
    <FramePicker frames={frames} addFrame={addFrame} displayFrame={displayFrame}/>
  </div>
  </>
  )
}