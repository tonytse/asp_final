function DialogManager() {

    let self = this;

    this.json = null;
    this.button = null;
    this.currentIndex = 0;
    this.currentText = null;
    this.font = null;

    let oldWidth = 0;
    let oldHeight = 0;

    this.callbackFunc = null;

    this.preload = function () {
        oldWidth = width;
        oldHeight = height;
        self.font = loadFont("assets/fonts/CabinSketch-Regular.ttf");
    };

    //this.isBlockingMode = false;

    this.onDraw = function () {
        if (self.currentText == null) return;

        fill(0, 0, 0, 150);
        rect(0, 0, width, height - height / 4);

        fill(69, 123, 157);
        rect(0, height - height / 4, width, height / 4);

        fill(255);
        textSize(width/30);
        textAlign(LEFT);
        textLeading(70);

        textFont(self.font);
        text(self.currentText, gSpriteManager.player.width + 20, height - height / 4.5,
            width/1.5, height / 7);
        drawSprite(gSpriteManager.player);
        gSpriteManager.player.position.x = width/10;
        gSpriteManager.player.position.y = height/1.2;
        gSpriteManager.player.scale =  this.charYToScale(width, height, gSpriteManager.player.position.y);

    };

    this.charYToScale = function (width, height, y) {
        let s = width * 0.0005;
        //return map(y, height * 0.5, height * 0.8, s * 0.6, s);
        return map(y, height * 0.5, height * 0.8, s * 0.35, s);
    }

    this.setDialog = function (text, callbackFunc = null) {
        self.currentText = text
        self.callbackFunc = callbackFunc;

        if( self.callbackFunc ) {
            self.createButton();
        }
    };


    this.load = function (jsonFile, callbackFunc = null) {

        self.callbackFunc = callbackFunc;
        //console.log('DialogManager load cb' + self.callbackFunc );

        //load the json file
        loadJSON( jsonFile, function (json) {

            let len = json.text['length'];

            if (len <= 0) {
                console.log('load length 0');
                self.close();
                return;
            }

            self.json = json;
            self.currentIndex = 0;
            self.currentText = self.json.text[0];
            self.createButton();

        });

    };

    this.createButton = function() {
        self.button = createButton('Next');
        self.button.size(100, 50);
        self.button.class('dialogButton');
        self.button.mousePressed(self.next);

        let width = gSceneManager.width;
        let height = gSceneManager.height;
        self.onWindowResized(width, height);
    }

    this.next = function () {
        self.currentIndex++;
        
        if( self.json == null ) {
            self.close();
            return;
        }

        let len = self.json.text['length'];
        if (self.currentIndex >= len) {
            self.close();
        } else {
            self.currentText = self.json.text[self.currentIndex];
        }

    };

    this.close = function () {

        self.json = null;
        self.currentIndex = 0;
        //self.isBlockingMode = false;
        self.currentText = null;

        if (self.button) {
            self.button.remove();
            self.button = null;
        }

        if (self.callbackFunc) {
            let cb = self.callbackFunc;
            self.callbackFunc = null;
            cb();
        }

    };

    this.onWindowResized = function (w, h) {

        if (self.button) {
            self.button.position(width - 120, height - 70);
        }
        gSpriteManager.player.position.x = (gSpriteManager.player.position.x / self.oldWidth) * w;
        gSpriteManager.player.position.y = (gSpriteManager.player.position.y / self.oldHeight) * h;
        gSpriteManager.player.scale =  this.charYToScale(w, h, gSpriteManager.player.position.y);

        self.oldWidth = w;
        self.oldHeight = h;
    };
}