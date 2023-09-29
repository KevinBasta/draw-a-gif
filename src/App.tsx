import { useEffect, useState } from "react"
import { Canvas } from "./Canvas";
import "./styles.css"
export default function App() {
  const [canvasInfo, setCanvasInfo] = useState({ width: 10, height: 10 })
  const [frame, setFrame] = useState([{id: crypto.randomUUID(), color: '#FFFFFF'}, {id: crypto.randomUUID(), color: '#000000'}]);


  console.log(frame);

  return ( 
  <>
  <div className="tempflex">
    <div className="head"></div>
      <Canvas canvasInfo={canvasInfo} currentFrame={frame} />
    <div className="foot"></div>
  </div>
  </>
  )
}