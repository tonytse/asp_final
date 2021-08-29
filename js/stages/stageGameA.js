function StageGameA() {
    let self = this;
    let imgLeftHand = null;
    let imgRightHand = null;

    let dLeftHandX = 0;
    let dLeftHandY = 0;

    let dRightHandX = 0;
    let dRightHandY = 0;

    let bubbles = [];
    //let virusFreeButton = createButton("You Are Virus Free!!");
    let handWashingTime = 0;
    //let bubbleTimer = 0;

    this.onEnter = function () {
        gSceneManager.loadBathroom();

        // https://dlpng.com/png/6583488
        self.imgLeftHand = loadImage('assets/gameA/leftHand.png');
        self.imgRightHand = loadImage('assets/gameA/rightHand.png');

    };

    this.onExit = function () {

    };

    // this.onMouseMoved = function () {

    // };


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

        let handWashAreaX = width * 0.4 - width * 0.15;
        let handWashAreaY = height * 0.4;
        let handWashAreaW = width * 0.4;
        let handWashAreaH = height * 0.5;


        if (mouseX > handWashAreaX && mouseX < handWashAreaX + handWashAreaW && mouseY > handWashAreaY 
            && mouseY < handWashAreaY + handWashAreaH) {

        
            dRightHandX = mouseX;
            //dRightHandY = mouseY;

            handWashingTime += deltaTime;

            //console.log('handWashingTime ' + handWashingTime);

            if (bubbles.length < 40 ) { 
                
                if((handWashingTime % 0.5) == 0)
                {
                    bubbles.push(new Bubble(mouseX, mouseY));
                }

            }

        }


    };

    this.onDraw = function (w, h) {

        //washing hands
        if (mouseX > w / 3 && mouseX < w * 8 / 10 && mouseY > h * .45 && mouseY < h * .9) {
            
            //water 
            fill("blue");
            rect(w * 0.63, h * .558, 16, h * .25);

        
         }

        // The button after the virus is completely gone
        if (handWashingTime > 20) {
            // console.log("Done!!!");
            // console.log(bubbles.length);
            
            // virusFreeButton.position(width / 2, height / 2);
            // virusFreeButton.mousePressed(this.virusFree);
            // virusFreeButton.id("You Are Virus Free!!!");
            // virusFreeButton.show();
        }


        //Left/right hand
        let x = w / 2;
        let y = h - self.imgLeftHand.height;
        image(self.imgLeftHand, x - 100 + dLeftHandX, y + dLeftHandY);
        image(self.imgRightHand, dRightHandX, h - self.imgLeftHand.height + dRightHandY);


        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].move();
            bubbles[i].display();
        }

        if (keyDown('n')) {
            gStageManager.changeStage(new StageMC3());
        }

    };
}