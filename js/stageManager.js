

function StageManager() {
    let self = this;

    this.currentStage = null;

    this.changeStage = function (stage) {

        if (!stage.hasOwnProperty("onDraw") ) {
			alert("Stage must have draw function");
            return;
		}

        if (self.currentStage) {
            if (self.tcurrentStage.hasOwnProperty("onExit")) {
                self.tcurrentStage.onExit();
            }
        }

        if (stage.hasOwnProperty("onEnter")) {
            stage.onEnter();
        }

        self.currentStage = stage;
        
    }

    // init setup
    this.init = function () {
        self.changeStage( new StageStart() );
    }

    this.onDraw = function () {
        if (self.currentStage) {
            self.currentStage.onDraw();
        }
    }

    // init this object
    this.init();
}