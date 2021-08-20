function SceneManager() {

    let self = this;
    let width;
    let height;
    let background = null;
    let currentFile = null;
    let offsetX = 100;
    this.win = null;

    this.init = function (width, height) {
        self.offsetX = 0;
        self.width = width;
        self.height = height;

        self.win = createSprite(300, 300, 614, 307);
        self.win.addAnimation('Won',);
    };


    this.loadGameB = function () {
        // http://unluckystudio.com/free-game-artassets-16-side-view-cars-assets/
        self.load('gameB.jpg');
    };

    this.loadTown = function () {
        // http://unluckystudio.com/free-game-artassets-16-side-view-cars-assets/
        self.load('town.jpg');
    };

    this.loadHome = function () {
        // https://www.vecteezy.com/vector-art/362972-interior-modern-living-room-with-furniture-flat-design-vector-illustration
        self.load('home.jpg');
    };

    this.loadBathroom = function () {
        // https://www.vecteezy.com/vector-art/173715-bathroom-layout-vector
        self.load('bathroom.jpg');
    };

    this.loadSupermarket = function () {
        // https://www.vecteezy.com/vector-art/1254668-woman-with-an-eco-friendly-bag-at-food-store    
        self.load('supermarket.jpg');
    };


    this.load = function (file) {
        if (currentFile == file) return;
        self.offsetX = 0;
        self.background = loadImage('assets/scene/' + file);
        currentFile = file;
    }

    this.onDraw = function (w, h) {
        if (self.background) {

            let width = self.background.width;
            let r = width / 1280;
            let height = self.background.height;

            image(self.background, 0, 0, w, h, self.offsetX, 0, width / r, height);
        }
    }

    this.onWindowResized = function (w, h) {
        self.width = w;
        self.height = h;
    }

}