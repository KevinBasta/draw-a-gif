import { useEffect, useState } from "react"
import { Canvas } from "./Canvas";
import "./styles.css"
import { FramePicker } from "./FramePicker";
export default function App() {
  const [canvasInfo, setCanvasInfo] = useState({ width: 10, height: 10 });
  const [globalColorTable, setGlobalColorTable] = useState(['rgba(226, 226, 226, 0.99)', 'rgba(255, 255, 255, 0.99)']);
  
  // create a checkers background
  const [emptyFrame, setEmptyFrame] = useState({
    key: crypto.randomUUID(),
    localColorTable: null,
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

  console.log(emptyFrame.indexStream)
  const [frames, setFrames] = useState([]);

  const [currentFrame, setCurrentFrame] = useState(emptyFrame);

  function addFrame() {
    setFrames((currentFrames) => {
      return [
        ...currentFrames,
        {
          key: crypto.randomUUID(),
          localColorTable: false,
          indexStream: Array.from(
            {length: canvasInfo.width * canvasInfo.height},
            (_, i) => 1),
        }
      ]
    });
  }

  function displayFrame(frame) {
    setCurrentFrame(() => {return frame;});
  }

  return (
  <>
  <div className="tempflex">
    <div className="head"></div>
    <div className="mainContent">
      <div className="colorTable"></div>
      <Canvas canvasInfo={canvasInfo} currentFrame={currentFrame} colorTable={globalColorTable}/>
    </div>
    <FramePicker frames={frames} addFrame={addFrame} displayFrame={displayFrame}/>
  </div>
  </>
  )
}