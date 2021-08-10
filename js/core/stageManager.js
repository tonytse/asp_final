

function StageManager() {
    let self = this;

    this.currentStage = null;

    this.changeStage = function (stage) {

        if (!stage.hasOwnProperty("onDraw") ) {
			alert("Stage must have draw function");
            return;
		}

        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onExit")) {
                self.currentStage.onExit();
            }
        }

        if (stage.hasOwnProperty("onEnter")) {
            stage.onEnter();
        }

        self.currentStage = stage;
        
    }

    this.start = function () {
        self.changeStage( new StageStart() );
    }

    this.onDraw = function (w,h) {
        if (self.currentStage) {
            self.currentStage.onDraw(w,h);
        }
    }

    
    this.onWindowResized = function ( w, h ) {
        if (self.currentStage) {
            if (self.currentStage.hasOwnProperty("onWindowResized") ) {
                self.currentStage.onWindowResized( w,h );
            }

        }
    }

}