function DialogSystem() {

    let self = this;

    this.index = 0;
    this.data;
    this.button;
    this.dialogFont;

    this.onDraw = function () {
        if ( self.data.text.length > self.index) {
            self.button.style('display', 'auto');
            fill(0, 0, 0, 150);
            rect(0, 0, windowWidth, windowHeight);
            fill(69, 123, 157);
            rect(0, windowHeight - windowHeight / 4, windowWidth, windowHeight / 4);
            fill(255);
            textSize(36);
            textAlign(LEFT);
            textFont(self.dialogFont);
            text(self.data.text[self.index], 20, windowHeight - windowHeight / 4.5, windowWidth, windowHeight / 7);
            self.button.mousePressed( self.nextDialog );
        } else {
            self.button.style('display', 'none');
        }
    }

    // init setup
    this.init = function (jsonFile) {
        self.data = jsonFile;

        self.button = createButton('NEXT');
        self.button.position(windowWidth - 150, windowHeight - 90);
        self.button.size(100, 50);
        self.button.id('dialogButton');        
	    self.dialogFont = loadFont("assets/fonts/CabinSketch-Regular.ttf");
    }

    this.nextDialog = function() {

        if (self.data.text.length > self.index) {
            self.index += 1;
            console.log(self.index);
        }
    
    }

    
};

