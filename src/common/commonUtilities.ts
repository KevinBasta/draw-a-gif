import { colorType } from "./Formats";

/**
  * Return a string to be used by html color style
  * @param colorIndex        The index of the color in current color table
  * @param indexStreamIndex  The index of the pixel in the index stream
  */
export function getColorString(colorObject: colorType) {
    return "rgb(" + colorObject.red + ", " + colorObject.green + ", " + colorObject.blue + ")"
}

export function updateInput(e: any, callback: Function, min: number, max: number) {
  let value = e.target.value;
  let valueInt = parseInt(value);

  if ((valueInt >= min && valueInt <= max) || value == "") {
      callback(() => {return value;});
  } else if (valueInt < min) {
      callback(() => {return min.toString();});
  } else if (valueInt > max) {
      callback(() => {return max.toString();});
  }
}

export function returnInput(e: any, min: number, max: number): string {
  let value = e.target.value;
  let valueInt = parseInt(value);

  if ((valueInt >= min && valueInt <= max) || value == "") {
    return value;
  } else if (valueInt < min) {
    return min.toString();
  } else if (valueInt > max) {
    return max.toString();
  }
}

export function validateAndConvertInput(value: string, defaultValue: number): number {
  let valueInt = parseInt(value);

  if (Number.isNaN(valueInt)) {
      return 1;
  }

  return valueInt;
}