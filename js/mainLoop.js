let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;

function preload() {

	gSpriteManager = new SpriteManager();
	gStageManager = new StageManager();
	gPlayerManager = new PlayerManager();
	gInputManager = new InputManager();

	gSpriteManager.preload();

}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	clear();

	gInputManager.onUpdate();
	gStageManager.onDraw();


	drawSprites();
	
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}