function StageMC3() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadHome();
        gDialogManager.load( 'MC3_PreDialog.json', self.onPreDialogDone );
    }
    this.onExit = function () {

    }

    this.onDraw = function (w,h) {

    }

    this.gotoSummary1= function () {
        gStageManager.changeStage( new StageSummary1() );
    }

    this.wrongAnswer = function ( ans ) {        
	    gPlayerManager.virusLevel +=5;
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open( 'MC3_QnA.json', self.gotoSummary1, self.wrongAnswer );
    }
}