const result = Module.ccall(
    "gif_createErrorGif", // name of C function
    Int32Array, // return type
    Int32Array, // argument types
    [5], // arguments
);

FS.readdir("/");

var data = FS.readFile("ERROR.gif", MEMFS);

var img2 = document.createElement("img");
document.body.appendChild(img2).src = URL.createObjectURL(
  new Blob([data.buffer], { type: 'image/gif' } /* (1) */)
);
var src = document.body;
src.appendChild(img2);
