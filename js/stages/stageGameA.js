function StageGameA() {

    let self = this;

    let oldWidth = null;
    let oldHeight = null;

    let imgLeftHand = null;
    let imgRightHand = null;

    let dRightHandX = 0;

    let bubbles = [];

    let bubbleTimer = 0;
    let handWashingTimer = 0;
    let showExitButtonTimer = 0;
    let maxReduceVirus = 40;

    this.exitButton = null;

    this.onEnter = function () {

        let width = gSceneManager.width;
        let height = gSceneManager.height;

        dRightHandX = width * 0.6;

        oldWidth = width;
        oldHeight = height;

        gSceneManager.loadBathroom();

        // https://dlpng.com/png/6583488
        self.imgLeftHand = loadImage('assets/gameA/leftHand.png');
        self.imgRightHand = loadImage('assets/gameA/rightHand.png');

        self.exitButton = createButton("Click here to exit washroom after washing your hands for 20s.");
        self.exitButton.mousePressed(this.exitWashroom);
        self.exitButton.class("dialogButton");
        self.exitButton.hide();

        self.onWindowResized(width, height);
    };

    this.onExit = function () {
        bubbles = [];

        if (self.exitButton) {

            self.exitButton.remove();
            self.exitButton = null;
        }

    };

    //function to make the bubbles
    function Bubble(x, y) {
        this.x = x;
        this.y = y;

        this.display = function (x, y) {
            stroke(255);
            strokeWeight(2);
            fill("orange");
            ellipse(this.x, this.y, 10, 10);
        }

        this.move = function (x, y) {
            this.x = this.x + random(-2, 2);
            this.y = this.y + random(-2, 2);
        }
    }

    this.onMouseDragged = function () {

        let handWashAreaX = width * 0.6;
        let handWashAreaY = height * 0.6;
        let handWashAreaW = width * 0.13;
        let handWashAreaH = height * 0.5;

        if (mouseX > handWashAreaX && mouseX < handWashAreaX + handWashAreaW && mouseY > handWashAreaY
            && mouseY < handWashAreaY + handWashAreaH) {

            dRightHandX = mouseX - self.imgRightHand.width / 2;

            let dt = deltaTime / 1000;

            handWashingTimer += dt;

            if (maxReduceVirus > 0) {
                let r = Math.min(maxReduceVirus, dt);
                gPlayerManager.virusLevel -= r;
                maxReduceVirus -= dt;
            }

            if (bubbles.length < 40) {
                bubbleTimer += dt;
                if (bubbleTimer > 0.5) {
                    bubbleTimer -= 0.5;
                    bubbles.push(new Bubble(mouseX, handWashAreaY + random(0, 100)));
                }
            }
        }

    };

    this.onDraw = function (w, h) {
        showExitButtonTimer += deltaTime / 1000;


        if (showExitButtonTimer > 10) {
            if (self.exitButton.style('display') == 'none') {
                self.exitButton.show();
            }
        }

        //Left/right hand
        let s = width * 0.0008;
        let x = w / 2;
        let y = h - (s * self.imgLeftHand.height);
        image(self.imgLeftHand, x, y, s * self.imgLeftHand.width, s * self.imgLeftHand.height);
        image(self.imgRightHand, dRightHandX, y, s * self.imgRightHand.width, s * self.imgRightHand.height);

        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].move();
            bubbles[i].display();
        }

        //water 
        stroke('white');
        strokeWeight(1);
        fill('rgba(0,0,255, 0.25)');
        rect(w * 0.63, h * .558, w * 0.02, h * .25);

    };

    this.onWindowResized = function (w, h) {

        self.exitButton.position(0, h * 0.2);

        dRightHandX = (dRightHandX / oldWidth) * w;

        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].x = (bubbles[i].x / oldWidth) * w;
            bubbles[i].y = (bubbles[i].y / oldHeight) * h;
        }

        oldWidth = w;
        oldHeight = h;

    }

    this.exitWashroom = function () {

        let t = Math.max(handWashingTimer, 20);
        gPlayerManager.score += t * 100;
        gStageManager.changeStage(new StageMC3());
        gPlayerManager.gameAWashedTime = handWashingTimer;

    }
}