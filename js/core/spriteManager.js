function SpriteManager() {

    let self = this;
    this.player = null;
    this.maskPlayer = null;
    this.redBoy = null;
    this.cowBoy = null;
    this.cowGirl = null;
    this.girl = null;
    this.characterScale = windowWidth * 0.0004;


    this.preload = function () {

        self.player = createSprite(300, 300, 614, 307);

        //https://www.gameart2d.com/the-boy---free-sprites.html
        self.player.addAnimation('Idle',
            'assets/characters/player/Idle0001.png', 'assets/characters/player/Idle0002.png', 'assets/characters/player/Idle0003.png', 'assets/characters/player/Idle0004.png', 'assets/characters/player/Idle0005.png',
            'assets/characters/player/Idle0006.png', 'assets/characters/player/Idle0007.png', 'assets/characters/player/Idle0008.png', 'assets/characters/player/Idle0009.png', 'assets/characters/player/Idle0010.png',
            'assets/characters/player/Idle0011.png', 'assets/characters/player/Idle0012.png', 'assets/characters/player/Idle0013.png', 'assets/characters/player/Idle0014.png', 'assets/characters/player/Idle0015.png');
        self.player.addAnimation('Walk',
            'assets/characters/player/Walk0001.png', 'assets/characters/player/Walk0002.png', 'assets/characters/player/Walk0003.png', 'assets/characters/player/Walk0004.png', 'assets/characters/player/Walk0005.png',
            'assets/characters/player/Walk0006.png', 'assets/characters/player/Walk0007.png', 'assets/characters/player/Walk0008.png', 'assets/characters/player/Walk0009.png', 'assets/characters/player/Walk0010.png',
            'assets/characters/player/Walk0011.png', 'assets/characters/player/Walk0012.png', 'assets/characters/player/Walk0013.png', 'assets/characters/player/Walk0014.png', 'assets/characters/player/Walk0015.png');
        self.player.offY = 18;
        self.player.scale = self.characterScale

        self.maskPlayer = createSprite(300, 300, 614, 307);
        self.maskPlayer.addAnimation('Idle',
            'assets/characters/mask_player/Idle0001.png', 'assets/characters/mask_player/Idle0002.png', 'assets/characters/mask_player/Idle0003.png', 'assets/characters/mask_player/Idle0004.png', 'assets/characters/mask_player/Idle0005.png',
            'assets/characters/mask_player/Idle0006.png', 'assets/characters/mask_player/Idle0007.png', 'assets/characters/mask_player/Idle0008.png', 'assets/characters/mask_player/Idle0009.png', 'assets/characters/mask_player/Idle0010.png',
            'assets/characters/mask_player/Idle0011.png', 'assets/characters/mask_player/Idle0012.png', 'assets/characters/mask_player/Idle0013.png', 'assets/characters/mask_player/Idle0014.png', 'assets/characters/mask_player/Idle0015.png');
        self.maskPlayer.addAnimation('Walk',
            'assets/characters/mask_player/Walk0001.png', 'assets/characters/mask_player/Walk0002.png', 'assets/characters/mask_player/Walk0003.png', 'assets/characters/mask_player/Walk0004.png', 'assets/characters/mask_player/Walk0005.png',
            'assets/characters/mask_player/Walk0006.png', 'assets/characters/mask_player/Walk0007.png', 'assets/characters/mask_player/Walk0008.png', 'assets/characters/mask_player/Walk0009.png', 'assets/characters/mask_player/Walk0010.png',
            'assets/characters/mask_player/Walk0011.png', 'assets/characters/mask_player/Walk0012.png', 'assets/characters/mask_player/Walk0013.png', 'assets/characters/mask_player/Walk0014.png', 'assets/characters/mask_player/Walk0015.png');
        self.maskPlayer.offY = 18;
        self.maskPlayer.scale = self.characterScale

        self.redBoy = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/red-hat-boy-free-sprites.html
        self.redBoy.addAnimation('Idle',
            'assets/characters/red_hat_boy/Idle0001.png', 'assets/characters/red_hat_boy/Idle0002.png', 'assets/characters/red_hat_boy/Idle0003.png', 'assets/characters/red_hat_boy/Idle0004.png', 'assets/characters/red_hat_boy/Idle0005.png',
            'assets/characters/red_hat_boy/Idle0006.png', 'assets/characters/red_hat_boy/Idle0007.png', 'assets/characters/red_hat_boy/Idle0008.png', 'assets/characters/red_hat_boy/Idle0009.png', 'assets/characters/red_hat_boy/Idle0010.png');
        self.redBoy.addAnimation('Walk',
            'assets/characters/red_hat_boy/Run0001.png', 'assets/characters/red_hat_boy/Run0002.png', 'assets/characters/red_hat_boy/Run0003.png', 'assets/characters/red_hat_boy/Run0004.png', 'assets/characters/red_hat_boy/Run0005.png',
            'assets/characters/red_hat_boy/Run0006.png', 'assets/characters/red_hat_boy/Run0007.png', 'assets/characters/red_hat_boy/Run0008.png');
        self.redBoy.offY = 18;
        self.redBoy.scale = self.characterScale

        self.cowBoy = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/temple-run---free-sprites.html
        self.cowBoy.addAnimation('Idle',
            'assets/characters/cowboy/Idle0001.png', 'assets/characters/cowboy/Idle0002.png', 'assets/characters/cowboy/Idle0003.png', 'assets/characters/cowboy/Idle0004.png', 'assets/characters/cowboy/Idle0005.png',
            'assets/characters/cowboy/Idle0006.png', 'assets/characters/cowboy/Idle0007.png', 'assets/characters/cowboy/Idle0008.png', 'assets/characters/cowboy/Idle0009.png', 'assets/characters/cowboy/Idle0010.png');
        self.cowBoy.addAnimation('Walk',
            'assets/characters/cowboy/Run0001.png', 'assets/characters/cowboy/Run0002.png', 'assets/characters/cowboy/Run0003.png', 'assets/characters/cowboy/Run0004.png', 'assets/characters/cowboy/Run0005.png',
            'assets/characters/cowboy/Run0006.png', 'assets/characters/cowboy/Run0007.png', 'assets/characters/cowboy/Run0008.png', 'assets/characters/cowboy/Run0009.png', 'assets/characters/cowboy/Run0010.png');
        self.cowBoy.offY = 18;
        self.cowBoy.scale = self.characterScale

        self.cowGirl = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/adventurer-girl---free-sprites.html
        self.cowGirl.addAnimation('Idle',
            'assets/characters/cowgirl/Idle0001.png', 'assets/characters/cowgirl/Idle0002.png', 'assets/characters/cowgirl/Idle0003.png', 'assets/characters/cowgirl/Idle0004.png', 'assets/characters/cowgirl/Idle0005.png',
            'assets/characters/cowgirl/Idle0006.png', 'assets/characters/cowgirl/Idle0007.png', 'assets/characters/cowgirl/Idle0008.png', 'assets/characters/cowgirl/Idle0009.png', 'assets/characters/cowgirl/Idle0010.png');
        self.cowGirl.addAnimation('Walk',
            'assets/characters/cowgirl/Run0001.png', 'assets/characters/cowgirl/Run0002.png', 'assets/characters/cowgirl/Run0003.png', 'assets/characters/cowgirl/Run0004.png', 'assets/characters/cowgirl/Run0005.png',
            'assets/characters/cowgirl/Run0006.png', 'assets/characters/cowgirl/Run0007.png', 'assets/characters/cowgirl/Run0008.png');
        self.cowGirl.offY = 18;
        self.cowGirl.scale = self.characterScale

        self.girl = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/cute-girl-free-sprites.html
        self.girl.addAnimation('Idle',
            'assets/characters/girl/Idle0001.png', 'assets/characters/girl/Idle0002.png', 'assets/characters/girl/Idle0003.png', 'assets/characters/girl/Idle0004.png', 'assets/characters/girl/Idle0005.png',
            'assets/characters/girl/Idle0006.png', 'assets/characters/girl/Idle0007.png', 'assets/characters/girl/Idle0008.png', 'assets/characters/girl/Idle0009.png', 'assets/characters/girl/Idle0010.png',
            'assets/characters/girl/Idle0011.png', 'assets/characters/girl/Idle0012.png', 'assets/characters/girl/Idle0013.png', 'assets/characters/girl/Idle0014.png', 'assets/characters/girl/Idle0015.png', 'assets/characters/girl/Idle0016.png');
        self.girl.addAnimation('Walk',
            'assets/characters/girl/Walk0001.png', 'assets/characters/girl/Walk0002.png', 'assets/characters/girl/Walk0003.png', 'assets/characters/girl/Walk0004.png', 'assets/characters/girl/Walk0005.png',
            'assets/characters/girl/Walk0006.png', 'assets/characters/girl/Walk0007.png', 'assets/characters/girl/Walk0008.png', 'assets/characters/girl/Walk0009.png', 'assets/characters/girl/Walk0010.png',
            'assets/characters/girl/Walk0011.png', 'assets/characters/girl/Walk0012.png', 'assets/characters/girl/Walk0013.png', 'assets/characters/girl/Walk0014.png', 'assets/characters/girl/Walk0015.png', 'assets/characters/girl/Walk0016.png', 'assets/characters/girl/Walk0017.png', 'assets/characters/girl/Walk0018.png', 'assets/characters/girl/Walk0019.png', 'assets/characters/girl/Walk0020.png');

        self.girl.offY = 18;
        self.girl.scale = self.characterScale

    }
}