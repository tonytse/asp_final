let gSceneManager = null;
let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;
let gDialogManager = null;
let gMultipleChoice = null;
let gGameDataManager = null;

function preload() {
    gGameDataManager = new GameDataManager();
    gSceneManager = new SceneManager()
    gSpriteManager = new SpriteManager();
    gPlayerManager = new PlayerManager();
    gInputManager = new InputManager();
    gDialogManager = new DialogManager();
    gMultipleChoice = new MultipleChoiceManager();
    gStageManager = new StageManager();

    gInputManager.preload();
    gDialogManager.preload();
    gSpriteManager.preload();
    gPlayerManager.preload();
    gStageManager.preload();

}

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
    //gStageManager.changeStage(new StageGameB(2));
    //gStageManager.changeStage(new StageEnd());
    //gStageManager.changeStage(new StageGameA());
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

}

function mouseMoved() {
    gStageManager.onMouseMoved();
}

function mouseDragged() {
    gStageManager.onMouseDragged();
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