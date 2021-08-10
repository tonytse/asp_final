function StageMC2() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gDialogManager.load('MC2_PreDialog.json', self.onPreDialogDone);
    }
    this.onExit = function () {

    }

    this.onDraw = function (w, h) {

    }

    this.gotoGameA = function (stopwatch) {
        if (stopwatch < 10000) {
            gPlayerManager.score + 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageGameA());
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.virusLevel += 5;
        gPlayerManager.mc2.push(parseInt(ans));
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open('MC2_QnA.json', self.gotoGameA, self.wrongAnswer);
    }
}