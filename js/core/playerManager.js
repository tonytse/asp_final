function PlayerManager() {
    let self = this;

    //! Virus 
    this.imgVirusIcon = null;
    this.virusLevel = 50;
    this.isVisible = false;
    this.isVirusBarVisible = false;

    //! Score
    this.score = 0;

    //! Game Status
    this.isCompleted = false;
    this.gameBLevel1Retry = false;
    this.gameBLevel2Retry = false;
    this.gameAWashedTime = 0;

    this.mcWrongAns = [];

    this.reset = function () {
        self.virusLevel = 50;
        self.isVisible = false;
        self.isVirusBarVisible = false;
        self.score = 0;
        self.isCompleted = false;
        self.mcWrongAns = [];
        self.gameBLevel1Retry = false;
        self.gameBLevel2Retry = false;
    }

    //! Hanlde wrong MC answer
    this.wrongMCAnswer = function (mc, ans) {
        gPlayerManager.virusLevel += 5;
        var obj = new Object();
        obj.mc = parseInt(mc);
        obj.ans = parseInt(ans);
        self.mcWrongAns.push(obj);
    }

    this.preload = function () {
        //Image by Eduardo RS from Pixabay
        self.imgVirusIcon = loadImage('assets/virus_icon.png')
    }

    this.onDrawVirusBar = function () {
        
        if (self.isVirusBarVisible) {
            image(self.imgVirusIcon, 10, 0);
            image(self.imgVirusIcon, 55, -35);

            let barW = width - 150 - 50;
            stroke('black');
            strokeWeight(4);
            noFill();
            rect(150, 25, barW, 30);

            fill(0, 130, 120, 150);
            noStroke();
            rect(150, 25, self.virusLevel / 100 * barW, 30);
        }
    }

    this.onDraw = function () {
        if (self.isVisible) {
            drawSprite(gSpriteManager.player);
        }
    }

    this.reset();
}