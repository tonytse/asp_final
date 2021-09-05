
function StageManager() {
    let self = this;

    this.currentStage = null;

    this.changeStage = function (stage) {

        if (stage && !stage.hasOwnProperty("onDraw")) {
            alert("Stage must have draw function");
            return;
        }

        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onExit")) {
                self.currentStage.onExit();
            }
        }

        if (stage && stage.hasOwnProperty("onEnter")) {
            stage.onEnter();
        }

        self.currentStage = stage;
    }

    this.start = function () {
        self.changeStage(new StageStart());
    }

    this.onDraw = function (w, h) {
        if (self.currentStage) {
            self.currentStage.onDraw(w, h);
        }
    }

    this.onDrawOverlay = function (w, h) {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onDrawOverlay")) {
                self.currentStage.onDrawOverlay(w, h);
            }
        }
    }

    this.onWindowResized = function (w, h) {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onWindowResized")) {
                self.currentStage.onWindowResized(w, h);
            }
        }
    }
    this.preload = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("preload")) {
                self.currentStage.preload();
            }
        }
    }

    this.onMouseMoved = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onMouseMoved")) {
                self.currentStage.onMouseMoved();
            }
        }
    }

    this.onMouseDragged = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onMouseDragged")) {
                self.currentStage.onMouseDragged();
            }
        }
    }

    this.mouseReleased = function(){
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("mouseReleased")) {
                self.currentStage.mouseReleased();
            }
        }
    }
}