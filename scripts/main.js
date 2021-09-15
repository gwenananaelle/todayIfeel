var canvas = new fabric.Canvas("canvas");
canvas.setDimensions(
  { width: "100%", height: "calc(100% - 22px)" },
  { backstoreOnly: false, cssOnly: true }
);
//calc(100% - 44px)
const promptList = [
  "I hope...",
  "I dream of...",
  "I feel...",
  "In the past..",
  "If only..."
];

function changePrompt() {
  promptEl = document.querySelector(".prompt");
  promptEl.innerText =
    promptList[Math.floor(Math.random() * promptList.length)];
}
function openGallery(e, gallery) {
  allButtonsActives = document.querySelector(".tablinks.active");
  allButtonsActives.classList.remove("active");
  buttonClicked = e.target;
  buttonClicked.classList.add("active");
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
  canvas.isDrawingMode = false;
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
}
function clearCanvas() {
  canvas.isDrawingMode = false;
  canvas.clear();
}
function deleteObject() {
  canvas.isDrawingMode = false;
  canvas.remove(canvas.getActiveObject());
}
function addText() {
  canvas.isDrawingMode = false;
  var text = new fabric.IText("type here", { left: 300, top: 100 });
  canvas.add(text);
}

function load() {
  loadBg();
  loadImg();
  changePrompt();
}
function loadBg() {
  const gallery = document.getElementById("gallery-bg");
  for (let index = 1; index < 20; index++) {
    const img = document.createElement("img");
    const url = `/todayIfeel/img/bg/bg-${index}.jpg`;
    img.setAttribute("src", url);
    img.setAttribute("class", "img");
    img.addEventListener("click", function(url) {
      bgUrl = url;
      let scaleFactor = 1;
      if (img.width > img.height) {
        scaleFactor = canvas.width / img.naturalWidth;
      } else {
        scaleFactor = canvas.height / img.naturalHeight;
      }
      console.log(
        `the canvas width is ${canvas.width} the image width is ${img.naturalWidth} and the scale ${scaleFactor}`
      );
      canvas.setBackgroundImage(this.src, canvas.renderAll.bind(canvas), {
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: "center",
        originY: "center",
        scaleX: scaleFactor,
        scaleY: scaleFactor
      });
    });
    gallery.appendChild(img);
  }
}
function loadImg() {
  const gallery = document.getElementById("gallery-img");
  for (let index = 1; index < 29; index++) {
    const img = document.createElement("img");
    const url = `/todayIfeel/img/small-img/img-${index}.png`;
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
  drawImg(this);
}
function drawImg(selectedImg) {
  const img = selectedImg;
  if (img) {
    var imgInstance = new fabric.Image(img, {
      left: 100,
      top: 100,
      scaleX: 0.1,
      scaleY: 0.1,
      angle: 0,
      opacity: 1
    });
    canvas.add(imgInstance);
  }
}
