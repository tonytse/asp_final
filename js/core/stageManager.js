
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


    //! Forward onDraw function
    this.onDraw = function (w, h) {
        if (self.currentStage) {
            self.currentStage.onDraw(w, h);
        }
    }

    //! Forward onDrawOverlay function
    this.onDrawOverlay = function (w, h) {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onDrawOverlay")) {
                self.currentStage.onDrawOverlay(w, h);
            }
        }
    }

    //! Forward onWindowResized function
    this.onWindowResized = function (w, h) {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onWindowResized")) {
                self.currentStage.onWindowResized(w, h);
            }
        }
    }
    

    //! Forward onMouseMoved function
    this.onMouseMoved = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onMouseMoved")) {
                self.currentStage.onMouseMoved();
            }
        }
    }

    //! Forward onMouseDragged function
    this.onMouseDragged = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onMouseDragged")) {
                self.currentStage.onMouseDragged();
            }
        }
    }

    //! Forward mouseReleased function
    this.mouseReleased = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("mouseReleased")) {
                self.currentStage.mouseReleased();
            }
        }
    }

    //! Forward touchStarted function
    this.touchStarted = function () {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("touchStarted")) {
                self.currentStage.touchStarted();
            }
        }
    }
}