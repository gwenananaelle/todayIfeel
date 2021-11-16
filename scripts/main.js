var canvas = new fabric.Canvas("canvas");
canvas.setDimensions(
  { width: "100%", height: "calc(100% - 22px)" },
  { backstoreOnly: false, cssOnly: true }
);
window.addEventListener(
  "keydown",
  function(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "Backspace": // IE/Edge specific value
      let activeObject = canvas.getActiveObject();
      if (!activeObject.isEditing) {
        canvas.remove(canvas.getActiveObject());
        event.preventDefault();
      }
        break;

      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
  },
  true
);
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 150,
  // Set the initial color to pure red
  color: "#f00"
});
/**
 * LOAD
 */

function load() {
  // loadBg();
  loadImg();
  changePrompt();
  // activateButton();
  addEventsBrushControls();
  buttons.forEach(button => button.createButton());
  backgrounds.forEach(background => background.load());
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
  const promptEl = document.querySelector(".prompt");
  let currentIndex = promptList.indexOf(promptEl.innerText);
  promptEl.innerText = promptList[++currentIndex] || promptList[0];
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

function loadImg() {
  const gallery = document.getElementById("gallery-img");
  for (let index = 1; index < 72; index++) {
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
  colorPicker.on("color:change", function(color) {
    canvas.freeDrawingBrush.color = color.hexString;
  });
  const widthInput = document.querySelector("#thickness");
  widthInput.addEventListener("change", () => {
    let width = parseInt(widthInput.value, 10);
    canvas.freeDrawingBrush.width = width;
  });
}
