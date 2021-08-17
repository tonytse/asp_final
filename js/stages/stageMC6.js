function StageMC6() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadSupermarket();
        gDialogManager.load(gGameDataManager.getPreDialogJson(6), self.onPreDialogDone);
    }
    this.onExit = function () {

    }

    this.onDraw = function (w, h) {

    }

    this.gotoGameB = function (stopwatch) {
        if (stopwatch < 10000) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageGameB(2));
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.virusLevel += 5;
        gPlayerManager.mc6.push(parseInt(ans));
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open(gGameDataManager.getMCJson(6), self.gotoGameB, self.wrongAnswer);
    }
}