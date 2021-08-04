let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;
let dialogJSON = null;
let dialogFont = null;
let button;
function preload() {

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


}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	clear();

	gInputManager.onUpdate();
	gStageManager.onDraw();

	drawSprites();

	gDialogSystem.init(dialogJSON);
	gDialogSystem.onDraw();



}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}