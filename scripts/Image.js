class Image {
    constructor(config) {
        this.title = config.title || "";
        this.author = config.author || "";
        this.year = config.year || "";
        this.url = config.url || "";
        this.attribution = config.attribution || "";
        this.alt = config.alt || "";

        this.handleEvent = function(event) {
            switch (event.type) {
              case "click":
                const img = event.target; 
                var imgInstance = new fabric.Image(img, {
                    // left: 100,
                    // top: 100,
                    // scaleX: 0.1,
                    // scaleY: 0.1,
                    // angle: 0,
                    // opacity: 1
                  });
                  canvas.add(imgInstance);
                break;
      
              default:
                break;
            }
          };
    }
}
Image.prototype.load = function() {
    const gallery = document.getElementById("gallery-img");
    const img = document.createElement("img");
    img.setAttribute("src", this.url);
    img.setAttribute("class", "img");
    img.setAttribute("title", `${this.title} by ${this.author}, ${this.year}`);
    img.addEventListener("click", this);
    gallery.appendChild(img);
  };