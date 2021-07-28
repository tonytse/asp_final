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
	print('setup');

	createCanvas(800, 225);
}

function draw() {
	clear();

	gInputManager.onUpdate();
	gStageManager.onDraw();

	// animate the sprite sheet
	//animation(explode_animation, 100, 130);

	// show full sheet for example reference
	//image(sprite_sheet_image, 250, 40, 500, 154);
}

function keyPressed() {
}