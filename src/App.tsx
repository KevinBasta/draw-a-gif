import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import { FramePicker } from "./FramePicker";
import { ColorTable } from "./ColorTable";
import { Canvas } from "./Canvas";
import { PaintTool } from "./const";
import "./styles.css"

const GlobalStyles = createGlobalStyle`
  :root {
    --standard-gap-size: min(2vw, 20px);
    --color-table-item-width: min(4vw, 30px);
    --color-table-icon-width: min(3vw, 22px);
  }
`;

export default function App() {
  //
  // Full app state variables
  // 
  const [canvasInfo, setCanvasInfo] = useState({ width: 100, height: 100 });
  const [frames, setFrames] = useState([]);
  
  const [globalColorTable, setGlobalColorTable] = useState(['rgba(0, 0, 0, 0.99)', 'rgba(53, 45, 212, 0.99)']);
  const [transparentBackground, setTransparentBackground] = useState({});
  
  const [currentFrame, setCurrentFrame]                   = useState([]);
  const [currentColorTable, setCurrentColorTable]         = useState([]);
  const [currentTool, setCurrentTool]                     = useState(PaintTool.pencil);
  const [currentColor, setCurrentColor]                   = useState(null);

  //
  // create a checkered trasparent background
  //
  function createTransparentBackgroundFrame() {
    return {
      key: crypto.randomUUID(),
      useLocalColorTable: true,
      localColorTable: ['rgba(226, 226, 226, 0.99)', 'rgba(255, 255, 255, 0.99)'],
      indexStream: Array.from(
        {length: canvasInfo.width * canvasInfo.height},
        (_, i) => {
          if (canvasInfo.width % 2 == 0) {
            return Math.floor(i / canvasInfo.width) % 2 == 0 ? ((i % 2 == 0) ? 1 : 0) : ((i % 2 == 0) ? 0 : 1);
          } else {
            return (i % 2 == 0) ? 1 : 0;
          }
        }
      )
    }
  }

  function addFrame() {
    setFrames((frames) => {
      return [
        ...frames,
        {
          key: crypto.randomUUID(),
          useLocalColorTable: false,
          localColorTable: null,
          indexStream: Array.from(
            {length: canvasInfo.width * canvasInfo.height},
            (_, i) => 0),
        }
      ]
    });
  }

  function displayFrame(frame: any) {
    setCurrentFrame(() => {return frame;});
  }

  //
  // useEffect hooks
  //
  useEffect(() => {
	  // Set initial states
    setTransparentBackground(() => {return createTransparentBackgroundFrame()});
    setCurrentColorTable(() => {return globalColorTable});
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="tempflex">
        <ColorTable clrTable={currentColorTable} currentTool={currentTool} currentColor={currentColor}/>
        <div className="mainContent">
          <Canvas canvasInfo={canvasInfo} transparentBackground={transparentBackground} currentFrame={currentFrame} colorTable={globalColorTable}/>
        </div>
        <FramePicker frames={frames} addFrame={addFrame} displayFrame={displayFrame}/>
      </div>
    </>
  )
}