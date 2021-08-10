function PlayerManager() {
    let self = this;

    this.virusLevel = 50;
    this.imgVirusIcon;
    this.isVisible = false;
    this.isVirusBarVisible = false;

    this.mc1 = [];
    this.mc2 = [];
    this.mc3 = [];
    this.mc4 = [];
    this.mc5 = [];
    this.mc6 = [];


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


}