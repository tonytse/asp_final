function StageMC4() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gDialogManager.load(gGameDataManager.getPreDialogJson(4), self.onPreDialogDone);
    }

    this.onExit = function () {

    }

    this.onDraw = function (w, h) {

    }

    this.gotoMC5 = function (stopwatch) {
        if( stopwatch < 10000 ) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageMC5());
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.virusLevel += 5;
        gPlayerManager.mc4.push(parseInt(ans));
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open(gGameDataManager.getMCJson(4), self.gotoMC5, self.wrongAnswer);
    }
}