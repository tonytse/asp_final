function StageGameA() {

    let warningFont = loadFont("assets/fonts/frijole_regular.ttf");

    let self = this;

    //! old screen size 
    let oldWidth = null;
    let oldHeight = null;

    //! Left, Right hand image
    let imgLeftHand = null;
    let imgRightHand = null;


    //! Bubbble
    let bubbles = [];
    let bubbleTimer = 0;

    //! Timer
    let handWashingTimer = 0;
    let showExitButtonTimer = 0;

    //! Score control
    let maxReduceVirus = 40;

    //! Hand position
    let hands = { right: { x: 0, y: 0, restingX: 0, restingY: 0, yLimit: false }, left: { x: 0, y: 0, restingX: 0, restingY: 0, yLimit: true }, far: true, handsYSpeed: 0, handsXSpeed: 0 }

    let handWashAreaX = 0;
    let handWashAreaY = 0;
    let handWashAreaW = 0;
    let handWashAreaH = 0;

    let isMouseBeingDragged = false;

    //! Help
    let helpPressed = false;
    let helpButton = createButton('TIPS');

    //! Exit
    this.exitButton = null;

    this.onEnter = function () {
        gSceneManager.loadBathroom();
        gPlayerManager.isVirusBarVisible = true;

        let width = gSceneManager.width;
        let height = gSceneManager.height;

        //! backup screen size
        oldWidth = width;
        oldHeight = height;

        
        //! Load Hands
        // https://dlpng.com/png/6583488
        self.imgLeftHand = loadImage('assets/gameA/leftHand.png');
        self.imgRightHand = loadImage('assets/gameA/rightHand.png');

        //! hands position
        hands.handsXSpeed = width / 2000;
        hands.handsYSpeed = height / 300;

        hands.right.restingX = width * 0.55;
        hands.right.restingY = height / 1.5;
        hands.left.restingX = width * 0.4;
        hands.left.restingY = height / 1.5;

        hands.right.x = hands.right.restingX;
        hands.right.y = hands.right.restingY;
        hands.left.x = hands.left.restingX;
        hands.left.y = hands.left.restingY;

        handWashAreaX = width * 0.3;
        handWashAreaY = height * 0.6;
        handWashAreaW = width * 0.5;
        handWashAreaH = height * 0.5;

        //! help button
        helpButton.class("helpButton");
        helpButton.position(width - 115, 55 + 10);
        helpButton.mousePressed(this.help);

        //! exit button
        self.exitButton = createButton("Click here to exit washroom after washing your hands for 20s.");
        self.exitButton.mousePressed(this.exitWashroom);
        self.exitButton.class("dialogButton");
        self.exitButton.hide();

        self.onWindowResized(width, height);
    };

    this.onExit = function () {
        //! Clear bubble
        bubbles = [];

        //! Hide help 
        helpButton.hide();

        //! Clear button
        if (self.exitButton) {
            self.exitButton.remove();
            self.exitButton = null;
        }

    };

    //! function to make the bubbles
    this.createBubbles = function (x, y, size, time) {
        let opacity = random(0, 150);
        let strokeColor = color(255, 255, 255, opacity)
        let colors = color(random(200, 255), random(135, 165), random(125, 150), opacity);
        if (bubbles.length < 200) {
            bubbles.push({ x: x, y: y, size: size, time: time, color: colors, stroke: strokeColor });
        }
    };

    //! When play dragging hand in the sink area
    this.onMouseDragged = function () {
        if (mouseX > handWashAreaX && mouseX < handWashAreaX + handWashAreaW && mouseY > handWashAreaY
            && mouseY < handWashAreaY + handWashAreaH) {
            isMouseBeingDragged = true;
            if (hands.right.y < height / 1.65) {
                hands.right.yLimit = true;
            } else if (hands.right.y > height / 1.35) {
                hands.right.yLimit = false;
            }
            if (hands.left.y < height / 1.65) {
                hands.left.yLimit = true;
            } else if (hands.left.y > height / 1.35) {
                hands.left.yLimit = false;
            }
            if (hands.right.yLimit == true) {
                hands.right.y += hands.handsYSpeed;
            } else {
                hands.right.y -= hands.handsYSpeed;
            }
            if (hands.left.yLimit == true) {
                hands.left.y += hands.handsYSpeed;
            } else {
                hands.left.y -= hands.handsYSpeed;
            }

            if (hands.right.x - hands.left.x > 100) {
                hands.far = true;

            } else if (hands.right.x - hands.left.x < 50) {
                hands.far = false;
            }

            if (hands.far == true) {
                hands.right.x -= hands.handsXSpeed;
                hands.left.x += hands.handsXSpeed;
            } else if (hands.far == false) {
                hands.right.x += hands.handsXSpeed;
                hands.left.x -= hands.handsXSpeed;
            }


            this.createBubbles(
                random((hands.left.x + self.imgLeftHand.width / 2) - (width / 10), (hands.right.x + self.imgRightHand.width / 2) + (width / 10)),
                random(height / 1.5, height / 1.1),
                random(width / 116, (width / 19)),
                random(5.0, 10.0)
            );
            let dt = deltaTime / 1000;
            handWashingTimer += dt;

            if (maxReduceVirus > 0) {
                let r = Math.min(maxReduceVirus, dt);
                gPlayerManager.virusLevel -= r;
                maxReduceVirus -= dt;
            }
        }
    };

    this.mouseReleased = function () {
        isMouseBeingDragged = false;
    }

    this.onDraw = function (w, h) {
        //! Draw help 
        if (showExitButtonTimer > 10 && helpPressed == false) {

            fill(255, 186, 8);
            noStroke();
            rect(self.exitButton.position().x - 10, self.exitButton.position().y - 7, self.exitButton.size().width + 20, self.exitButton.size().height + 14, 20);

            if (self.exitButton.style('display') == 'none') {
                self.exitButton.show();
            }
        } else {
            showExitButtonTimer += deltaTime / 1000;
        }

        //! Left/right hand
        let s = width * 0.0008;
        let x = w / 2;
        let y = h - (s * self.imgLeftHand.height);
       
        image(self.imgLeftHand, hands.left.x, hands.left.y, s * self.imgLeftHand.width, s * self.imgLeftHand.height);
        image(self.imgRightHand, hands.right.x, hands.right.y, s * self.imgRightHand.width, s * self.imgRightHand.height);


        //! Draw Water
        if (mouseX > handWashAreaX && mouseX < handWashAreaX + handWashAreaW && mouseY > handWashAreaY
            && mouseY < handWashAreaY + handWashAreaH) {
            noStroke();
            fill('rgba(0,133,255, 0.15)');
            rect(w * 0.632, h * .412, w * 0.02, h * .25);
        }

        //! If mouse drag is stopped it puts the hands back is resting position
        if (isMouseBeingDragged == false) {
            if (hands.right.x < hands.right.restingX) {
                hands.right.x += hands.handsXSpeed;
            }
            if (hands.left.x > hands.left.restingX) {
                hands.left.x -= hands.handsXSpeed;
            }
            if (hands.right.y != hands.right.restingY) {
                if (hands.right.y > hands.right.restingY) {
                    hands.right.y -= hands.handsYSpeed;
                } else if (hands.right.y < hands.right.restingY) {
                    hands.right.y += hands.handsYSpeed;
                }
                if (hands.left.y > hands.left.restingY) {
                    hands.left.y -= hands.handsYSpeed;
                } else if (hands.left.y < hands.left.restingY) {
                    hands.left.y += hands.handsYSpeed;
                }
                if (abs(hands.left.y - hands.left.restingY) < hands.handsYSpeed) {
                    hands.left.y = hands.left.restingY;
                }
                if (abs(hands.right.y - hands.right.restingY) < hands.handsYSpeed) {
                    hands.right.y = hands.right.restingY;
                }
            }
            hands.far = true;
            hands.left.yLimit = true;
            hands.right.yLimit = false;
        }

        push();
        for (let i = 0; i < bubbles.length; ++i) {
            stroke(bubbles[i].stroke);
            strokeWeight(1);
            fill(bubbles[i].color);
            ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size);
            bubbles[i].time -= deltaTime / 1000;
            bubbles[i].x += random(-2.0, 2.0);
            bubbles[i].y -= random(0.1, 0.1);
            if (bubbles[i].time < 0) {
                bubbles.splice(i, 1);
            }
        }
        pop();


        //! Render help

        if (helpPressed == true) {
            push();
            fill(0, 0, 0, 100);
            rect(0, 0, width, height);
            textAlign(CENTER);
            textSize(width / 45);
            textFont(warningFont);
            fill(255);
            rectMode(CENTER);
            text("Wash your hands by dragging with your mouse or finger on the sink area", width * 0.5, height / 2, width / 1.5);
            pop();
        }

    };

    this.onWindowResized = function (w, h) {

        //! Exit button
        self.exitButton.position(w * 0.1 / 2, 150);
        self.exitButton.size(w * 0.9, 50);
        self.exitButton.style('font-size', '' + w * 0.025 + 'px');

        //! Bubble position
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].x = (bubbles[i].x / oldWidth) * w;
            bubbles[i].y = (bubbles[i].y / oldHeight) * h;
        }

        //! Hands position
        hands.right.x = (hands.right.x / oldWidth) * w;
        hands.left.x = (hands.left.x / oldWidth) * w;
        hands.right.y = (hands.right.y / oldHeight) * h;
        hands.left.y = (hands.left.y / oldHeight) * h;

        hands.handsXSpeed = w / 2000;
        hands.handsYSpeed = h / 300;

        hands.right.restingX = w * 0.55;
        hands.right.restingY = h / 1.5;
        hands.left.restingX = w * 0.4;
        hands.left.restingY = h / 1.5;

        handWashAreaX = w * 0.3;
        handWashAreaY = h * 0.6;
        handWashAreaW = w * 0.5;
        handWashAreaH = h * 0.5;

        //! Update screem size
        oldWidth = w;
        oldHeight = h;

    }

    this.exitWashroom = function () {
        //! Calc score 
        let t = Math.max(handWashingTimer, 20);
        gPlayerManager.score += t * 100;
        gPlayerManager.gameAWashedTime = handWashingTimer;

        gStageManager.changeStage(new StageMC3());
    }

    this.help = function () {
        
        helpPressed = !helpPressed;
        if (helpPressed == true) {
            helpButton.html("HIDE TIPS");
            helpButton.position(width - 175, 55 + 10);
        } else {
            helpButton.html("TIPS");
            helpButton.position(width - 115, 55 + 10);
        }
    }


}