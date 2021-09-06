function MultipleChoiceManager() {

    let self = this;

    this.json = null;
    this.callbackCorrect = null;
    this.callbackWrong = null;
    this.stopwatch = new StopWatch();

    this.currAnimation = null;
    this.stopwatchCurrAnimation = new StopWatch();
    this.currAnimationDur = 4000;
    this.isCloseAfterAnimation = false;
    this.button = [];

    this.onDraw = function () {

        //! remove correctAniamtion
        if (self.currAnimation) {
            if (self.stopwatchCurrAnimation.get() > self.currAnimationDur) {
                self.currAnimation.remove();
                self.currAnimation = null;

                if (self.isCloseAfterAnimation) {
                    gDialogManager.close();
                    self.close();
                }
            }
        }

    };

    this.open = function (jsonFile, callbackCorrect, callbackWrong) {

        self.isCloseAfterAnimation = false;

        self.callbackCorrect = callbackCorrect;
        self.callbackWrong = callbackWrong;


        //! Load json file 
        loadJSON(jsonFile, function (json) {

            let len = json.answers['length'];

            if (len <= 0) {
                self.close();
                return;
            }

            self.json = json;

            for (let i = 0; i < len; ++i) {

                self.button[i] = createButton(self.json.answers[i].text);
                self.button[i].class('dialogButton');
                self.button[i].id(i);
                self.button[i].mousePressed(self.answer);
            }

            gDialogManager.setDialog(json.title);

            let width = gSceneManager.width;
            let height = gSceneManager.height;
            self.onWindowResized(width, height);
            self.stopwatch.start();

        });
    };

    this.answer = function () {

        //! clear animation
        if (self.currAnimation) {
            self.currAnimation.remove();
            self.currAnimation = null;
        }
        
        //! Reset timer 
        self.stopwatchCurrAnimation.start();


        if (self.json.answers[this.id()].isCorrect) {
            self.isCloseAfterAnimation = true;

            self.currAnimation = createImg("assets/correct.gif", function () {
                //! Move gif DOM
                self.onWindowResized(gSceneManager.width, gSceneManager.height);
                //! Reset timer 
                self.stopwatchCurrAnimation.start();
            });

            gAudioManager.playCorrect();

        } else {
            self.isCloseAfterAnimation = false;

            self.currAnimation = createImg("assets/tryagain.gif", function () {
                //! Move gif DOM
                self.onWindowResized(gSceneManager.width, gSceneManager.height);
                //! Reset timer 
                self.stopwatchCurrAnimation.start();
            });

            //! Wrong answer callback
            self.callbackWrong(this.id());
            //! Hide wrong answer button
            self.button[this.id()].hide();

            gAudioManager.playWrong();
        }
    }

    this.close = function () {

        self.json = null;
        self.callbackWrong = null;
        self.isCloseAfterAnimation = false;

        //! Call correct callback function
        if (self.callbackCorrect) {
            self.callbackCorrect(self.stopwatch.get());
            self.callbackCorrect = null;
        }

        //! clear animation
        if (self.currAnimation) {
            self.currAnimation.remove();
            self.currAnimation = null;
        }

        //! clear button
        for (let i = 0; i < self.button.length; ++i) {
            self.button[i].remove();
            self.button[i] = null;
        }
        self.button = [];
    };

    this.onWindowResized = function (w, h) {

        let len = self.button.length;

        //! left,right 80 px space
        let contentW = w - 160;
        
        //! Count how many buttons to display
        let numBtn = 0;
        for (let i = 0; i < len; ++i) {
            if (self.button[i].style('display') != 'none') {
                numBtn++;
            }
        }

        let dw = contentW / numBtn;
        let idx = 0;

        //! Set buttons position
        for (let i = 0; i < len; ++i) {
            if (self.button[i].style('display') == 'none') continue;

            self.button[i].size(dw * 0.8, 250);
            self.button[i].position(80 + (idx) * dw * 0.8 + (idx * 2 + 1) * dw * 0.1, 260);
            idx++;
        }

        //! Position animation
        if (self.currAnimation) {
            let s = min(w, h);
            self.currAnimation.size(s, s);
            self.currAnimation.position((w - s) / 2, (h - s) / 2);
        }
    };
}