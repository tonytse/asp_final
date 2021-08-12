function StageGameB(level) {
    let self = this;
    let currentLevel;

    this.onEnter = function () {
        gSceneManager.loadGameB();
        gSpriteManager.player.position.y = windowHeight / 1.31;
        gSpriteManager.player.position.x = 500;

        gSpriteManager.redBoy.position.y = windowHeight / 1.3;
        gSpriteManager.redBoy.position.x = 150;

        gSpriteManager.cowBoy.position.y = windowHeight / 1.32;
        gSpriteManager.cowBoy.position.x = 800;

        gSpriteManager.cowGirl.position.y = windowHeight / 1.32;
        gSpriteManager.cowGirl.position.x = 1150;

        gSpriteManager.girl.position.y = windowHeight / 1.3;
        gSpriteManager.girl.position.x = -100
    }

    this.onExit = function () {
    }


    this.onDraw = function (w, h) {

        if (keyDown('n')) {
            console.log(self.currentLevel);

            if (self.currentLevel == 1) {
                gStageManager.changeStage(new StageMC6());
            } else {
                gStageManager.changeStage(new StageSummary2());
            }
        }

        drawSprite(gSpriteManager.redBoy);
        drawSprite(gSpriteManager.cowBoy);
        drawSprite(gSpriteManager.cowGirl);
        //drawSprite(gSpriteManager.girl);
        drawSprite(gSpriteManager.player);

        //print('onDraw');

        let d = deltaTime * 0.2;

        if (gInputManager.isUp) gSpriteManager.player.position.y -= d;
        if (gInputManager.isDown) gSpriteManager.player.position.y += d;
        if (gInputManager.isLeft) gSpriteManager.player.position.x -= d;
        if (gInputManager.isRight) gSpriteManager.player.position.x += d;


        let anyAction = false;

        if (gInputManager.isUp || gInputManager.isDown) {
            gSpriteManager.player.changeAnimation('Walk');
            anyAction = true;
        }

        if (gInputManager.isLeft) {
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(-1);
            anyAction = true;
        }

        if (gInputManager.isRight) {
            gSceneManager.offsetX += d;
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(1);
            anyAction = true;
        }

        if (!anyAction) {
            gSpriteManager.player.changeAnimation('Idle');
        }

        //animation( gSpriteManager.player_stand_animation, self.posX, self.posY );

        //ellipse(width / 2, height / 2, 50, 50);
        fill(200);
        textAlign(CENTER);
        text('Stage Start', width / 2, 100);
        //print('w ' + width);


    }
    self.currentLevel = level;
}



