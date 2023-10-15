const canvas = Module.ccall(
    "gif_canvasCreate", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [10, 10], // arguments
);

const result1 = Module.ccall(
    "gif_canvasCreateGlobalColorTable", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [canvas], // arguments
);

for (let i = 0; i < 100; i++) {
    const resultx = Module.ccall(
        "gif_canvasAddColorToColorTable", // name of C function
        Int32Array, // return type
        Int32Array, // argument types
        [canvas, 0, i, i], // arguments
    );
}

const frame = Module.ccall(
    "gif_frameCreate", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [10, 10, 0, 0], // arguments
);

const result2 = Module.ccall(
    "gif_frameCreateIndexStream", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [frame, 100], // arguments
);

for (let i = 0; i < 100; i++) {
    const resultx = Module.ccall(
        "gif_frameAppendToIndexStream", // name of C function
        Int32Array, // return type
        Int32Array, // argument types
        [frame, i], // arguments
    );
}

const result3 = Module.ccall(
    "gif_canvasAddFrame", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [canvas, frame], // arguments
);

const result4 = Module.ccall(
    "gif_expandCanvas", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [canvas, 50, 50], // arguments
);

const result5 = Module.ccall(
    "gif_createGIF", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [canvas, true, true], // arguments
);


FS.readdir("/");

var data = FS.readFile("output.gif", MEMFS);

var img2 = document.createElement("img");
document.body.appendChild(img2).src = URL.createObjectURL(
  new Blob([data.buffer], { type: 'image/gif' } /* (1) */)
);
var src = document.body;
src.appendChild(img2);

