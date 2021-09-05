function StageGameB(level) {

    let self = this;

    let leftEdge = 14;
    let rightEdge = 1.1;

    let oldWidth = null;
    let oldHeight = null;

    let characters = [];
    let endGame = false;

    let finishLevelFont = loadFont("assets/fonts/sigmar_one.ttf");
    let warningFont = loadFont("assets/fonts/frijole_regular.ttf");
    let arrowKeys = loadImage("assets/gameB/arrow_keys.png");
    let tryAgainButton = createButton('Try Again');
    let goNextButton = createButton('Go Next');
    let timer = new StopWatch();

    this.currentLevel = level;

    this.onEnter = function () {
        gPlayerManager.isVirusBarVisible = true;
        gSceneManager.loadGameB(self.currentLevel);

        self.oldWidth = width;
        self.oldHeight = height;

        characters = [
            { name: gSpriteManager.player, direction: false, speed: 1 * this.currentLevel },
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
        this.playerAnimations(d);

        let showWarning = false;
        for (let i = 0; i < characters.length; ++i) {

            if (characters[i].name != gSpriteManager.player) {
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

        fill(100);
        textAlign(CENTER);
        textSize(width / 50);
        textFont(warningFont);
        if (self.currentLevel == 1) {
            text("Keep a safe distance and go to the supermarket ---->", width * 0.5, 150);
            text("Long press arrow keys to move in the desired direction.", width * 0.52, 110);
        }else {
            text("<--- Keep a safe distance and go back home", width * 0.5, 150);
        }

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
        if (self.currentLevel == 1) {
            gSpriteManager.player.position.x = width / 5;
            gSpriteManager.redBoy.position.x = width / 1.5;
            gSpriteManager.cowBoy.position.x = width * 1;
            gSpriteManager.cowGirl.position.x = width * 1.4;
            gSpriteManager.girl.position.x = width * 1.8;
        } else {
            gSpriteManager.player.position.x = width / 1.2;

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
            if (self.currentLevel == 1 || gSpriteManager.player == characters[i].name) {
                characters[i].name.position.y = height * 0.65;
            }
            characters[i].name.scale = self.charYToScale(width, height, characters[i].name.position.y);
            characters[i].name.changeAnimation('Walk');
            if (characters[i].name !== gSpriteManager.player) {
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
        if (dist(gSpriteManager.player.position.x, gSpriteManager.player.position.y, character.name.position.x, character.name.position.y) < 300 * gSpriteManager.player.scale) {
            return true;
        }
    }

    this.playerAnimations = function (d) {
        if (endGame) return;
        let anyAction = false;

        if (gInputManager.isUp || gInputManager.isDown) {
            gSpriteManager.player.changeAnimation('Walk');
            anyAction = true;
        }

        if (gInputManager.isLeft) {
            gSpriteManager.player.changeAnimation('Walk');
            gSpriteManager.player.mirrorX(-1);
            anyAction = true;
            if (self.currentLevel == 2 && gSceneManager.offsetX >= 0) {
                if (self.currentLevel == 2) {
                    gSceneManager.offsetX -= d;
                    for (let i = 0; i < characters.length; ++i) {
                        if (characters[i].name == gSpriteManager.player) continue;

                        characters[i].name.position.x += d / (1280 / width);
                    }
                }
            }
        }

        if (gInputManager.isRight) {

            if (gSceneManager.offsetX < gSceneManager.background.width / 2 && self.currentLevel == 1) {
                gSceneManager.offsetX += d;
                for (let i = 0; i < characters.length; ++i) {
                    if (characters[i].name == gSpriteManager.player) continue;
                    characters[i].name.position.x -= d;
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

    this.charYToScale = function (width, height, y) {
        let s = width * 0.0005;
        //return map(y, height * 0.5, height * 0.8, s * 0.6, s);
        return map(y, height * 0.5, height * 0.8, s * 0.35, s);
    }

    this.manageInputs = function (d) {
        if (endGame) return;

        if (gInputManager.isUp && gSpriteManager.player.position.y > height * 0.5) {
            gSpriteManager.player.position.y -= d;
            gSpriteManager.player.scale = this.charYToScale(width, height, gSpriteManager.player.position.y);

            leftEdge += 0.15;
            if (rightEdge > 1.05) {
                rightEdge -= 0.008;
            }
        };

        if (gInputManager.isDown && gSpriteManager.player.position.y < height * 0.8) {
            gSpriteManager.player.position.y += d;
            gSpriteManager.player.scale = this.charYToScale(width, height, gSpriteManager.player.position.y);

            leftEdge -= 0.15;
            if (rightEdge < 1.1) {
                rightEdge += 0.008;
            }
        };

        if (gInputManager.isLeft && gSpriteManager.player.position.x > width / leftEdge) {
            if (gSceneManager.offsetX < 200 || gSpriteManager.player.position.x > width / 1.25 && self.currentLevel == 2) {
                gSpriteManager.player.position.x -= d;
            }
        }

        if (gInputManager.isRight && gSpriteManager.player.position.x < width / rightEdge) {
            if (self.currentLevel == 2) {
                gSpriteManager.player.position.x += d;
            } else if (gSceneManager.offsetX > 1100 || gSpriteManager.player.position.x < width / 4) {
                gSpriteManager.player.position.x += d;
            }
        };
    }

    this.finishLevel = function () {
        // When the player loses
        if (gPlayerManager.virusLevel >= 100) {
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
        // When the player Wins Level 1
        if (
            gSceneManager.offsetX > 1100 && gSpriteManager.player.position.x > width / 1.33 &&
            self.currentLevel == 1
        ) {

            if (gSpriteManager.player.position.y < height / 1.75) {
                gPlayerManager.isVirusBarVisible = false;
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
        // When the player Wins Level 2
        if (
            gSceneManager.offsetX <= 50 && gSpriteManager.player.position.x < width / 6 &&
            self.currentLevel == 2
        ) {

            if (gSpriteManager.player.position.y < height / 1.75) {
                gPlayerManager.isVirusBarVisible = false;
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

        self.oldWidth = w;
        self.oldHeight = h;
    }
}



