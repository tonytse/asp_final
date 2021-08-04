function UIManager() {

    let self = this;

    this.data = null;
    this.button = null;
    this.currentIndex = 0;
    this.font;

    this.preload = function () {
        self.font = loadFont("assets/fonts/CabinSketch-Regular.ttf");
    };

    this.isBlockindMode = false;

    this.onDraw = function () {
        if( self.data == null ) return;
    
        fill(0, 0, 0, 150);
        rect(0, 0, windowWidth, windowHeight);

        fill(69, 123, 157);
        rect(0, windowHeight - windowHeight / 4, windowWidth, windowHeight / 4 );

        fill(255);
        textSize(36);
        textAlign(LEFT);
        
        textFont(self.font);
        text( self.data.text[self.currentIndex], 20, windowHeight - windowHeight / 4.5, 
                windowWidth, windowHeight / 7);
        
    };

    this.loadDialog = function( jsonFile )
    {
        self.data = loadJSON( jsonFile );

        self.button = createButton('Next');
        self.button.position(windowWidth - 150, windowHeight - 90);
        self.button.size(100, 50);
        self.button.id('dialogButton');
        self.button.mousePressed( self.nextLine );
        
        self.isBlockindMode = true;
    };

    
    this.nextLine = function() {

        self.currentIndex += 1;

        if ( self.currentIndex >= self.data.text.length ) {
            self.clearDailog();
        }
    
    };

    this.clearDailog = function() {
        self.data = null;
        self.currentIndex = 0;
        self.isBlockindMode = false;
        if( self.button ) {
            self.button.remove();
            self.button = null;
        }
    };
}