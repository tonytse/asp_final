function MultipleChoiceManager() {

    let self = this;

    this.json = null;
    this.callbackCorrect = null;
    this.callbackWrong = null;
    //this.isBlockingMode = true;
    this.button = [];

    this.onDraw = function () {

    };

    this.open = function (jsonFile, callbackCorrect, callbackWrong) {

        self.callbackCorrect = callbackCorrect;
        self.callbackWrong = callbackWrong;

        //self.isBlockingMode = false;

        loadJSON('assets/gameData/' + jsonFile, function (json) {

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

        });
    };

    this.answer = function () {
        //console.log( 'answer '+ this.id() );
        if (self.json.answers[this.id()].isCorrect) {
            gDialogManager.close();
            self.close();
        } else {
            self.callbackWrong(this.id());
            self.button[this.id()].hide();

            let width = gSceneManager.width;
            let height = gSceneManager.height;
            self.onWindowResized(width, height);
        }
    }

    this.close = function () {
        self.json = null;
        //self.isBlockingMode = false;
        self.callbackWrong = null;

        if (self.callbackCorrect) {
            self.callbackCorrect();
            self.callbackCorrect = null;
        }

       
        for (let i = 0; i < self.button.length; ++i) {
            self.button[i].remove();
            self.button[i] = null;
        }
        self.button = [];
    };

    this.onWindowResized = function (w, h) {

        let len = self.button.length;

        //left,right 80 px space
        let contentW = w - 160;

        let numBtn = 0;
        for (let i = 0; i < len; ++i) {
            if (self.button[i].style('display') != 'none') {
                numBtn++;
            }
        }

        let dw = contentW / numBtn;

        let idx = 0;

        for (let i = 0; i < len; ++i) {
            if (self.button[i].style('display') == 'none') continue;

            self.button[i].size(dw * 0.8, 250);
            self.button[i].position(80 + (idx) * dw * 0.8 + (idx * 2 + 1) * dw * 0.1, 260);
            idx++;
        }
    };
}