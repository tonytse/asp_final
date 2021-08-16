function StageMC3() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadHome();
        gDialogManager.load('MC3_PreDialog.json', self.onPreDialogDone);
    }
    this.onExit = function () {

    }

    this.onDraw = function (w, h) {

    }

    this.gotoMC4 = function (stopwatch) {
        if( stopwatch < 10000 ) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage(new StageMC4());
    }

    this.wrongAnswer = function (ans) {
        gPlayerManager.virusLevel += 5;
        gPlayerManager.mc3.push(parseInt(ans));
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open('MC3_QnA.json', self.gotoMC4, self.wrongAnswer);
    }
}