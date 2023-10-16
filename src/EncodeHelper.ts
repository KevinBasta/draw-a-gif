import { canvasType, colorTableType, colorType, frameType } from "./Formats";

if( 'function' === typeof importScripts) {
    importScripts("/require.js")
    let encoderModule: any = null;

    self.addEventListener('message', function(e) {
        console.log("test")
        if (e.data[0] == "load")
        {
            if (encoderModule != null) {
                return;
            }
    
            let req: Function = require;
            req({baseUrl: "./"},['/src/gifEncoder.js'], function(func: Function) {
                let loadModule = func();
                loadModule.then((Module: any) => {
                    encoderModule = Module;
                    console.log("MODULE LOADED")
                    console.log(encoderModule);
                });
            });
        }
        else if (e.data[0] == "encodeGIF")
        {
            let url = encodeDataAndCreateBlobURL(encoderModule, e.data[1], e.data[2], e.data[3]);

            postMessage(['url', url]);
        }
    }, false);
} 


function encodeDataAndCreateBlobURL(encoder: any, canvas: canvasType, frames: Array<frameType>, globalColorTable: colorTableType) {
    encodeData(encoder, canvas, frames, globalColorTable);
    let url = createBlob(encoder);

    return url;
}

function encodeData(encoder: any, canvas: canvasType, frames: Array<frameType>, globalColorTable: colorTableType) {
    let status;
    const ccanvas = encoder.ccall("gif_canvasCreate", Int32Array, Int32Array, [canvas.width, canvas.height]);
    status = encoder.ccall("gif_canvasCreateGlobalColorTable", Int32Array, Int32Array, [ccanvas]);

    for (let i = 0; i < globalColorTable.items.length; i++) {
      let currentColor: colorType = globalColorTable.items[i];
      
      status = encoder.ccall(
        "gif_canvasAddColorToColorTable",
        Int32Array,
        Int32Array,
        [ccanvas, currentColor.red, currentColor.green, currentColor.blue]
      );
    }

    for (let i = 0; i < frames.length; i++) {
      let jsframe: frameType = frames[i];

      const cframe = encoder.ccall("gif_frameCreate", Int32Array, Int32Array, [canvas.width, canvas.height, 0, 0]);
      status = encoder.ccall("gif_frameCreateIndexStream", Int32Array, Int32Array, [cframe, jsframe.indexStream.length]);

      for (let i = 0; i < jsframe.indexStream.length; i++) {
        status = encoder.ccall(
            "gif_frameAppendToIndexStream",
            Int32Array,
            Int32Array,
            [cframe, jsframe.indexStream[i]],
        );
      }

      status = encoder.ccall(
        "gif_frameSetTransparanetColorIndexInColorTable",
        Int32Array,
        Int32Array,
        [cframe, globalColorTable.transparentColorIndex],
      );

      status = encoder.ccall("gif_canvasAddFrame", Int32Array, Int32Array, [ccanvas, cframe]);
    }

    status = encoder.ccall("gif_expandCanvas", Int32Array, Int32Array, [ccanvas, 50, 50]);

    status = encoder.ccall("gif_createGIF", Int32Array, Int32Array, [ccanvas, true, true]);
}

function createBlob(encoder: any) {
    encoder.FS.readdir("/");
      
    var data = encoder.FS.readFile("output.gif", encoder.MEMFS);

    let gifURL = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' })
    );

    return gifURL;
}
