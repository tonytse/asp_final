function StageSummary2() {
    let self = this;

    this.onEnter = function () {

        gSceneManager.loadTown();
        gDialogManager.setDialog( "Summary2", self.onDialogDone );

    }

    this.onExit = function () {
        
    }

    this.onDraw = function (w,h) {

    }

    
    this.onDialogDone = function () {
        gStageManager.changeStage( new StageEnd() );
    }
}