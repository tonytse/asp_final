let gSceneManager = null;
let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;
let dialogJSON = null;
let dialogFont = null;
let button;
function preload() {

	gSceneManager = new SceneManager()
	gSpriteManager = new SpriteManager();
	gStageManager = new StageManager();
	gPlayerManager = new PlayerManager();
	gInputManager = new InputManager();
	gDialogSystem = new DialogSystem();
	gSpriteManager.preload();

	dialogJSON = loadJSON('test.json');
	dialogFont = loadFont("..\\assets\\fonts\\CabinSketch-Regular.ttf");

	button = createButton('NEXT');
	button.position(windowWidth - 150, windowHeight - 90);
	button.size(100, 50);
	button.id('dialogButton');


	gUIManager = new UIManager();

	gUIManager.preload();
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

	drawSprites();

	gDialogSystem.init(dialogJSON);
	gDialogSystem.onDraw();



	gPlayerManager.onDraw();

	gUIManager.onDraw();

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}