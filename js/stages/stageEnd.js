function StageEnd() {
    let self = this;


    this.onEnter = function () {

        gSceneManager.loadTown();
        gDialogManager.setDialog( "~END~", self.onDialogDone );

    }

    this.onExit = function () {
    }

    this.onDraw = function (w,h) {

    }

    
    this.onDialogDone = function () {
        gStageManager.changeStage( new StageStart() );
    }
}