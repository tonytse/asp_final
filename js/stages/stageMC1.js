function StageMC1() {
    let self = this;

    this.onEnter = function () {
        gSceneManager.loadHome();
        gDialogManager.loadDialog( 'assets/gameData/MC1_PreDialog.json', self.onPreDialogDone );
    }

    this.onExit = function () {

        
    }

    this.onDraw = function (w,h) {

    }


    this.onPreDialogDone = function () {
        console.log("Start MC1");

        gStageManager.changeStage( new StageGameA() );
    }

}