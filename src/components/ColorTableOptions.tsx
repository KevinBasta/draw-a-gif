import { colorTableType, colorType } from "../common/formats";
import { Button, ButtonManager, ColorOptions, ColorPicker } from "./ColorTableOptionsStyles";

interface MyColorTableOptionsProps {
    currentColorTable: colorTableType;
    setCurrentColorTable: Function;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
}

export function ColorTableOptions(props: MyColorTableOptionsProps) {
    function addNewColor() {
        if (props.currentColorTable.items.length >= 255) {
            return;
        }

        let [r, g, b] = getColorPickerValues();

        props.setCurrentColorTable((table: colorTableType) => {
            return {
                transparentColorIndex: table.transparentColorIndex,
                items: [
                    ...table.items,
                    {key: crypto.randomUUID(), red: r, green: g, blue: b},
                ]
            }
        });
    }

    function setClr() {
        let [r, g, b] = getColorPickerValues();

        props.setCurrentColorTable((object: colorTableType) => {
            return {
                transparentColorIndex: object.transparentColorIndex,
                items: object.items.map((colorObject: colorType, i: number) => {
                    if (i == props.currentColorIndex) {
                        colorObject.red    = r;
                        colorObject.green  = g;
                        colorObject.blue   = b;
                    }
                    
                    console.log(object);
                    return colorObject;
                })

            }
        });
    }

    function removeClr() {
        // Don't allow removal of first transparent color
        if (props.currentColorTable.items.length <= 2) {
            return;
        }

        props.setCurrentColorTable((object: colorTableType) => {
            return {
                transparentColorIndex: object.transparentColorIndex,
                items: object.items.filter((_, i) => {return i != props.currentColorIndex}),
            }
        });

        if (props.currentColorIndex > 1) {
            props.setCurrentColorIndex((currentIndex: number) => {
                return currentIndex - 1;
            });
        }

        console.log(props.currentColorTable);
    }

    function getColorPickerValues() {
        let colorPickerElement: HTMLInputElement = document.getElementById("colorpicker") as HTMLInputElement;
        let hexInputColor: string = colorPickerElement.value;
        
        let r: string, g: string, b: string;
        if (hexInputColor.length == 4) {
            r = "0x" + hexInputColor[1] + hexInputColor[1];
            g = "0x" + hexInputColor[2] + hexInputColor[2];
            b = "0x" + hexInputColor[3] + hexInputColor[3];
        } else if (hexInputColor.length == 7) {
            r = "0x" + hexInputColor[1] + hexInputColor[2];
            g = "0x" + hexInputColor[3] + hexInputColor[4];
            b = "0x" + hexInputColor[5] + hexInputColor[6];
        }

        return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
    }

    return (
        <ColorOptions>
            <ColorPicker type="color" id="colorpicker" name="colorpicker"></ColorPicker>
            <ButtonManager>
                <Button key={crypto.randomUUID()}
                        onClick={() => setClr()}> Set </Button>
                
                <Button key={crypto.randomUUID()}
                        $disabled={props.currentColorTable.items.length <= 2}
                        onClick={() => removeClr()}> Remove </Button>
                
                <Button key={crypto.randomUUID()}
                        $disabled={props.currentColorTable.items.length >= 255}
                        onClick={() => {addNewColor()}}> Add </Button>
            </ButtonManager>
        </ColorOptions>
    );
}