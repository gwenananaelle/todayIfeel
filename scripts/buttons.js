/** ---------------
 * BUTTONS
 * */
const buttons = [
  new Button({
    id: "hand",
    title: "hand",
    color: "DeepSkyBlue",
    icon: "fa-hand-paper",
    isDrawingMode: false,
    onClick: function() {
    }
  }),
  new Button({
    id: "pencil",
    title: "pencil",
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
    title: "brush",
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
    title: "text",
    color: "RebeccaPurple",
    icon: "fa-font",
    onClick: function() {
      var text = new fabric.IText("✍️", { left: 300, top: 100 });    
      text.on("editing:entered", function(e) {
        text.selectAll();
      });
      canvas.add(text);
    }
  }),
  new Button({
    id: "erase",
    title: "erase",
    color: "SteelBlue",
    icon: "fa-eraser",
    isDrawingMode: true,
    onClick: function() {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = 10;
    }
  }),
  new Button({
    id: "undo",
    title: "undo",
    color: "gold",
    icon: "fa-undo",
    onClick: function() {
      canvas.undo();
    }
  }),
  new Button({
    id: "redo",
    title: "redo",
    color: "YellowGreen",
    icon: "fa-redo",
    onClick: function() {
      canvas.redo();
    }
  }),
  new Button({
    id: "delete",
    title: "delete",
    color: "orange",
    icon: "fa-backspace",
    onClick: function() {
      canvas.remove(canvas.getActiveObject());
    }
  }),
  new Button({
    id: "clear",
    title: "clear",
    color: "Tomato",
    icon: "fa-trash-alt",
    onClick: function() {
      if (window.confirm("Do you really want to erase everything?")) {
        canvas.clear();
      } 
    }
  }),
  new Button({
    id: "save",
    title: "save",
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
