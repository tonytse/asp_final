function MultipleChoiceManager() {

    let self = this;

    this.json = null;
    this.callbackCorrect = null;
    this.callbackWrong = null;
    //this.isBlockingMode = true;
    this.stopwatch = new StopWatch();

    this.currAnimation = null;
    this.stopwatchCurrAnimation = new StopWatch();
    this.currAnimationDur = 0;
    this.isCloseAfterAnimation = false;
    this.button = [];

    this.onDraw = function () {

        //! When you draw correctAniamtion
        if( self.currAnimation ) {
            if( self.stopwatchCurrAnimation.get() > self.currAnimationDur ) {
                self.currAnimation.remove();
                self.currAnimation = null;
                
                if( self.isCloseAfterAnimation ) {
                    gDialogManager.close();
                    self.close();
                }
            }
        }
  
    };

    this.open = function (jsonFile, callbackCorrect, callbackWrong) {

        self.callbackCorrect = callbackCorrect;
        self.callbackWrong = callbackWrong;


        //self.isBlockingMode = false;

        loadJSON( jsonFile, function (json) {

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

        if(self.currAnimation ) {
            self.currAnimation.remove();
            self.currAnimation  = null;
        }
        
        if (self.json.answers[this.id()].isCorrect) {
            
            self.currAnimation = createImg("assets/multipleChoice/correct.gif",  function () {
                self.isCloseAfterAnimation = true;
                self.currAnimationDur = 2500; // TODO 
                self.stopwatchCurrAnimation.start();
            });    
            
        } else {
                
            self.currAnimation = createImg("assets/multipleChoice/tryagain.gif", function () {
                self.currAnimationDur = 2500; // TODO 
                self.stopwatchCurrAnimation.start();    
            });
            

            self.callbackWrong(this.id());
            self.button[this.id()].hide();
        }

        
        let width = gSceneManager.width;
        let height = gSceneManager.height;
        self.onWindowResized(width, height);

    }

    this.close = function () {
        self.json = null;
        //self.isBlockingMode = false;
        self.callbackWrong = null;
        self.currAnimationDur = 0;
        self.isCloseAfterAnimation = false;

        if (self.callbackCorrect) {
            self.callbackCorrect( self.stopwatch.get() );
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


        if( self.currAnimation ) {
            s = min( w,h );
            self.currAnimation.size( s, s );
            self.currAnimation.position( (w-s)/2, (h-s)/2);
        }
    };
}