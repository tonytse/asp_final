function StageGameA() {
    let self = this;
    let imgLeftHand = null;
    let imgRightHand = null;

    let dLeftHandX = 0;
    let dLeftHandY = 0;

    let dRightHandX = 0;
    let dRightHandY = 0;

    this.onEnter = function () {
        gSceneManager.loadBathroom();

        // https://dlpng.com/png/6583488
        self.imgLeftHand = loadImage('assets/gameA/leftHand.png');
        self.imgRightHand = loadImage('assets/gameA/rightHand.png' );

    };

    this.onExit = function () {

    };

    this.onDraw = function (w,h) {


        //water 


        //bubble


        //Left right hand
        let x = w /2;
        let y = h - self.imgLeftHand.height;
        image(self.imgLeftHand, x-100 + dLeftHandX, y + dLeftHandY );
        image(self.imgRightHand , x+100+ dRightHandX, y  + dRightHandY);


        if( keyDown('n') )
        {
            gStageManager.changeStage( new StageMC3() );
        }

    };
}