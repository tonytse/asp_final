function StageMC5() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gDialogManager.load( 'MC5_PreDialog.json', self.onPreDialogDone );
    }
    this.onExit = function () {

    }

    this.onDraw = function (w,h) {

    }

    this.gotoGameB = function () {
        gStageManager.changeStage( new StageGameB(1) );
    }

    this.wrongAnswer = function ( ans ) {        
	    gPlayerManager.virusLevel +=5;
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open( 'MC5_QnA.json', self.gotoGameB, self.wrongAnswer );
    }
}