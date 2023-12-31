
if( 'function' === typeof importScripts) {
  importScripts("/require.js")

  let encoderModule = null;

    self.addEventListener('message', function(e) {
        if (e.data[0] == "load")
        {
            if (encoderModule != null) {
                return;
            }
    
            require({baseUrl: "./"},['/gifEncoder.js'], function(func) {
                let loadModule = func();
                loadModule.then((Module) => {
                    encoderModule = Module;
                    console.log("ENCODER LOADED")
                    console.log(encoderModule);
                });
            });
        }
        else if (e.data[0] == "encode")
        {
            let data = encodeData(encoderModule, e.data[1], e.data[2], e.data[3]);

            postMessage(['data', data]);
        }
        else if (e.data[0] == "framePreview")
        {
            let canvas = e.data[1];

            // limit quality of frame previews
            if (canvas.width > 100 || canvas.height > 100) {
              canvas.qualityMultiplier = 1;
            } else {
              canvas.qualityMultiplier = 5;
            }

            let frames = [e.data[2][e.data[3]]];

            let data = encodeData(encoderModule, canvas, frames, e.data[4]);

            postMessage(['frameData', data, e.data[3]]);
        }
    }, false);
} 

function encodeData(encoder, canvas, frames, globalColorTable) {
    let status;

    // Create a c canvas and add a global color table
    const ccanvas = encoder.ccall("gif_canvasCreate", Int32Array, Int32Array, [canvas.width, canvas.height]);
    status = encoder.ccall("gif_canvasCreateGlobalColorTable", Int32Array, Int32Array, [ccanvas]);

    // Add each color in the js global color table to the c global color table
    for (let i = 0; i < globalColorTable.items.length; i++) {
      let currentColor = globalColorTable.items[i];
      
      status = encoder.ccall(
        "gif_canvasAddColorToColorTable",
        Int32Array,
        Int32Array,
        [ccanvas, currentColor.red, currentColor.green, currentColor.blue]
      );
    }

    // Add encoding data for each js frame
    for (let i = 0; i < frames.length; i++) {
      let jsframe = frames[i];

      // Create a c frame for each js frame and create an index stream
      const cframe = encoder.ccall("gif_frameCreate", Int32Array, Int32Array, [canvas.width, canvas.height, 0, 0]);
      status = encoder.ccall("gif_frameCreateIndexStream", Int32Array, Int32Array, [cframe, jsframe.indexStream.length]);

      // Add each index of the js frame index stream to the c frame index stream
      for (let i = 0; i < jsframe.indexStream.length; i++) {
        status = encoder.ccall(
            "gif_frameAppendToIndexStream",
            Int32Array,
            Int32Array,
            [cframe, jsframe.indexStream[i]],
        );
      }

      // Set the transparent color index of each c frame
      status = encoder.ccall(
        "gif_frameSetTransparanetColorIndexInColorTable",
        Int32Array,
        Int32Array,
        [cframe, globalColorTable.transparentColorIndex],
      );

      // Set disposal method and delay time
      status = encoder.ccall(
        "gif_frameAddGraphicsControlInfo",
        Int32Array,
        Int32Array,
        [cframe, jsframe.disposalMethod, jsframe.delayTime],
      );
      
      // Add the c frame to the c canvas 
      status = encoder.ccall("gif_canvasAddFrame", Int32Array, Int32Array, [ccanvas, cframe]);
    }

    // Expand the gif by a factor and encode it
    status = encoder.ccall("gif_expandCanvas", Int32Array, Int32Array, [ccanvas, canvas.qualityMultiplier, canvas.qualityMultiplier]);
    status = encoder.ccall("gif_createGIF", Int32Array, Int32Array, [ccanvas, true, true]);

    // Check if output.gif exsists


    // Read the data of the file and return for creation of blob
    let data = encoder.FS.readFile("output.gif", encoder.MEMFS);
    
    return data;
}
