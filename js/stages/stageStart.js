


function StageStart() {
    let self = this;
    let button = null;

    this.onEnter = function () {
        gSceneManager.loadTown();

        self.button = createButton('Start');
        self.button.size(200, 100);
        self.button.class('startButton');
        self.button.mousePressed(self.gotoMC1);
        self.onWindowResized(width, height);
    }

    this.onExit = function () {
        gPlayerManager.isVirusBarVisible = true;
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
        text("Let's Flight COVID", 0, 70, w, 300);
    }

    this.gotoMC1 = function () {
        gStageManager.changeStage(new StageMC1());
    }

    this.onWindowResized = function (w, h) {

        if (self.button) {
            self.button.position((width - 200) / 2, height / 2 + 100);
        }
    };

}