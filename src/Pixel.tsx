interface MyPixelProps {
    
}

export function Pixel({ pixelColor }) {
    //console.log(pixelColor);
    const pixelStyle = {
        backgroundColor: `${pixelColor}`,
        width: '60px',
        height: '60px',
        border: "1px solid black",
    }

    return (
        <div style={pixelStyle}></div>
    )
}