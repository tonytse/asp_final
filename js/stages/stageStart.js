


function StageStart() {
    let self = this;
    let button = null;

    this.onEnter = function () {
        gSceneManager.loadTown();

        //! Create start button 
        self.button = createButton('Start');
        self.button.size(200, 100);
        self.button.class('startButton');
        self.button.mousePressed(self.gotoMC1);

        //! Start button position
        self.onWindowResized(width, height);
    }

    this.onExit = function () {
        //! Reset player and ready for the game
        gPlayerManager.reset();
        gPlayerManager.isVirusBarVisible = true;

        //! Remove button DOM
        if (self.button) {
            self.button.remove();
            self.button = null;
        }
    }

    this.onDraw = function (w, h) {

        fill(255);
        textSize(72);
        textAlign(CENTER);

        textFont(gDialogManager.font);
        text("Let's Fight COVID", 0, 70, w, 300);
    }

    this.gotoMC1 = function () {
        gAudioManager.playCorrect();
        gStageManager.changeStage(new StageMC1());
    }

    this.onWindowResized = function (w, h) {
        //! Button position
        if (self.button) {
            self.button.position((w - 200) / 2, h / 2 + 100);
        }
    };

}