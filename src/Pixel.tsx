import styled from "styled-components";


interface PixelElemProps {
    color: string;
    height: string;
}

const PixelElem = styled.div<PixelElemProps>`
    background-color: ${props => props.color};
    aspect-ratio: 1/1;
    height: ${props => props.height == null ? "auto" : props.height};
`;
//border: 1px solid black;



interface PixelProps {
    color: string;
    height: string;
}

export function Pixel({ color, height }: PixelProps) {
    //console.log(pixelColor);
    return (
        <PixelElem color={color} height={height} />
    )
}