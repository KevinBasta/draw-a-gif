import { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components";
import { FramePicker } from "./FramePicker";
import { ColorTable } from "./ColorTable";
import { Canvas } from "./Canvas";
import { canvasType, frameType, toolType, toolData, colorType, colorTableType } from "./formats"
import "./styles.css"

const GlobalStyles = createGlobalStyle`
  :root {
    
    // Canvas Color Palette
    // Other Matching Colors: A1D2CE F3DE8A E1D89F B4C4AE D4B483 E4DFDA 758acb
    --background-color: #686868;
    --primary-color: #2D5D7B;
    --secondary-color: #457EAC;
    --tertiary-color: #E0E2DB; 
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

  const [canvasInfo, setCanvasInfo] = useState<canvasType>({ width: 100, height: 100 });
  const [frames, setFrames] = useState<Array<frameType>>([]);
  
  // Initializing color table with two colors
  // First is for "erase" functionality
  // Second is for the first user color
  const [globalColorTable, setGlobalColorTable] = useState<colorTableType>(
    {
      transparentColorIndex: 0,
      items: [
        {red: 0, green: 0, blue: 0}, 
        {red: 0, green: 0, blue: 0}
      ],
    }
  );
  
  //{key: NaN, useLocalColorTable: null, localColorTable: null, indexStream: null}
  const [currentFrame, setCurrentFrame]                   = useState<frameType>(null);
  const [currentColorTable, setCurrentColorTable]         = useState<colorTableType>(null);
  const [currentColorIndex, setCurrentColorIndex]         = useState(1);
  const [currentTool, setCurrentTool]                     = useState<toolData>({key: crypto.randomUUID(), tool: toolType.brush, size: "1"});
  
  // create a checkered trasparent background
  const [transparentBackground, setTransparentBackground] = useState<frameType>(
    {
      key: crypto.randomUUID(),
      useLocalColorTable: true,
      localColorTable: {
        transparentColorIndex: NaN,
        items: [
          {red: 226, green: 226, blue: 226},
          {red: 255, green: 255, blue: 255}
        ],
      },
      indexStream: Array.from(
        {length: canvasInfo.width * canvasInfo.height},
        (_, i) => {
          if (canvasInfo.width % 2 == 0) {
            return Math.floor(i / canvasInfo.width) % 2 == 0 ? ((i % 2 == 0) ? 1 : 0) : ((i % 2 == 0) ? 0 : 1);
          } else {
            return (i % 2 == 0) ? 1 : 0;
          }
        }
      ),
    }
  );


  function displayFrame(frame: frameType): void {
    setCurrentFrame(() => {return frame;});
  }

  function addFrame(): void {
    setFrames((frames: Array<frameType>) => {
      return [
        ...frames,
        {
          key: crypto.randomUUID(),
          useLocalColorTable: false,
          localColorTable: null,
          indexStream: Array.from(
            {length: canvasInfo.width * canvasInfo.height},
            (_, i) => 0
          ),
        }
      ]
    });
  }

  // Set initial states
  useEffect(() => {
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
                  setCurrentFrame={setCurrentFrame}
                  
                  currentTool={currentTool} 
                  
                  currentColorTable={currentColorTable}
                  currentColorIndex={currentColorIndex} />
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