function StageSummary1() {
    let self = this;

    this.onEnter = function () {

        gSceneManager.loadTown();
        gDialogManager.setDialog( "Summary1", self.onDialogDone );

    }

    this.onExit = function () {
    }

    this.onDraw = function (w,h) {

    }

    
    this.onDialogDone = function () {
        gStageManager.changeStage( new StageMC4() );
    }
}