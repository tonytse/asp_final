

function InputManager() {
    let self = this;

    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;


    this.onUpdate = function () {

        //! Geting input from keyboard wasd , arrow key 
        this.isUp = keyDown('w') || keyDown(38) || this.isTouchUp();
        this.isDown = keyDown('s') || keyDown(40) || this.isTouchDown();
        this.isLeft = keyDown('a') || keyDown(37) || this.isTouchLeft();
        this.isRight = keyDown('d') || keyDown(39) || this.isTouchRight();
    }

    this.isTouchUp = function () {
        for (let i = 0; i < touches.length; ++i) {
            if (touches[i].y < gSceneManager.height / 2) return true;
        }
        return false;
    }

    this.isTouchDown = function () {
        for (let i = 0; i < touches.length; ++i) {
            if (touches[i].y > gSceneManager.height / 2) return true;
        }
        return false;
    }

    this.isTouchLeft = function () {
        for (let i = 0; i < touches.length; ++i) {
            if (touches[i].x < gSceneManager.width / 2) return true;
        }
        return false;
    }
    this.isTouchRight = function () {
        for (let i = 0; i < touches.length; ++i) {
            if (touches[i].x > gSceneManager.width / 2) return true;
        }
        return false;
    }

}