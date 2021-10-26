/** ---------------
 * BUTTONS
 * */
const buttons = [
  new Button({
    id: "pencil",
    color: "black",
    icon: "fa-pencil-alt",
    isDrawingMode: true,
    onClick: function name() {
      canvas.freeDrawingBrush.color = "#000";
      canvas.freeDrawingBrush.width = 1;
    }
  }),
  new Button({
    id: "brush",
    color: "PaleVioletRed",
    icon: "fa-paint-brush",
    isDrawingMode: true,
    onClick: function name() {
      const controls = document.querySelector(".controls");
      if (controls.classList.contains("show")) {
        controls.classList.remove("show");
        canvas.isDrawingMode = false;
      } else {
        controls.classList.add("show");
        const color = document.querySelector(".coloris");
        const width = document.querySelector("#thickness");
        canvas.freeDrawingBrush.color = color.value;
        canvas.freeDrawingBrush.width = width.value;
      }
    }
  }),
  new Button({
    id: "text",
    color: "RebeccaPurple",
    icon: "fa-font",
    onClick: function name() {
      var text = new fabric.IText("type here", { left: 300, top: 100 });
      canvas.add(text);
    }
  }),
  new Button({
    id: "erase",
    color: "SteelBlue",
    icon: "fa-eraser"
  }),
  new Button({
    id: "delete",
    color: "orange",
    icon: "fa-backspace",
    onClick: function name() {
      canvas.remove(canvas.getActiveObject());
    }
  }),
  new Button({
    id: "clear",
    color: "Tomato",
    icon: "fa-trash-alt",
    onClick: function name() {
      canvas.clear();
    }
  }),
  new Button({
    id: "save",
    color: "YellowGreen",
    icon: "fa-download",
    onClick: function name() {
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
  })
];
