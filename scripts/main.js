var canvas = new fabric.Canvas("canvas");
canvas.setDimensions(
  { width: "100%", height: "calc(100% - 22px)" },
  { backstoreOnly: false, cssOnly: true }
);
window.addEventListener(
  "keydown",
  function (event) {
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
  color: "#f00",
});
/**
 * LOAD
 */

function load() {
  changePrompt();
  addEventsBrushControls();
  buttons.forEach((button) => button.createButton());
  backgrounds.forEach((background) => background.load());
  images.forEach((image) => image.load());
}
/**
 * PROMPT
 */

const promptList = [
  "I hope...",
  "I dream of...",
  "I feel...",
  "In the past..",
  "If only...",
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

/**
 * BRUSH CONTROLS
 */

function addEventsBrushControls() {
  const dot = document.querySelector(".dot");
  colorPicker.on("color:change", function (color) {
    dot.style.backgroundColor = color.hexString;
    canvas.freeDrawingBrush.color = color.hexString;
  });
  const widthInput = document.querySelector("#thickness");
  widthInput.addEventListener("change", () => {
    let width = parseInt(widthInput.value, 10);
    dot.style.width = `${width}px`;
    dot.style.height = `${width}px`;
    canvas.freeDrawingBrush.width = width;
  });
}
