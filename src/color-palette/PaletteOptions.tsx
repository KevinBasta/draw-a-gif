import { ButtonPaletteOption } from "../shared-styles/Button";
import { colorTableType, colorType } from "../shared/Formats";
import { PaletteOptionsWrapper, ColorPicker, PaletteOptionsButtonsWrapper } from "./PaletteOptionsStyles";

interface MyColorTableOptionsProps {
    currentColorTable: colorTableType;
    setCurrentColorTable: Function;

    currentColorIndex: number;
    setCurrentColorIndex: Function;
}

export function PaletteOptions(props: MyColorTableOptionsProps) {
    function addNewColor() {
        if (props.currentColorTable.items.length >= 255) {
            return;
        }

        let colorPickerElement: HTMLInputElement = document.getElementById("colorpicker") as HTMLInputElement;
        let hexInputColor: string = colorPickerElement.value;

        let [r, g, b] = getColorPickerValues(hexInputColor);
        let newIndex = props.currentColorTable.items.length;

        props.setCurrentColorTable((table: colorTableType) => {
            return {
                transparentColorIndex: table.transparentColorIndex,
                items: [
                    ...table.items,
                    {key: crypto.randomUUID(), red: r, green: g, blue: b},
                ]
            }
        });

        props.setCurrentColorIndex(() => {return newIndex});
    }

    function setClr(e) {
        let [r, g, b] = getColorPickerValues(e.target.value);

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

    function getColorPickerValues(hexInputColor: string) {
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
        <PaletteOptionsWrapper>
            <ColorPicker type="color" id="colorpicker" name="colorpicker" onInput={(e) => setClr(e)}></ColorPicker>
            
            <PaletteOptionsButtonsWrapper>
                <ButtonPaletteOption key={crypto.randomUUID()}
                        className="material-symbols-outlined"
                        $disabled={props.currentColorTable.items.length >= 255}
                        onClick={() => {addNewColor()}}> shadow_add </ButtonPaletteOption>
                
                <ButtonPaletteOption key={crypto.randomUUID()}
                        className="material-symbols-outlined"
                        $disabled={props.currentColorTable.items.length <= 2}
                        onClick={() => removeClr()}> shadow_minus </ButtonPaletteOption>
            </PaletteOptionsButtonsWrapper>
        </PaletteOptionsWrapper>
    );
}