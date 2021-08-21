function StageGameB(level) {

    let self = this;
    let currentLevel;
    let leftEdge = 14;
    let rightEdge = 1.1;
    let oldWidth = null;
    let oldHeight = null;
    let characters = [];
    let endGame = false;
    let font = loadFont("assets/fonts/rampart_one.ttf");


    this.onEnter = function () {

        gSceneManager.loadGameB();

        self.oldWidth = width;
        self.oldHeight = height;

        characters = [gSpriteManager.redBoy, gSpriteManager.cowBoy, gSpriteManager.cowGirl, gSpriteManager.girl, gSpriteManager.player];

        for (let i = 0; i < characters.length; ++i) {
            characters[i].position.y = height / 1.3;
            characters[i].scale = width * 0.0005;
        }

        gSpriteManager.player.position.x = width / 2;
        gSpriteManager.redBoy.position.x = width / 20;
        gSpriteManager.cowBoy.position.x = width / 4;
        gSpriteManager.cowGirl.position.x = width / 1.5;
        gSpriteManager.girl.position.x = width / 1.2;

    }

    this.onExit = function () {
        characters = [];
    }

    this.onDraw = function (w, h) {
        if (keyDown('n')) {

            if (self.currentLevel == 1) {
                gStageManager.changeStage(new StageMC6());
            } else {
                gPlayerManager.isCompleted = true;
                gStageManager.changeStage(new StageEnd());
            }
        }

        characters.sort(function (a, b) {
            return a.scale - b.scale;
        });
        //gSceneManager.offsetX

        //print('onDraw');

        let d = deltaTime * 0.2;

        for (let i = 0; i < characters.length; ++i) {
            //drawSprite(characters[i]);
        }
        drawSprite(gSpriteManager.player);

        if (gInputManager.isUp && gSpriteManager.player.position.y > width / 2.65 && endGame == false) {
            gSpriteManager.player.position.y -= d;
            gSpriteManager.player.scale -= (gSpriteManager.player.scale / width) * 15;

            leftEdge += 0.15;
            if (rightEdge > 1.05) {
                rightEdge -= 0.008;
            }
        };
        if (gInputManager.isDown && gSpriteManager.player.position.y < height / 1.25 && endGame == false) {
            gSpriteManager.player.position.y += d;
            gSpriteManager.player.scale += (gSpriteManager.player.scale / width) * 15;
            leftEdge -= 0.15;
            if (rightEdge < 1.1) {
                rightEdge += 0.008;
            }
        };
        if (gInputManager.isLeft && gSpriteManager.player.position.x > width / leftEdge && endGame == false) {

            gSpriteManager.player.position.x -= d;

        }
        if (gInputManager.isRight && gSpriteManager.player.position.x < width / rightEdge && endGame == false) {
            gSpriteManager.player.position.x += d
        };


        let anyAction = false;

        if (gInputManager.isUp || gInputManager.isDown && endGame == false) {
            gSpriteManager.player.changeAnimation('Walk');
            anyAction = true;
        }

        if (gInputManager.isLeft && endGame == false) {
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(-1);
            anyAction = true;
        }

        if (gInputManager.isRight && endGame == false) {
            // TODO: Provide a limit for scene
            // TODO: Warning 
            if (gSceneManager.offsetX < gSceneManager.background.width / 2) {
                gSceneManager.offsetX += d;
            }


            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(1);
            anyAction = true;
        }

        if (!anyAction) {
            gSpriteManager.player.changeAnimation('Idle');
        }

        if (
            gSceneManager.offsetX > 1100 && gSpriteManager.player.position.x > width / 1.33
        ) {

            if (gSpriteManager.player.position.y < height / 1.75) {

                anyAction = false;
                endGame = true;
                fill(0, 0, 0, 150);
                rect(0, 0, width, height);
                fill(255, 200, 100);
                noStroke();
                rect(width / 3, height / 4, width / 3, height / 2, 10);
                fill(100, 150, 200);
                // textFont(font);
                // textSize(100);
                // textAlign(CENTER);
                // text("You Win !!", width / 2, height / 3);
                // console.log("Working");
            }
        }


        //animation(gSpriteManager.player_stand_animation, self.posX, self.posY);

        // //ellipse(width / 2, height / 2, 50, 50);
        // fill(200);
        // textAlign(CENTER);
        // text('Stage Start', width / 2, 100);
        // //print('w ' + width);


    }

    this.moveNPC = function (character, x, y) {
    }

    this.onWindowResized = function (w, h) {

        for (let i = 0; i < characters.length; ++i) {
            characters[i].scale = w * 0.0005;
            characters[i].position.x = (characters[i].position.x / self.oldWidth) * w;
            characters[i].position.y = (characters[i].position.y / self.oldHeight) * h;
        }


        self.oldWidth = w;
        self.oldHeight = h;
    }

    self.currentLevel = level;

}



