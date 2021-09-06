function StageMC6() {
    let self = this;
    let stageId = 6;

    this.onEnter = function () {
        gSceneManager.loadSupermarket();
        gDialogManager.load(gGameDataManager.getPreDialogJson(stageId), self.onPreDialogDone);
    }

    this.onExit = function () {
        // onExit function
    }

    this.onDraw = function (w, h) {
        // onDraw function
    }

    this.gotoGameB = function (stopwatch) {
        if (stopwatch < 10000) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageGameB(2));
    }

    this.wrongAnswer = function (ans) {
        //! Add wrong answer record to gPlayerManager
        gPlayerManager.wrongMCAnswer(stageId, ans);
    }

    this.onPreDialogDone = function () {
        //! Shoe PreDialog Message
        gMultipleChoice.open(gGameDataManager.getMCJson(stageId), self.gotoGameB, self.wrongAnswer);
    }
}