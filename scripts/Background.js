class Background {
    constructor(config) {
        this.title = config.title;
        this.author = config.author;
        this.year = config.year;
        this.url = config.url;

        this.handleEvent = function(event) {
            switch (event.type) {
              case "click":
                const img = event.target; 
              let scaleFactor = 1;
              if (img.width > img.height) {
                scaleFactor = canvas.width / img.naturalWidth;
              } else {
                scaleFactor = canvas.height / img.naturalHeight;
              }
              canvas.setBackgroundImage(this.url, canvas.renderAll.bind(canvas), {
                left: canvas.width / 2,
                top: canvas.height / 2,
                originX: "center",
                originY: "center",
                scaleX: scaleFactor,
                scaleY: scaleFactor,
                erasable: false
              });
              const colorThief = new ColorThief();
              // Make sure image is finished loading
              if (img.complete) {
                let color = `rgb(${colorThief.getColor(event.target).toString()})`;
                document.body.style.background = color;
                document.body.style.color = color;
              }
                break;
      
              default:
                break;
            }
          };
    }
}
Background.prototype.load = function() {
    const gallery = document.getElementById("gallery-bg");
    const img = document.createElement("img");
    img.setAttribute("src", this.url);
    img.setAttribute("class", "img");
    img.setAttribute("title", `${this.title} by ${this.author}, ${this.year}`);
    img.addEventListener("click", this);
    gallery.appendChild(img);
  };