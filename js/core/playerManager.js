function PlayerManager() {
    let self = this;

    this.virusLevel;
    this.imgVirusIcon;
    this.isVisible;
    this.isVirusBarVisible;
    this.score;
    this.isCompleted;
    
    this.mcWrongAns;
    
    this.reset = function() {
        self.virusLevel = 50;
        self.imgVirusIcon;
        self.isVisible = false;
        self.isVirusBarVisible = false;
        self.score = 0;
        self.isCompleted = false;
        self.mcWrongAns = [];
    }

    this.wrongMCAnswer = function( mc, ans ) {
        gPlayerManager.virusLevel += 5;
        //console.log( 'MC ' + mc + ': ' + ans );
        //mc1.push(parseInt(ans));
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
            rect(150, 25, self.virusLevel / 100 * barW, 35);
        }
    }

    this.onDraw = function () {
        if (self.isVisible) {
            drawSprite(gSpriteManager.player);
        }
    }

    this.reset();
}