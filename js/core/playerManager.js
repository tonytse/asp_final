function PlayerManager() {
    let self = this;

    this.virusLevel = 50;
    this.imgVirusIcon;

    this.preload = function () {
        //Image by Eduardo RS from Pixabay
        self.imgVirusIcon = loadImage('assets/virus_icon.png')
    }

    this.onDrawVirusBar = function () {

        image(self.imgVirusIcon, 10, 0);
        image(self.imgVirusIcon, 55, -35);

        let barW = windowWidth - 150 - 50;
        stroke('black');
        strokeWeight(4);
        noFill();
        rect(150, 25, barW, 30);

        fill(0, 130, 120, 150);
        noStroke();
        rect(150, 25, self.virusLevel / 100 * barW, 35);
    }

    this.onDraw = function () {
        drawSprite( gSpriteManager.player );
    }


}