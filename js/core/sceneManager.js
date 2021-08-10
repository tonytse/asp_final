function SceneManager() {

    let self = this;
    let width;
    let height;
    let background = null;
    let currentFile = null;

    this.init = function ( width, height ) {
        self.width = width;
        self.height = height;
    };

    this.loadTown = function() {
        // http://unluckystudio.com/free-game-artassets-16-side-view-cars-assets/
        self.load('town.jpg');
    };

    this.loadHome = function() {
        // https://www.vecteezy.com/vector-art/362972-interior-modern-living-room-with-furniture-flat-design-vector-illustration
        self.load('home.jpg');
    };

    this.loadBathroom = function() {
        // https://www.vecteezy.com/vector-art/173715-bathroom-layout-vector
        self.load('bathroom.jpg');
    };
    
    this.loadSupermarket = function() {
        // https://www.vecteezy.com/vector-art/1254668-woman-with-an-eco-friendly-bag-at-food-store    
        self.load('supermarket.jpg');
    };
    

    this.load = function( file ) {
        if( currentFile == file ) return;
        self.background = loadImage('assets/scene/'+ file);
        currentFile = file;
    }

    this.onDraw = function (w,h) {
        if( self.background ) {
            image(self.background, 0, 0, self.width, self.height, 0, 0, self.background.width, self.background.height );
        }
    }

    this.onWindowResized = function ( w, h ) {
        self.width = w;
        self.height = h;
    }

}