export function Pixel({ pixelColor }) {
    //console.log(pixelColor);
    const pixelStyle = {
        backgroundColor: `${pixelColor}`,
        width: '60px',
        height: '60px',
    }

    return (
        <div style={pixelStyle}></div>
    )
}