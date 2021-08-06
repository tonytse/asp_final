let gSceneManager = null;
let gStageManager = null;
let gPlayerManager = null;
let gSpriteManager = null;
let gInputManager = null;
let gDialogManager = null;

function preload() {

	gSceneManager = new SceneManager()
	gSpriteManager = new SpriteManager();
	gPlayerManager = new PlayerManager();
	gInputManager = new InputManager();
	gDialogManager = new DialogManager();
    
	gStageManager = new StageManager();

	gDialogManager.preload();
	gSpriteManager.preload();
	gPlayerManager.preload();
    
}

function getScreenSize() {

    let w = 800; 
    let h = 600;

    if( windowWidth > 800 && windowHeight > 600 )
    {
        if( windowWidth/4 < windowHeight/3 ) {
            w = windowWidth;
            h = windowWidth / 4 * 3;
        }else {
            w = windowHeight /3 * 4
            h = windowHeight;
        }
    }
    
    return {w,h};
}

function setup() {
    let { w, h } = getScreenSize();

    createCanvas(w,h);
    gSceneManager.init(w, h);
    gStageManager.start();
}

function draw() {
	clear();

	gSceneManager.onDraw();
	gPlayerManager.onDrawVirusBar();

	gInputManager.onUpdate();
	gStageManager.onDraw();
	gPlayerManager.onDraw();

	gDialogManager.onDraw();

}

function windowResized() {
    let { w, h } = getScreenSize();
	resizeCanvas(w, h);
    camera.position.x = width/2;
    camera.position.y = height/2;
    
}