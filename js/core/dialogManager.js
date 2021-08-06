function DialogManager() {

    let self = this;
    
    this.json = null;
    this.button = null;
    this.currentIndex = 0;
    this.font;

    this.preload = function () {
        self.font = loadFont("assets/fonts/CabinSketch-Regular.ttf");
    };

    this.isBlockingMode = false;

    this.onDraw = function () {

        if( self.json == null ) return;
        let len = self.json.text['length'];
        if( len <= self.currentIndex ) return;

        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        fill(69, 123, 157);
        rect(0, height - height / 4, width, height / 4 );

        fill(255);
        textSize(36);
        textAlign(LEFT);
        
        textFont(self.font);
        text( self.json.text[self.currentIndex], 20, height - height / 4.5, 
                width, height / 7);
        
    };

    this.callbackFunc = null;

    this.loadDialog = function( jsonFile, callbackFunc = null )
    {
        let width = gSceneManager.width;
        let height = gSceneManager.height;

        loadJSON( jsonFile, function( json ){ self.json = json; });
        self.button = createButton('Next');
        self.button.position( width - 120, height - 70);
        self.button.size(100, 50);
        self.button.id('dialogButton');
        self.button.mousePressed( self.nextLine );
        self.currentIndex = 0;
        self.isBlockingMode = true;
        self.callbackFunc = callbackFunc;
    };

    
    this.nextLine = function() {
        self.currentIndex++;
        let len = self.json.text['length'];
        if ( self.currentIndex >= len ) {
            self.callbackFunc();
            self.callbackFunc = null;
            self.clearDailog();
        }
    
    };

    this.clearDailog = function() {
        self.json = null;
        self.currentIndex = 0;
        self.isBlockingMode = false;
        if( self.button ) {
            self.button.remove();
            self.button = null;
        }
    };
}