import { useState, useEffect } from "react";
import { GifStorageItemButton, GifStorageItemPreview, GifStorageItemPreviewWrapper, GifStorageItemTitle, GifStorageItemWrapper } from "./GifStorageItemStyles";
import { gifRecord } from "../shared/Formats";


interface GifStorageItemsProps {
    initCanvasFromSave: Function;
}

export function GifStorageItems(props: GifStorageItemsProps) {
    const [localStorageGIFs, setLocalStorageGIFs] = useState(JSON.parse(localStorage.getItem("GIFS") || "[]"));

    function deleteSavedGIF(deletingIndex: number) {
        let newGIFs: Array<gifRecord> = [];
        
        for (let i = 0; i < localStorageGIFs.length; i++) {
            if (i != deletingIndex) {
                newGIFs.push(localStorageGIFs[i]);
            }
        }

        setLocalStorageGIFs(() => { return newGIFs });
    }

    function getSavedGIFs() {
        if (localStorageGIFs.length == 0) {
            return (
                <GifStorageItemWrapper key={crypto.randomUUID()}>
                    <GifStorageItemTitle>No Saved GIFs</GifStorageItemTitle>
                </GifStorageItemWrapper>
            )
        }

        let savedGIFs: Array<gifRecord> = localStorageGIFs;
        let elements = [];

        for (let i = 0; i < savedGIFs.length; i++) {
            let currentGIF: gifRecord = savedGIFs[i];

            let blobUrl = null;
            if (currentGIF.frames[0].previewData != null) {
                let encodedData = Uint8Array.from(currentGIF.frames[0].previewData);
                let encodedBlob = new Blob([encodedData.buffer], { type: 'image/gif' })
                blobUrl  = URL.createObjectURL(encodedBlob);
            }
            
            elements.push(
                <GifStorageItemWrapper key={crypto.randomUUID()}>
                    <GifStorageItemPreviewWrapper>
                        <GifStorageItemPreview $widthratio={1}
                                               $heightratio={1}
                                               src={blobUrl}></GifStorageItemPreview>
                    </GifStorageItemPreviewWrapper>
                    
                    <GifStorageItemTitle title={currentGIF.canvas.canvasName}>{currentGIF.canvas.canvasName || "GIF SAVE #" + (i + 1) }</GifStorageItemTitle>
                    
                    <GifStorageItemButton onClick={e => props.initCanvasFromSave(currentGIF.canvas, currentGIF.frames, currentGIF.globalColorTable)}>load</GifStorageItemButton>
                    <GifStorageItemButton onClick={e => deleteSavedGIF(i)}>delete</GifStorageItemButton>
                </GifStorageItemWrapper>
            )
        }

        return elements;
    }

    useEffect(() => {
        localStorage.setItem("GIFS", JSON.stringify(localStorageGIFs));
    }, [localStorageGIFs]);


    return (
        <>
            {
                getSavedGIFs()
            }
        </>
    );
}
