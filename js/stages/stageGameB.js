function StageGameB(level) {

    let self = this;
    let currentLevel;
    let leftEdge = 14;
    let rightEdge = 1.1;
    let oldWidth = null;
    let oldHeight = null;
    let characters = [];
    let d = deltaTime * 0.2;
    let endGame = false;
    let anyAction = false;
    let winFont = loadFont("assets/fonts/rampart_one.ttf");
    let warningFont = loadFont("assets/fonts/frijole_regular.ttf");

    this.onEnter = function () {
        gSceneManager.loadGameB();
        self.oldWidth = width;
        self.oldHeight = height;

        characters = [
            { name: gSpriteManager.redBoy, direction: false },
            { name: gSpriteManager.cowBoy, direction: false },
            { name: gSpriteManager.cowGirl, direction: false },
            { name: gSpriteManager.girl, direction: false },
            { name: gSpriteManager.player, direction: false },
        ];

        for (let i = 0; i < characters.length; ++i) {
            characters[i].name.position.y = height / 1.3;
            characters[i].name.scale = width * 0.0005;
        }

        gSpriteManager.player.position.x = width / 5;
        gSpriteManager.redBoy.position.x = width / 1.5;
        gSpriteManager.cowBoy.position.x = width * 1;
        gSpriteManager.cowGirl.position.x = width * 1.4;
        gSpriteManager.girl.position.x = width * 1.8;
    }

    this.onExit = function () {
        characters = [];
    }

    this.onDraw = function (w, h) {
        anyAction = false;
        self.d = deltaTime * 0.2
        if (keyDown('n')) {
            if (self.currentLevel == 1) {
                gStageManager.changeStage(new StageMC6());
            } else {
                gPlayerManager.isCompleted = true;
                gStageManager.changeStage(new StageEnd());
            }
        }

        characters.sort(function (a, b) {
            return a.name.scale - b.name.scale;
        });

        for (let i = 0; i < characters.length; ++i) {
            drawSprite(characters[i].name);
            this.moveNPC(characters[i], 0.3 * i);
            this.showWarning(characters[i]);
        }

        this.manageInputs();
        this.characterAnimations();
        this.finishLevel();
        fill(0,0,0,100);
    }

    this.moveNPC = function (character, speed) {
        self.d = deltaTime * 0.2

        if (character.name.position.y < height / 2) {
            character.direction = false;
        }
        if (character.name.position.y > height / 1.2) {
            character.direction = true;
        }
        if (character.direction == false && character.name != gSpriteManager.player && endGame == false) {
            character.name.position.y += self.d * speed;
            character.name.scale += ((character.name.scale / width) * 15) * speed;
            character.name.changeAnimation('Walk');
            character.name.mirrorX(-1);
        }
        if (character.direction == true && character.name != gSpriteManager.player && endGame == false) {
            character.name.position.y -= self.d * speed;
            character.name.scale -= ((character.name.scale / width) * 15) * speed;
            character.name.changeAnimation('Walk');
            character.name.mirrorX(-1);
        }

    }
    this.showWarning = function (character) {
        if (
            character.name != gSpriteManager.player &&
            dist(gSpriteManager.player.position.x, gSpriteManager.player.position.y, character.name.position.x, character.name.position.y) < 300*gSpriteManager.player.scale) {
            fill(255, 214, 10);
            rectMode(CENTER);
            noStroke();
            rect(width / 2, height / 1.13, width / 1.5, height / 6, 5);
            textAlign(CENTER);
            textSize(width / 25);
            textFont(warningFont);
            fill(217, 4, 41);
            text("WARNING!! \nMAINTAIN DISTANCE!!", width / 2, height / 1.15);
        }
    }

    this.characterAnimations = function () {
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
                gSceneManager.offsetX += self.d;
                for (let i = 0; i < characters.length; ++i) {
                    if (characters[i].name != gSpriteManager.player) {
                        characters[i].name.position.x -= self.d;
                    }
                }
            }
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(1);
            anyAction = true;
        }

        if (!anyAction) {
            gSpriteManager.player.changeAnimation('Idle');
        }
    }
    this.manageInputs = function () {
        if (gInputManager.isUp && gSpriteManager.player.position.y > width / 2.65 && endGame == false) {
            gSpriteManager.player.position.y -= self.d;
            gSpriteManager.player.scale -= (gSpriteManager.player.scale / width) * 15;

            leftEdge += 0.15;
            if (rightEdge > 1.05) {
                rightEdge -= 0.008;
            }
        };
        if (gInputManager.isDown && gSpriteManager.player.position.y < height / 1.25 && endGame == false) {
            gSpriteManager.player.position.y += self.d;
            gSpriteManager.player.scale += (gSpriteManager.player.scale / width) * 15;
            leftEdge -= 0.15;
            if (rightEdge < 1.1) {
                rightEdge += 0.008;
            }
        };
        if (gInputManager.isLeft && gSpriteManager.player.position.x > width / leftEdge && endGame == false) {

            gSpriteManager.player.position.x -= self.d;

        }
        if (gInputManager.isRight && gSpriteManager.player.position.x < width / rightEdge && endGame == false) {
            if (gSceneManager.offsetX > 1100) {
                gSpriteManager.player.position.x += self.d
            }
        };
    }
    this.finishLevel = function(){
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
    }

    this.onWindowResized = function (w, h) {

        for (let i = 0; i < characters.length; ++i) {
            characters[i].name.scale = w * 0.0005;
            characters[i].name.position.x = (characters[i].name.position.x / self.oldWidth) * w;
            characters[i].name.position.y = (characters[i].name.position.y / self.oldHeight) * h;
        }


        self.oldWidth = w;
        self.oldHeight = h;
    }

    self.currentLevel = level;

}



