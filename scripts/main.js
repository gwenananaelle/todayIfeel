var canvas = new fabric.Canvas("canvas");
canvas.setDimensions(
  { width: "100%", height: "calc(100% - 22px)" },
  { backstoreOnly: false, cssOnly: true }
);

/**
 * LOAD
 */

function load() {
  loadBg();
  loadImg();
  changePrompt();
  // activateButton();
  addEventsBrushControls();
  buttons.forEach(button => button.createButton());
}
/**
 * PROMPT
 */

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
document.querySelector(".fa-dice").addEventListener("click", changePrompt);

/**
 * GALLERIES
 */

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
function loadBg() {
  const gallery = document.getElementById("gallery-bg");
  for (let index = 1; index < 19; index++) {
    const img = document.createElement("img");
    const url = `img/bg/bg-${index}.jpg`;
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
  for (let index = 1; index < 28; index++) {
    const img = document.createElement("img");
    const url = `img/small-img/img-${index}.png`;
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

/**
 * BRUSH CONTROLS
 */

function addEventsBrushControls() {
  const color = document.querySelector(".coloris");
  const width = document.querySelector("#thickness");
  color.addEventListener("change", () => {
    canvas.freeDrawingBrush.color = color.value;
  });
  width.addEventListener("change", () => {
    canvas.freeDrawingBrush.width = width.value;
  });
}
