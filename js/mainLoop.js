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
	//gDialogSystem = new DialogSystem();
	gUIManager = new UIManager();

	gUIManager.preload();
	gSpriteManager.preload();
	gPlayerManager.preload();
    
	//let dialogJSON = loadJSON('test.json');
    gUIManager.loadDialog( 'assets/gameData/test.json' );

	//gDialogSystem.init(dialogJSON);


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

	//gDialogSystem.onDraw();
	gPlayerManager.onDraw();

	gUIManager.onDraw();

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}