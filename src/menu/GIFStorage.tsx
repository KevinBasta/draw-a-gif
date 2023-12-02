import { useState, useEffect } from "react";
import { GIFStorageItemWrapper, GIFStorageWrapper, GIFStorageItemPreviewWrapper, GIFStorageItemTitle, GIFStorageItemsWrapper } from "./GIFStorageStyles";
import { gifRecord } from "../shared/Formats";
import { ButtonGIFStorageItem } from "../shared-styles/Button";
import { ImgGIFStorageItemPreview } from "../shared-styles/Image";
import { InputJsonFile } from "../shared-styles/Input";
import { Title, TitlePadded } from "../shared-styles/Text";

interface GifStorageItemsProps {
    initCanvasFromSave: Function;
}

export function GIFStorage(props: GifStorageItemsProps) {
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

    function uploadJsonGIF() {
        var files = (document.getElementById('jsonFile') as HTMLInputElement).files;
        console.log(files);
        if (files.length <= 0) {
            return;
        }

        var fr = new FileReader();

        fr.onload = function(e) { 
            console.log(e);
            var result = JSON.parse((e.target as any).result);
            var formatted = JSON.stringify(result, null, 2);
            setLocalStorageGIFs((current) => { return [...current, JSON.parse((fr as any).result)] });
            console.log(localStorageGIFs);
        }

        fr.readAsText(files.item(0), "application/json");
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
                <GIFStorageItemWrapper key={crypto.randomUUID()}>
                    <GIFStorageItemPreviewWrapper>
                        <ImgGIFStorageItemPreview $widthratio={1}
                                                  $heightratio={1}
                                                  src={blobUrl} />
                    </GIFStorageItemPreviewWrapper>
                    
                    <GIFStorageItemTitle title={currentGIF.canvas.canvasName}>
                        { currentGIF.canvas.canvasName || "GIF SAVE #" + (i + 1) }
                    </GIFStorageItemTitle>
                    
                    <ButtonGIFStorageItem 
                        title="open save in gif editor"
                        className="material-symbols-outlined" 
                        onClick={(e) => {
                        props.initCanvasFromSave(currentGIF.canvas,
                                                 currentGIF.frames,
                                                 currentGIF.globalColorTable)
                       }}>draw</ButtonGIFStorageItem>

                    <ButtonGIFStorageItem 
                        title="download json save file"
                        className="material-symbols-outlined"
                        onClick={(e) => {
                            downloadSavedGIF(i)
                        }}>download</ButtonGIFStorageItem>

                    <ButtonGIFStorageItem 
                        title="delete save from local stroage"
                        className="material-symbols-outlined"
                        onClick={(e) => {
                            deleteSavedGIF(i)
                        }}>delete</ButtonGIFStorageItem>
                </GIFStorageItemWrapper>
            )
        }

        return elements;
    }

    useEffect(() => {
        localStorage.setItem("GIFS", JSON.stringify(localStorageGIFs));
    }, [localStorageGIFs]);

    return (
        <>
            <GIFStorageWrapper>
                <TitlePadded>Saved GIFs</TitlePadded>
                <GIFStorageItemsWrapper>
                    {
                        getSavedGIFs()
                    }
                    <GIFStorageItemWrapper key={crypto.randomUUID()}>
                        <GIFStorageItemTitle>Upload a json file</GIFStorageItemTitle>
                        <InputJsonFile type="file" id="jsonFile" name="filename" />
                        { 
                        // make button the file input type submit on upload
                        }
                        <ButtonGIFStorageItem 
                            title="upload json save file"
                            className="material-symbols-outlined" 
                            onClick={(e) => {
                                uploadJsonGIF()
                            }}>upload</ButtonGIFStorageItem>
                    </GIFStorageItemWrapper>
                </GIFStorageItemsWrapper>
            </GIFStorageWrapper>
        </>
    );
}
