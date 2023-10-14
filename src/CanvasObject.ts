import { getColorString } from "./ColorUtil";
import { colorType } from "./Formats";

class CanvasObject {
    #width: number;
    #height: number;
    #qualityMultiplier: number = 1;
    #element: HTMLCanvasElement = null;
    #context: any = null;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;

        // Set the factor to multiply canvas by to make frames sharper
        if (width < 100 || width < 100) {
            this.#qualityMultiplier = 50;
        } else if (width < 250 || width < 250) {
            this.#qualityMultiplier = 25;
        } else if (width < 550 || width < 550) {
            this.#qualityMultiplier = 10;
        }
    }

    setElement(object: HTMLCanvasElement) {
        this.#element = object;
        this.#context = object.getContext("2d");
    }

    fillContext(x: number, y: number, size: number) {
        this.#context.fillRect((x) * this.#qualityMultiplier,
                               (y) * this.#qualityMultiplier,
                               size * this.#qualityMultiplier,
                               size * this.#qualityMultiplier);
    }

    drawRectangle(color: string, x: number, y: number, size: number) {
        this.#context.fillStyle = color;
        this.fillContext(x, y, size);
    }

    drawFrame(getColorObject: Function) {
        [...Array(this.#width)].map((_, i) => {
            return (
                [...Array(this.#height)].map((_, j) => {
                    try {
                        let indexStreamIndex = (j * this.#width) + i;
                        
                        let colorObject: colorType = getColorObject(indexStreamIndex);
                        this.#context.fillStyle = getColorString(colorObject);
                        this.fillContext(i, j, 1);
                    } catch (e) {
                        console.log(e);
                        this.#context.fillStyle = "#000000";
                        this.fillContext(i, j, 1);
                    }
                })
            )
        })
    }
}