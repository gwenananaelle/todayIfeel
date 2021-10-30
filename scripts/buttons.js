/** ---------------
 * BUTTONS
 * */
const buttons = [
  new Button({
    id: "pencil",
    color: "black",
    icon: "fa-pencil-alt",
    isDrawingMode: true,
    onClick: function() {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = "#000";
      canvas.freeDrawingBrush.width = 1;
    }
  }),
  new Button({
    id: "brush",
    color: "PaleVioletRed",
    icon: "fa-paint-brush",
    isDrawingMode: true,
    hasControls: true,
    onClick: function() {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = colorPicker.color.hexString;
      const widthInput = document.querySelector("#thickness");
      let width = parseInt(widthInput.value, 10);
      canvas.freeDrawingBrush.width = width;
    }
  }),
  new Button({
    id: "text",
    color: "RebeccaPurple",
    icon: "fa-font",
    onClick: function() {
      var text = new fabric.IText("type here", { left: 300, top: 100 });
      canvas.add(text);
    }
  }),
  new Button({
    id: "erase",
    color: "SteelBlue",
    icon: "fa-eraser",
    isDrawingMode: true,
    onClick: function() {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = 10;
    }
  }),
  new Button({
    id: "delete",
    color: "orange",
    icon: "fa-backspace",
    onClick: function() {
      canvas.remove(canvas.getActiveObject());
    }
  }),
  new Button({
    id: "clear",
    color: "Tomato",
    icon: "fa-trash-alt",
    onClick: function() {
      canvas.clear();
    }
  }),
  new Button({
    id: "save",
    color: "YellowGreen",
    icon: "fa-download",
    onClick: function() {
      const ext = "png";
      const base64 = canvas.toDataURL({
        format: ext,
        enableRetinaScaling: true
      });
      const link = document.createElement("a");
      link.href = base64;
      link.download = `art-therapy.${ext}`;
      link.click();
    }
  })
];
