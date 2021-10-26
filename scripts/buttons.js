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
      const color = document.querySelector(".coloris");
      const width = document.querySelector("#thickness");
      canvas.freeDrawingBrush.color = color.value;
      canvas.freeDrawingBrush.width = width.value;
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
      //  optional
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
