class Button {
  constructor(config) {
    this.id = config.id;
    this.color = config.color;
    this.icon = config.icon;
    this.isDrawingMode = config.isDrawingMode || false;
    this.hasControls = config.hasControls || false;
    this.onClick = config.onClick || function() {};
    this.createButton = function name(params) {
      const button = document.createElement("button");
      button.innerHTML = `<i class="fas ${this.icon}"></i>`;
      button.id = `${this.id}`;
      button.classList.add("btn");
      button.addEventListener("click", this);
      const buttonList = document.querySelector(".buttonList");
      button.style.backgroundColor = this.color;
      buttonList.appendChild(button);
    };
    this.handleEvent = function(event) {
      switch (event.type) {
        case "click":
          buttons.forEach(button => button.close());
          this.active();
          this.drawingMode();
          this.showControls();
          this.onClick();
          break;

        default:
          break;
      }
    };
  }
}
Button.prototype.active = function() {
  const button = document.querySelector(`#${this.id}`);
  button.classList.add("active");
};
Button.prototype.close = function() {
  const button = document.querySelector(`#${this.id}`);
  button.classList.remove("active");
};
Button.prototype.drawingMode = function() {
  canvas.isDrawingMode = this.isDrawingMode;
};
Button.prototype.showControls = function() {
  const controls = document.querySelector(".controls");
  if (this.hasControls && !controls.classList.contains("show")) {
    controls.classList.add("show");
  } else if (controls.classList.contains("show")) {
    controls.classList.remove("show");
  }
};
