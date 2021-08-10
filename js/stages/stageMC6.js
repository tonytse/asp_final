function StageMC6() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadSupermarket();
        gDialogManager.load('MC6_PreDialog.json', self.onPreDialogDone);
    }
    this.onExit = function () {

    }

    this.onDraw = function (w, h) {

    }

    this.gotoGameB = function (stopwatch) {
        if (stopwatch < 10000) {
            gPlayerManager.score + 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageGameB(2));
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.virusLevel += 5;
        gPlayerManager.mc6.push(parseInt(ans));
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open('MC6_QnA.json', self.gotoGameB, self.wrongAnswer);
    }
}