function StageEnd() {
    let self = this;


    this.onEnter = function () {

        gSceneManager.loadTown();
        gDialogManager.setDialog( "~Thank you for playing~", self.onDialogDone );

        //gPlayerManager.
        /*
        this.mc1 = [];
        this.mc2 = [];
        this.mc3 = [];
        this.mc4 = [];
        this.mc5 = [];
        this.mc6 = [];
        */

    }

    this.onExit = function () {
    }

    this.onDraw = function (w,h) {

    }

    
    this.onDialogDone = function () {
        gStageManager.changeStage( new StageStart() );
    }
}