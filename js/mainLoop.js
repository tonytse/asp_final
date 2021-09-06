let gSceneManager = null;
let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;
let gDialogManager = null;
let gMultipleChoice = null;
let gGameDataManager = null;
let gAudioManager = null;

function preload() {
    //! Create core functions
    gGameDataManager = new GameDataManager();
    gSceneManager = new SceneManager()
    gSpriteManager = new SpriteManager();
    gPlayerManager = new PlayerManager();
    gInputManager = new InputManager();
    gDialogManager = new DialogManager();
    gMultipleChoice = new MultipleChoiceManager();
    gStageManager = new StageManager();
    gAudioManager = new AudioManager();

    //! Preload core functions
    gDialogManager.preload();
    gSpriteManager.preload();
    gPlayerManager.preload();
    gAudioManager.preload();
}

//! The the 4:3 screen size with min. 800 x 600 
function getScreenSize() {

    let w = 800;
    let h = 600;

    if (windowWidth > 800 && windowHeight > 600) {
        if (windowWidth / 4 < windowHeight / 3) {
            w = windowWidth;
            h = windowWidth / 4 * 3;
        } else {
            w = windowHeight / 3 * 4
            h = windowHeight;
        }
    }

    return { w, h };
}


function setup() {
    let { w, h } = getScreenSize();

    createCanvas(w, h);
    gSceneManager.init(w, h);
    gStageManager.start();
}

function draw() {
    clear();

    let w = gSceneManager.width;
    let h = gSceneManager.height;

    gInputManager.onUpdate();

    gSceneManager.onDraw(w, h);
    gStageManager.onDraw(w, h);
    gPlayerManager.onDraw(w, h);

    gDialogManager.onDraw(w, h);
    gMultipleChoice.onDraw(w, h);

    gStageManager.onDrawOverlay(w, h);

    gPlayerManager.onDrawVirusBar(w, h);

    gAudioManager.keepPlay();

}

function mouseMoved() {
    gStageManager.onMouseMoved();
}

function mouseDragged() {
    gStageManager.onMouseDragged();
}

function mouseReleased() {
    gStageManager.mouseReleased();
}

function windowResized() {
    let { w, h } = getScreenSize();
    resizeCanvas(w, h);
    camera.position.x = width / 2;
    camera.position.y = height / 2;

    gSceneManager.onWindowResized(w, h);
    gStageManager.onWindowResized(w, h);

    gDialogManager.onWindowResized(w, h);
    gMultipleChoice.onWindowResized(w, h);

}

function touchStarted() {
    gStageManager.touchStarted();
}
