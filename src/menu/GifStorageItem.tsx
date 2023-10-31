import { useState, useEffect } from "react";
import { GifStorageItemButton, GifStorageItemPreview, GifStorageItemPreviewWrapper, GifStorageItemTitle, GifStorageItemWrapper } from "./GifStorageItemStyles";
import { gifRecord } from "../shared/Formats";


interface GifStorageItemsProps {
    initCanvasFromSave: Function;
}

export function GifStorageItems(props: GifStorageItemsProps) {
    const [localStorageGIFs, setLocalStorageGIFs] = useState<Array<gifRecord>>(JSON.parse(localStorage.getItem("GIFS") || "[]"));

    function deleteSavedGIF(deletingIndex: number) {
        let newGIFs: Array<gifRecord> = [];
        
        for (let i = 0; i < localStorageGIFs.length; i++) {
            if (i != deletingIndex) {
                newGIFs.push(localStorageGIFs[i]);
            }
        }

        setLocalStorageGIFs(() => { return newGIFs });
    }

    function downloadSavedGIF(index: number) {
        const blob = new Blob([JSON.stringify(localStorageGIFs[index])], { type: "application/json" });
        const link = document.createElement("a");
    
        link.download = localStorageGIFs[index].canvas.canvasName + ".json";
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["application/json", link.download, link.href].join(":");
    
        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
    
        link.dispatchEvent(evt);
        link.remove()
    }

    function uploadJsonGIF() {
        var files = document.getElementById('jsonFile').files;
        console.log(files);
        if (files.length <= 0) {
            return;
        }

        var fr = new FileReader();

        fr.onload = function(e) { 
            console.log(e);
            var result = JSON.parse(e.target.result);
            var formatted = JSON.stringify(result, null, 2);
            setLocalStorageGIFs((current) => { return [...current, JSON.parse(fr.result)] });
            console.log(localStorageGIFs);
        }

        fr.readAsText(files.item(0), "application/json");
    }

    function getSavedGIFs() {
        if (localStorageGIFs.length == 0) {
            return;
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
                    <GifStorageItemButton onClick={e => downloadSavedGIF(i)}>download data</GifStorageItemButton>
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
            <GifStorageItemWrapper key={crypto.randomUUID()}>
                <GifStorageItemTitle>Upload a json file</GifStorageItemTitle>
                <input type="file" id="jsonFile" name="filename"></input>
                <GifStorageItemButton onClick={e => uploadJsonGIF()}>Upload File</GifStorageItemButton>
            </GifStorageItemWrapper>
        </>
    );
}
