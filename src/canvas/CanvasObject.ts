
export class CanvasObject {
    #width: number;
    #height: number;
    #elementPixelQuality: number = 1;
    #element: HTMLCanvasElement = null;
    #context: any = null;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;

        // Set the factor to multiply canvas by to make frames sharper
        if (width < 100 || height < 100) {
            this.#elementPixelQuality = 50;
        } else if (width < 250 || height < 250) {
            this.#elementPixelQuality = 25;
        } else if (width < 550 || height < 550) {
            this.#elementPixelQuality = 10;
        }
    }

    setElement(object: HTMLCanvasElement) {
        this.#element = object;
        this.#context = object.getContext("2d");
    }

    getQualityMultiplier() {
        return this.#elementPixelQuality;
    }
    
    getDataMappedXY(x: number, y: number) {
        if (this.#element == null) {
            return [0, 0];
        }

        const rect = this.#element.getBoundingClientRect();
        let contextX = (x - rect.left) * this.#element.width / rect.width;
        let contextY = (y - rect.top) * this.#element.height / rect.height;
        let dataMappedX = Math.round(((contextX - (contextX % this.#elementPixelQuality)) / this.#elementPixelQuality));
        let dataMappedY = Math.round(((contextY - (contextY % this.#elementPixelQuality)) / this.#elementPixelQuality));

        return [dataMappedX, dataMappedY];
    }

    fillContext(x: number, y: number, size: number) {
        if (this.#context == null) {
            return;
        }

        this.#context.fillRect((x) * this.#elementPixelQuality,
                               (y) * this.#elementPixelQuality,
                               size * this.#elementPixelQuality,
                               size * this.#elementPixelQuality);
    }

    drawRectangle(color: string, x: number, y: number, size: number) {
        if (this.#context == null) {
            return;
        }

        this.#context.fillStyle = color;
        this.fillContext(x, y, size);
    }
}
