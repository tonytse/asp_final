function AudioManager() {

    let self = this;
    let background = null;
    let wrong = null;
    let correct = null;
    let end = null;

    this.isEnd = false; 

    //! Load sound files
    this.preload = function () {
        soundFormats('mp3');
        background = loadSound('assets/audio/background.mp3');
        background.playMode("restart");
        background.setVolume(0.1);

        end = loadSound('assets/audio/end.mp3');
        end.setVolume(0.1);

        correct = loadSound('assets/audio/correct.wav');
        correct.setVolume(0.1);

        wrong = loadSound('assets/audio/wrong.wav');
        wrong.setVolume(0.1);
    };

    //! keep playing background music
    this.keepPlay = function () {

        if ( self.isEnd == false && background.isPlaying() == false ) {
            background.loop();
        }
    }

    this.playCorrect = function () {
        correct.play();
    }

    this.playWrong = function () {
        wrong.play();
    }

    this.playEnd = function () {
        self.isEnd = true; 
        background.stop();
        end.play();
        
    }



};