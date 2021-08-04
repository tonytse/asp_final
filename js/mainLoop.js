let gSceneManager = null;
let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;

function preload() {

    gSceneManager = new SceneManager()
	gSpriteManager = new SpriteManager();
	gStageManager = new StageManager();
	gPlayerManager = new PlayerManager();
	gInputManager = new InputManager();

	gSpriteManager.preload();
    gPlayerManager.preload();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	clear();

    gSceneManager.onDraw();
    gPlayerManager.onDrawVirusBar();

	gInputManager.onUpdate();
	gStageManager.onDraw();

    gPlayerManager.onDraw();
	
	
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}