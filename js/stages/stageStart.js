


function StageStart() {
    let self = this;



    this.onEnter = function () {
        //print('StageStart onEnter');
    }

    this.onExit = function () {
        //print('StageStart onExit');
    }

    this.onDraw = function () {

        //print('onDraw');
        let d = deltaTime * 0.2;

        if( gInputManager.isUp ) gSpriteManager.player.position.y -= d;
        if( gInputManager.isDown ) gSpriteManager.player.position.y += d;
        if( gInputManager.isLeft ) gSpriteManager.player.position.x-= d;
        if( gInputManager.isRight ) gSpriteManager.player.position.x += d;


        let anyAction = false;

        if( gInputManager.isUp || gInputManager.isDown ) {
            gSpriteManager.player.changeAnimation('Walk');
            anyAction = true;
        }

        if( gInputManager.isLeft ) {
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(-1);
            anyAction = true;
        }   

        if( gInputManager.isRight ) {
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(1);
            anyAction = true;
        }   

        if( !anyAction ) {
            gSpriteManager.player.changeAnimation('Idle');
        }



        //animation( gSpriteManager.player_stand_animation, self.posX, self.posY );

        //ellipse(width / 2, height / 2, 50, 50);
        fill(200);
        textAlign(CENTER);
        text('Stage Start', width/2, 100);
        //print('w ' + width);

    }

    

}