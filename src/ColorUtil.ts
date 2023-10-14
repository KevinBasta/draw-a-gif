import { colorType } from "./Formats";

/**
  * Return a string to be used by html color style
  * @param colorIndex        The index of the color in current color table
  * @param indexStreamIndex  The index of the pixel in the index stream
  */
export function getColorString(colorObject: colorType) {
    return "rgb(" + colorObject.red + ", " + colorObject.green + ", " + colorObject.blue + ")"
}