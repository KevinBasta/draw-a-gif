import { GifStorageWrapper } from "./GifStorageContextStyles";
import { GifStorageItems } from "./GifStorageItem";

interface GifStorageContextProps {
    initCanvasFromSave: Function;
}

export function GifStorageContext(props: GifStorageContextProps) {

    return (
        <>
            <GifStorageWrapper>
                <GifStorageItems initCanvasFromSave={props.initCanvasFromSave} />
            </GifStorageWrapper>
        </>
    );
}