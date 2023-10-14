import styled from "styled-components";
import { colorTableType, colorType } from "./Formats";

const ColorOptions = styled.div`
    width: 20%;
    background-color: var(--secondary-color);
    padding: var(--standard-gap-size) 2vw;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.2vw;
`;

const ColorPicker = styled.input`
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    width: 50%;
    height: 100%;
    cursor: pointer;
    border: none;
    
    &::-webkit-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }
    
    &::-moz-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }

    &:hover {
        &::-webkit-color-swatch {
            border: 5px solid #555555;
        }

        &::-moz-color-swatch {
            border: 5px solid #555555;
        }
    }
`;

const ButtonManager = styled.div`
    width: 50%;
    padding: 10px;
    background-color: var(--primary-color);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.5vh;
`;

const Button = styled.button<{ $disabled?: boolean; }>`
    background-color: var(--tertiary-color);
    color: black;
    border: 2px solid #555555;

    border: none;
    width: 100%;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: large;
    
    box-shadow: var(--button-shadow-small);
    transform: var(--button-transform-small);
    
    ${props => props.$disabled ? 
        `
        opacity: 0.6;
        cursor: not-allowed;
        `
        :
        `
        cursor: pointer;
        &:active {
            box-shadow: var(--button-shadow-small-active);
            transform: var(--button-transform-samll-active);
        }
        `};

    &:hover {
        ${props => props.$disabled ?
        `` :
        `background-color: #555555;
         color: white;`};
      }
`;


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