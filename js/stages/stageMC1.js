function StageMC1() {
    let self = this;

    this.onEnter = function () {
        
        gDialogManager.loadDialog( 'assets/gameData/MC1_PreDialog.json', self.onPreDialogDone );
    }

    this.onExit = function () {

        
    }

    this.onDraw = function () {

    }


    this.onPreDialogDone = function () {
        log("nPreDialogDone");
    }

}