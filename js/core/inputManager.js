

function InputManager() {
    let self = this;
    let imgWASD = null;

    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;

    this.preload = function () {
        imgWASD = loadImage('assets/wasd.png')
    }

    this.onUpdate = function () {

        this.isUp = keyDown('w') || keyDown(38) || this.isPressOnButton(101,126);
        this.isDown = keyDown('s') || keyDown(40) || this.isPressOnButton(101,180);
        this.isLeft = keyDown('a') || keyDown(37) || this.isPressOnButton(50,180);
        this.isRight = keyDown('d') || keyDown(39) || this.isPressOnButton(152,180);
    }

    this.isPressOnButton = function (x, y) {
        if (!mouseIsPressed || mouseButton != LEFT) return false;
        if (mouseX > x && mouseX <= x + 40 &&
            mouseY > y && mouseY <= y + 40) {
            return true;
        }
    }


    this.onDraw = function (w, h) {

        image(imgWASD, 40, 120);


        /*
        fill(255);
        rect(50, 180, 40, 40); // Up
        rect(125, 165, 40, 40); // Down
        rect(85, 165, 40, 40); // left
        rect(165, 165, 40, 40); // left
        */
    }
}