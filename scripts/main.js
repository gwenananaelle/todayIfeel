let selectedImg = null;
var canvas = new fabric.Canvas("canvas");
function openGallery(e, gallery) {
  const galleryBg = document.getElementById("gallery-bg");
  const galleryImg = document.getElementById("gallery-img");
  if (gallery === "backgrounds") {
    galleryBg.classList.add("active");
    galleryImg.classList.remove("active");
  } else {
    galleryImg.classList.add("active");
    galleryBg.classList.remove("active");
  }
}
function save() {
  var dataURL = canvas.toDataURL({
    format: "png",
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height
  });
  var newTab = window.open("about:blank", "image from canvas");
  newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}
function activateDrawingMode() {
  if (canvas.isDrawingMode === true) {
    canvas.isDrawingMode = false;
  } else {
    canvas.isDrawingMode = true;
  }
  console.log("drawing mode");
}
function clearCanvas() {
  canvas.clear();
}
function deleteObject() {
  canvas.remove(canvas.getActiveObject());
}
function addText() {
  var text = new fabric.IText("type here", { left: 300, top: 100 });
  canvas.add(text);
}

function loadGalleries() {
  loadBg();
  loadImg();
}
function loadBg() {
  const gallery = document.getElementById("gallery-bg");
  for (let index = 1; index < 7; index++) {
    const img = document.createElement("img");
    const url = `/img/bg/background-${index}.png`;
    img.setAttribute("src", url);
    img.setAttribute("class", "img");
    img.addEventListener("click", function(url) {
      bgUrl = url;
      console.log("bg selected " + this.src);
      //canvas.setBackgroundImage(this.src);
      canvas.setBackgroundImage(this.src, canvas.renderAll.bind(canvas), {
        width: canvas.width,
        height: canvas.height,
        // Needed to position backgroundImage at 0/0
        originX: "left",
        originY: "top"
      });
    });
    gallery.appendChild(img);
  }
}
function loadImg() {
  const gallery = document.getElementById("gallery-img");
  for (let index = 1; index < 6; index++) {
    const img = document.createElement("img");
    const url = `/img/small-img/img-${index}.png`;
    img.setAttribute("src", url);
    img.setAttribute("class", "img");
    img.addEventListener("click", selectImg);
    gallery.appendChild(img);
  }
}

function selectImg() {
  const allSelected = document.getElementsByClassName("selected");
  for (i = 0; i < allSelected.length; i++) {
    allSelected[i].classList.remove("selected");
  }
  this.classList.toggle("selected");
  selectedImg = this;
}
function drawImg(x, y) {
  const img = document.querySelector(".selected");
  if (img) {
    console.log(img);
    var imgInstance = new fabric.Image(img, {
      left: x,
      top: y,
      angle: 0,
      opacity: 1
    });
    canvas.add(imgInstance);
  }
}

function getMouseXPosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  return x;
}
function getMouseYPosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let y = event.clientY - rect.top;
  return y;
}
let canvasElem = document.querySelector("canvas");
canvasElem.addEventListener("mousedown", function(e) {
  const x = getMouseXPosition(canvasElem, e);
  const y = getMouseYPosition(canvasElem, e);
  drawImg(x, y);
});

canvas.on("mouse:down", function(options) {
  const x = getMouseXPosition(canvasElem, options.e);
  const y = getMouseYPosition(canvasElem, options.e);
  drawImg(x, y);
  console.log(options.e.clientX, options.e.clientY);
});
