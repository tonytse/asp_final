function StageMC1() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadHome();
        gDialogManager.load( 'MC1_PreDialog.json', self.onPreDialogDone );
    }
    this.onExit = function () {

    }

    this.onDraw = function (w,h) {

    }

    this.gotoMC2 = function ( stopwatch ) {
        if( stopwatch < 10000 ) {
            gPlayerManager.score += 10000 - stopwatch;
        }
        gStageManager.changeStage( new StageMC2() );
    }

    this.wrongAnswer = function ( ans ) {        
	    gPlayerManager.virusLevel +=5;
        gPlayerManager.mc1.push( parseInt(ans) ); 
    }

    this.onPreDialogDone = function () {
        gMultipleChoice.open( 'MC1_QnA.json', self.gotoMC2, self.wrongAnswer );
    }
}