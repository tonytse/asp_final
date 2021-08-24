function StageMC2() {
    let self = this;
    let stageId = 2;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gDialogManager.load(gGameDataManager.getPreDialogJson(stageId), self.onPreDialogDone);
    }
    this.onExit = function () {
        // onExit function
    }

    this.onDraw = function (w, h) {
        // onDraw function
    }

    this.gotoGameA = function (stopwatch) {
        if (stopwatch < 10000) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageGameA());
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.wrongMCAnswer(stageId, ans);
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open(gGameDataManager.getMCJson(stageId), self.gotoGameA, self.wrongAnswer);
    }
}