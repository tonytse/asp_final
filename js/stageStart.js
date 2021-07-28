


function StageStart() {
    let self = this;

    this.onEnter = function () {
        print('StageStart onEnter');
    }

    this.onExit = function () {
        print('onExit');
    }

    this.onDraw = function () {
        //print('onDraw');
        animation(gSpriteManager.explode_animation, 300, 130);
    }

}