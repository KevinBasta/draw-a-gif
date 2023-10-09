import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import { FramePicker } from "./FramePicker";
import { ColorTable } from "./ColorTable";
import { Canvas } from "./Canvas";
import { PaintTool } from "./const";
import { frame, color } from "./formats"
import "./styles.css"

const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: #686868;
    --primary-color: #2D5D7B;
    --secondary-color: #457EAC; //#758acb
    --tertiary-color: #E0E2DB; // A1D2CE F3DE8A E1D89F B4C4AE D4B483 E4DFDA
    --quaternary-color: ;
    --quinary-color: ;
    --senary-color: ;

    --scroll-background-color: #E0E2DB;
    --scroll-handle-color: #686868;
    --scroll-hover-color: #555;

    --standard-gap-size: min(1vw, 20px);
    --color-table-item-width: min(4vw, 30px);
    --color-table-icon-width: min(3vw, 22px);
  }
`;

export default function App() {
  //
  // Full app state variables
  // 
  const [canvasInfo, setCanvasInfo] = useState({ width: 10, height: 10 });
  const [frames, setFrames] = useState([]);
  
  const [globalColorTable, setGlobalColorTable] = useState([{transparent: true, red: 0, green: 0, blue: 0}, 
                                                            {transparent: false, red: 53, green: 45, blue: 212}]);
  const [transparentBackground, setTransparentBackground] = useState({});
  
  const [currentFrame, setCurrentFrame]                   = useState([]);
  const [currentColorTable, setCurrentColorTable]         = useState([]);
  const [currentTool, setCurrentTool]                     = useState(PaintTool.pencil);
  const [currentColor, setCurrentColor]                   = useState(null);
  const [pickedColorIndex, setPickedColorIndex] = useState(0);

  //
  // create a checkered trasparent background
  //
  function createTransparentBackgroundFrame() {
    return {
      key: crypto.randomUUID(),
      useLocalColorTable: true,
      localColorTable: [{transparent: false, red: 226, green: 226, blue: 226},
                        {transparent: false, red: 255, green: 255, blue: 255}],
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
    console.log(globalColorTable);
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
        <div className="header">
          <FramePicker frames={frames} addFrame={addFrame} displayFrame={displayFrame}/>
        </div>
        <div className="mainContent">
          <Canvas canvasInfo={canvasInfo}
                  transparentBackground={transparentBackground}
                  currentFrame={currentFrame} 
                  currentTool={currentTool}
                  pickedColorIndex={pickedColorIndex}  
                  clrTable={currentColorTable}/>
        </div>
        <div className="footer">
          <ColorTable clrTable={currentColorTable}
                      pickedColorIndex={pickedColorIndex} 
                      setPickedColorIndex={setPickedColorIndex} 
                      currentTool={currentTool} 
                      setCurrentTool={setCurrentTool}
                      setCurrentColorTable={setCurrentColorTable} />
        </div>
        
      </div>
    </>
  )
}