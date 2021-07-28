

function InputManager() {
    let self = this;

    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;

    this.onUpdate = function () {


        this.isUp = keyDown('w') || keyDown(38);
        this.isDown = keyDown('s') || keyDown(40);
        this.isLeft = keyDown('a') || keyDown(37);
        this.isRight = keyDown('d') || keyDown(39);

    }


}