function StageEnd() {
    let self = this;
    this.score = "";
    this.cong = "";
    this.tips = "";
    this.button = null;

    this.onEnter = function () {
        
        gPlayerManager.isVirusBarVisible = false;

        gSceneManager.loadTown();
        gDialogManager.setDialog("~~ Thank you for playing ~~", self.onDialogDone);

        this.score = "Your Score: " + parseInt(gPlayerManager.score);
        this.cong = "Congratulations. Well done";

        if (gPlayerManager.mcWrongAns.length <= 0) {
            this.tips = "You got all the answers correct. You nailed it!";
        } else {

            //! TODO Tony: Hits from game A and game B
            let idx = Math.floor(Math.random() * gPlayerManager.mcWrongAns.length);

            let obj = gPlayerManager.mcWrongAns[idx];
            let jsonFile = gGameDataManager.getMCJson(obj.mc);

            loadJSON(jsonFile, function (json) {

                self.tips = json.answers[obj.ans].reason;

                self.button = createA( json.answers[obj.ans].reasonUrl, 'Click here for more information');
                
                self.button.class('dialogButton');
                let width = gSceneManager.width;
                let height = gSceneManager.height;
                self.onWindowResized(width, height);
            });
        }
    }

    this.onExit = function () {
        if (self.button) {
            self.button.remove();
            self.button = null;
        }
    }

    this.onDraw = function (w, h) {

    }

    this.onDrawOverlay = function (w, h) {

        fill(255);
        textSize(38);
        textAlign(CENTER);

        textFont(gDialogManager.font);
        text(self.score, 20, 20, width, 60);
        text(self.cong, 20, 80, width, 100);

        textSize(32);
        textAlign(LEFT);
        textLeading(30);
        text(self.tips, 20, 160, width - 20, 100);
    }


    this.onDialogDone = function () {
        gStageManager.changeStage(new StageStart());
    }

    this.onWindowResized = function (w, h) {

        if (self.button) {
            self.button.position(20, height / 3 * 2);
        }

    };
}