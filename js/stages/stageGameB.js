function StageGameB(level) {

    let self = this;

    let leftEdge = 14;
    let rightEdge = 1.1;

    let oldWidth = null;
    let oldHeight = null;

    let helpPressed = false;

    let characters = [];
    let endGame = false;

    let finishLevelFont = loadFont("assets/fonts/sigmar_one.ttf");
    let warningFont = loadFont("assets/fonts/frijole_regular.ttf");
    let arrowKeys = loadImage("assets/gameB/arrow_keys.png");
    let tryAgainButton = createButton('Try Again');
    let goNextButton = createButton('Go Next');
    let helpButton = createButton('TIPS');
    let timer = new StopWatch();

    let touchControls = {right: false, left: false, up: true, down:true};

    this.currentLevel = level;

    this.onEnter = function () {
        gPlayerManager.isVirusBarVisible = true;
        gSceneManager.loadGameB(self.currentLevel);

        self.oldWidth = width;
        self.oldHeight = height;

        helpButton.class("helpButton");
        helpButton.position( width -115, 55 +10);
        characters = [
            { name: gSpriteManager.maskPlayer, direction: false, speed: 1 * this.currentLevel },
            { name: gSpriteManager.redBoy, direction: false, speed: 1 * this.currentLevel },
            { name: gSpriteManager.cowBoy, direction: false, speed: 1.1 * this.currentLevel },
            { name: gSpriteManager.cowGirl, direction: false, speed: 1.2 * this.currentLevel },
            { name: gSpriteManager.girl, direction: false, speed: 1.3 * this.currentLevel },
        ];

        this.reset();

        if (self.currentLevel == 2) {
            gSceneManager.offsetX = gSceneManager.background.width / 2;
            gSceneManager.offsetX = 1280;
        }
    }

    this.onExit = function () {
        characters = [];
        tryAgainButton.hide();
        goNextButton.hide();
        helpButton.hide();
    }

    this.onDraw = function (w, h) {
        let d = deltaTime * 0.2;

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


        this.manageInputs(d);
        this.maskPlayerAnimations(d);

        let showWarning = false;
        for (let i = 0; i < characters.length; ++i) {

            if (characters[i].name != gSpriteManager.maskPlayer) {
                if (this.currentLevel == 1) {
                    this.moveNPC(d, characters[i]);
                } else {
                    characters[i].name.changeAnimation('Idle');
                }
                if (!showWarning) showWarning = this.isShowWarning(characters[i]);
            }
            drawSprite(characters[i].name);
        }

        if (showWarning && !endGame) {
            push();
            fill(255, 214, 10);
            rectMode(CENTER);
            noStroke();
            rect(width / 2, height / 1.13, width / 1.5, height / 6, 5);
            textAlign(CENTER);
            textSize(width / 25);
            textFont(warningFont);
            fill(217, 4, 41);
            text("WARNING!! \nMAINTAIN DISTANCE!!", width / 2, height / 1.15);
            pop();
            //change below to 0.1 before production
            if (self.currentLevel == 1) {
                gPlayerManager.virusLevel += 0.1;
            } else {
                gPlayerManager.virusLevel += 0.3;
            }
        }

        if (!endGame) {
            gInputManager.onDraw(w, h);
        }
        helpButton.mousePressed(this.help);

        if(helpPressed == true){
            push();
            fill(0,0,0,100);
            rect(0,0, width,height);
            fill(255);
            textStyle(BOLD);
            textSize(width/70);
            textAlign(CENTER);
            rectMode(CENTER);

            text("USE TOUCH CONTROLS OR USE ARROW KEYS", width/2, height/2, width/6);

            let touchText = "Touch left half of the screen to go left";
            text(touchText.toUpperCase(), width/2-width/4 ,height/2, width/4);
            touchText = "Touch right half of the screen to go right";
            text(touchText.toUpperCase(), width/2+width/4,height/2, width/4);
            touchText = "Touch upper half of the screen to go up";
            text(touchText.toUpperCase(), width/2,height/2-height/4, width/2);
            touchText = "Touch lower half of the screen to go down";
            text(touchText.toUpperCase(), width/2,height/2+height/4, width/2);

            textStyle(NORMAL);
            fill(255);
            textAlign(CENTER);
            textSize(width / 50);
            textFont(warningFont);
            if (this.currentLevel == 1) {
                text("Keep a safe distance and go to the supermarket ---->", width * 0.5, 150);
            }else {
                text("<--- Keep a safe distance and go back home", width * 0.5, 150);
            }
            pop();
        }
        this.touchTracking();
        this.finishLevel();

    }

    this.tryAgain = function () {

        gPlayerManager.virusLevel = 50;
        gPlayerManager.isVirusBarVisible = true;


        if (self.currentLevel == 1) {
            gPlayerManager.gameBLevel1Retry = true;
        } else {
            gPlayerManager.gameBLevel2Retry = true;
        }

        endGame = false;
        self.reset();

    }

    this.reset = function () {
        endGame = false;
        helpButton.show();
        if (self.currentLevel == 1) {
            gSpriteManager.maskPlayer.position.x = width / 5;
            gSpriteManager.redBoy.position.x = width / 1.5;
            gSpriteManager.cowBoy.position.x = width * 1;
            gSpriteManager.cowGirl.position.x = width * 1.4;
            gSpriteManager.girl.position.x = width * 1.8;
        } else {
            gSpriteManager.maskPlayer.position.x = width / 1.2;

            gSpriteManager.redBoy.position.x = width / 5;
            gSpriteManager.redBoy.position.y = height / 1.8;

            gSpriteManager.cowBoy.position.x = width - (width * 1);
            gSpriteManager.cowBoy.position.y = height / 1.25;

            gSpriteManager.cowGirl.position.x = width - (width * 1.4);
            gSpriteManager.cowGirl.position.y = height / 1.75;

            gSpriteManager.girl.position.x = width - (width * 1.6);
            gSpriteManager.girl.position.y = height / 1.25;
        }

        for (let i = 0; i < characters.length; ++i) {
            if (self.currentLevel == 1 || gSpriteManager.maskPlayer == characters[i].name) {
                characters[i].name.position.y = height * 0.65;
            }
            characters[i].name.scale = self.charYToScale(width, height, characters[i].name.position.y);
            characters[i].name.changeAnimation('Walk');
            if (characters[i].name !== gSpriteManager.maskPlayer) {
                if (self.currentLevel == 1) {
                    characters[i].name.mirrorX(-1);
                } else {
                    characters[i].name.mirrorX(1);
                }
            } else {
                if (self.currentLevel == 1) {
                    characters[i].name.mirrorX(1);
                } else {
                    characters[i].name.mirrorX(-1);
                }
            }
        }
        if (self.currentLevel == 1) {
            gSceneManager.offsetX = 0;
        } else {
            gSceneManager.offsetX = 1280;
        }
        tryAgainButton.hide();
        goNextButton.hide();

        timer.start();
    }

    this.moveNPC = function (d, character) {

        if (endGame == true) return;

        if (character.direction == false) {
            character.name.position.y += d * character.speed;
        } else {
            character.name.position.y -= d * character.speed;
        }
        character.name.scale = this.charYToScale(width, height, character.name.position.y);

        if (character.direction && character.name.position.y < height * 0.5) {
            character.direction = false;
        }

        if (!character.direction && character.name.position.y > height * 0.8) {
            character.direction = true;
        }

    }
    this.isShowWarning = function (character) {
        if (dist(gSpriteManager.maskPlayer.position.x, gSpriteManager.maskPlayer.position.y, character.name.position.x, character.name.position.y) < 300 * gSpriteManager.maskPlayer.scale) {
            return true;
        }
    }

    this.maskPlayerAnimations = function (d) {
        if (endGame) return;
        let anyAction = false;

        if (gInputManager.isUp || gInputManager.isDown || touchControls.up || touchControls.down) {
            gSpriteManager.maskPlayer.changeAnimation('Walk');
            anyAction = true;
        }

        if (gInputManager.isLeft || touchControls.left) {
            gSpriteManager.maskPlayer.changeAnimation('Walk');
            gSpriteManager.maskPlayer.mirrorX(-1);
            anyAction = true;
            if (self.currentLevel == 2 && gSceneManager.offsetX >= 0) {
                if (self.currentLevel == 2) {
                    gSceneManager.offsetX -= d;
                    for (let i = 0; i < characters.length; ++i) {
                        if (characters[i].name == gSpriteManager.maskPlayer) continue;

                        characters[i].name.position.x += d / (1280 / width);
                    }
                }
            }
        }

        if (gInputManager.isRight || touchControls.right) {

            if (gSceneManager.offsetX < gSceneManager.background.width / 2 && self.currentLevel == 1) {
                gSceneManager.offsetX += d;
                for (let i = 0; i < characters.length; ++i) {
                    if (characters[i].name == gSpriteManager.maskPlayer) continue;
                    characters[i].name.position.x -= d;
                }
            }


            gSpriteManager.maskPlayer.changeAnimation('Walk');
            gSpriteManager.maskPlayer.mirrorX(1);
            anyAction = true;
        }

        if (!anyAction) {
            gSpriteManager.maskPlayer.changeAnimation('Idle');
        }
    }

    this.charYToScale = function (width, height, y) {
        let s = width * 0.0005;
        //return map(y, height * 0.5, height * 0.8, s * 0.6, s);
        return map(y, height * 0.5, height * 0.8, s * 0.35, s);
    }

    this.manageInputs = function (d) {
        if (endGame) return;

        if ((gInputManager.isUp || touchControls.up) && gSpriteManager.maskPlayer.position.y > height * 0.5) {
            gSpriteManager.maskPlayer.position.y -= d;
            gSpriteManager.maskPlayer.scale = this.charYToScale(width, height, gSpriteManager.maskPlayer.position.y);

            leftEdge += 0.15;
            if (rightEdge > 1.05) {
                rightEdge -= 0.008;
            }
        };

        if ((gInputManager.isDown || touchControls.down) && gSpriteManager.maskPlayer.position.y < height * 0.8) {
            gSpriteManager.maskPlayer.position.y += d;
            gSpriteManager.maskPlayer.scale = this.charYToScale(width, height, gSpriteManager.maskPlayer.position.y);

            leftEdge -= 0.15;
            if (rightEdge < 1.1) {
                rightEdge += 0.008;
            }
        };

        if ((gInputManager.isLeft || touchControls.down) && gSpriteManager.maskPlayer.position.x > width / leftEdge) {
            if (gSceneManager.offsetX < 200 || gSpriteManager.maskPlayer.position.x > width / 1.25 && self.currentLevel == 2) {
                gSpriteManager.maskPlayer.position.x -= d;
            }
        }

        if ((gInputManager.isRight || touchControls.right)&& gSpriteManager.maskPlayer.position.x < width / rightEdge) {
            if (self.currentLevel == 2) {
                gSpriteManager.maskPlayer.position.x += d;
            } else if (gSceneManager.offsetX > 1100 || gSpriteManager.maskPlayer.position.x < width / 4) {
                gSpriteManager.maskPlayer.position.x += d;
            }
        };
    }

    this.finishLevel = function () {
        // When the Player loses
        if (gPlayerManager.virusLevel >= 100) {
            helpButton.hide();
            helpPressed = false;
            endGame = true;
            gPlayerManager.isVirusBarVisible = false;
            for (let i = 0; i < characters.length; ++i) {
                characters[i].name.changeAnimation('Idle');
            }
            fill(0, 0, 0, 150);
            rect(0, 0, width, height);
            fill(230, 57, 70);
            noStroke();
            rect(width / 3, height / 4, width / 3, height / 2, 10);
            fill(255);
            textFont(finishLevelFont);
            textAlign(CENTER);
            textSize(width / 35);
            text("LEVEL FAILED!!", width / 2, height / 3.2);
            textFont("Arial");
            textSize(width / 70);
            rectMode(CENTER);
            text("You were unable to maintain distance from other characters and have got COVID-19.", width / 2, height / 3, width / 4)
            imageMode(CENTER);
            image(arrowKeys, width / 2, height / 2.15, width / 10, width / 14.6);
            text("Use arrow keys to maintain a certain distance from the characters to avoid getting COVID-19. If you get too close, you should see a warning.", width / 2, height / 1.85, width / 4)

            tryAgainButton.position(width / 2 - tryAgainButton.width / 2, height / 1.55);
            tryAgainButton.mousePressed(this.tryAgain);
            tryAgainButton.id("tryAgainButton");
            tryAgainButton.show();
        }
        // When the maskPlayer Wins Level 1
        if (
            gSceneManager.offsetX > 1100 && gSpriteManager.maskPlayer.position.x > width / 1.33 &&
            self.currentLevel == 1
        ) {

            if (gSpriteManager.maskPlayer.position.y < height / 1.75) {
                helpButton.hide();
                gPlayerManager.isVirusBarVisible = false;
                helpPressed = false;
                for (let i = 0; i < characters.length; ++i) {
                    characters[i].name.changeAnimation('Idle');
                }
                fill(0, 0, 0, 150);
                rect(0, 0, width, height);
                fill(255, 186, 8);
                noStroke();
                rect(width / 3, height / 4, width / 3, height / 2, 10);
                fill(255);
                textFont(finishLevelFont);
                textAlign(CENTER);
                textSize(width / 25);
                text("LEVEL\nCOMPLETE!!", width / 2, height / 2.4);
                textFont("Arial");
                textSize(width / 70);

                goNextButton.position(width / 2 - goNextButton.width / 2, height / 1.75);
                goNextButton.mousePressed(this.goNext);
                goNextButton.id("goNext");
                goNextButton.show();
                endGame = true;

            }
        }
        // When the maskPlayer Wins Level 2
        if (
            gSceneManager.offsetX <= 50 && gSpriteManager.maskPlayer.position.x < width / 6 &&
            self.currentLevel == 2
        ) {

            if (gSpriteManager.maskPlayer.position.y < height / 1.75) {
                gPlayerManager.isVirusBarVisible = false;
                helpButton.hide();
                helpPressed = false;
                for (let i = 0; i < characters.length; ++i) {
                    characters[i].name.changeAnimation('Idle');
                }
                fill(0, 0, 0, 150);
                rect(0, 0, width, height);
                fill(255, 186, 8);
                noStroke();
                rect(width / 3, height / 4, width / 3, height / 2, 10);
                fill(255);
                textFont(finishLevelFont);
                textAlign(CENTER);
                textSize(width / 25);
                text("LEVEL\nCOMPLETE!!", width / 2, height / 2.4);
                textFont("Arial");
                textSize(width / 70);

                goNextButton.position(width / 2 - goNextButton.width / 2, height / 1.75);
                goNextButton.mousePressed(this.goNext);
                goNextButton.id("goNext");
                goNextButton.show();

                endGame = true;

            }
        }
    }
    this.goNext = function () {
        let remainTime = 150.0 - timer.get() / 1000;
        if (self.currentLevel == 1) {
            if (remainTime > 0) gPlayerManager.score += remainTime * 10;
            gStageManager.changeStage(new StageMC6());
        } else {
            if (remainTime > 0) gPlayerManager.score += remainTime * 20;
            gStageManager.changeStage(new StageEnd());
        }
    }

    this.onWindowResized = function (w, h) {

        for (let i = 0; i < characters.length; ++i) {
            characters[i].name.position.x = (characters[i].name.position.x / self.oldWidth) * w;
            characters[i].name.position.y = (characters[i].name.position.y / self.oldHeight) * h;

            characters[i].name.scale = this.charYToScale(w, h, characters[i].name.position.y);
        }
        if(helpPressed == true){
            helpButton.position( width -175, 55 +10);
           } else{
            helpButton.position( width -115, 55 +10);
           }

        self.oldWidth = w;
        self.oldHeight = h;
    }

    this.help = function(){
       helpPressed = !helpPressed;
       if(helpPressed == true){
        helpButton.html("HIDE TIPS");
        helpButton.position( width -175, 55 +10);
       } else{
        helpButton.html("TIPS");
        helpButton.position( width -115, 55 +10);
       }

    }

    this.touchTracking = function(){
        if(touches.length != 0){
            for(let i = 0; i < touches.length; ++i){
            if(touches[i].x > width/2){
                touchControls.right = true;
            } else {
                touchControls.right = false;
            }
            if(touches[i].x < width/2){
                touchControls.left = true;
            } else{
                touchControls.left = false;
            }
            if(touches[i].y < height/2){
                touchControls.up = true;
            } else{
                touchControls.up = false;
            }
            if(touches[i].y > height/2){
                touchControls.down = true;
            } else{
                touchControls.down = false;
            }
        }
        }else{
        touchControls.left = false;
        touchControls.right = false;
        touchControls.up = false;
        touchControls.down = false;
        }
        
    }

}



