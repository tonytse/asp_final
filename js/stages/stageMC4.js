function StageMC4() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gDialogManager.load('MC4_PreDialog.json', self.onPreDialogDone);
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
        gMultipleChoice.open('MC4_QnA.json', self.gotoMC5, self.wrongAnswer);
    }
}