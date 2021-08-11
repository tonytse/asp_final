

function SpriteManager() {
    let self = this;
    this.player = null;
    this.redBoy = null;
    this.cowBoy = null;
    this.cowGirl = null;
    this.girl = null;


    this.explode_sprite_sheet = null;
    this.explode_animation = null;

    this.preload = function () {
        //print('SpriteManager reload')

        self.player = createSprite(300, 300, 614, 307);

        //https://www.gameart2d.com/the-boy---free-sprites.html
        self.player.addAnimation('Idle',
            'assets/player/Idle0001.png', 'assets/player/Idle0002.png', 'assets/player/Idle0003.png', 'assets/player/Idle0004.png', 'assets/player/Idle0005.png',
            'assets/player/Idle0006.png', 'assets/player/Idle0007.png', 'assets/player/Idle0008.png', 'assets/player/Idle0009.png', 'assets/player/Idle0010.png',
            'assets/player/Idle0011.png', 'assets/player/Idle0012.png', 'assets/player/Idle0013.png', 'assets/player/Idle0014.png', 'assets/player/Idle0015.png');
        self.player.addAnimation('Walk',
            'assets/player/Walk0001.png', 'assets/player/Walk0002.png', 'assets/player/Walk0003.png', 'assets/player/Walk0004.png', 'assets/player/Walk0005.png',
            'assets/player/Walk0006.png', 'assets/player/Walk0007.png', 'assets/player/Walk0008.png', 'assets/player/Walk0009.png', 'assets/player/Walk0010.png',
            'assets/player/Walk0011.png', 'assets/player/Walk0012.png', 'assets/player/Walk0013.png', 'assets/player/Walk0014.png', 'assets/player/Walk0015.png');
        self.player.offY = 18;
        self.player.scale = 0.5;

        self.redBoy = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/red-hat-boy-free-sprites.html
        self.redBoy.addAnimation('Idle',
            'assets/crowd/red_hat_boy/Idle0001.png', 'assets/crowd/red_hat_boy/Idle0002.png', 'assets/crowd/red_hat_boy/Idle0003.png', 'assets/crowd/red_hat_boy/Idle0004.png', 'assets/crowd/red_hat_boy/Idle0005.png',
            'assets/crowd/red_hat_boy/Idle0006.png', 'assets/crowd/red_hat_boy/Idle0007.png', 'assets/crowd/red_hat_boy/Idle0008.png', 'assets/crowd/red_hat_boy/Idle0009.png', 'assets/crowd/red_hat_boy/Idle0010.png');
        self.redBoy.addAnimation('Walk',
            'assets/crowd/red_hat_boy/Run0001.png', 'assets/crowd/red_hat_boy/Run0002.png', 'assets/crowd/red_hat_boy/Run0003.png', 'assets/crowd/red_hat_boy/Run0004.png', 'assets/crowd/red_hat_boy/Run0005.png',
            'assets/crowd/red_hat_boy/Run0006.png', 'assets/crowd/red_hat_boy/Run0007.png', 'assets/crowd/red_hat_boy/Run0008.png');
        self.redBoy.offY = 18;
        self.redBoy.scale = 0.5;

        self.cowBoy = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/temple-run---free-sprites.html
        self.cowBoy.addAnimation('Idle',
            'assets/crowd/cowboy/Idle0001.png', 'assets/crowd/cowboy/Idle0002.png', 'assets/crowd/cowboy/Idle0003.png', 'assets/crowd/cowboy/Idle0004.png', 'assets/crowd/cowboy/Idle0005.png',
            'assets/crowd/cowboy/Idle0006.png', 'assets/crowd/cowboy/Idle0007.png', 'assets/crowd/cowboy/Idle0008.png', 'assets/crowd/cowboy/Idle0009.png', 'assets/crowd/cowboy/Idle0010.png');
        self.cowBoy.addAnimation('Walk',
            'assets/crowd/cowboy/Run0001.png', 'assets/crowd/cowboy/Run0002.png', 'assets/crowd/cowboy/Run0003.png', 'assets/crowd/cowboy/Run0004.png', 'assets/crowd/cowboy/Run0005.png',
            'assets/crowd/cowboy/Run0006.png', 'assets/crowd/cowboy/Run0007.png', 'assets/crowd/cowboy/Run0008.png', 'assets/crowd/cowboy/Run0009.png', 'assets/crowd/cowboy/Run0010.png');
        self.cowBoy.offY = 18;
        self.cowBoy.scale = 0.5;

        self.cowGirl = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/adventurer-girl---free-sprites.html
        self.cowGirl.addAnimation('Idle',
            'assets/crowd/cowgirl/Idle0001.png', 'assets/crowd/cowgirl/Idle0002.png', 'assets/crowd/cowgirl/Idle0003.png', 'assets/crowd/cowgirl/Idle0004.png', 'assets/crowd/cowgirl/Idle0005.png',
            'assets/crowd/cowgirl/Idle0006.png', 'assets/crowd/cowgirl/Idle0007.png', 'assets/crowd/cowgirl/Idle0008.png', 'assets/crowd/cowgirl/Idle0009.png', 'assets/crowd/cowgirl/Idle0010.png');
        self.cowGirl.addAnimation('Walk',
            'assets/crowd/cowgirl/Run0001.png', 'assets/crowd/cowgirl/Run0002.png', 'assets/crowd/cowgirl/Run0003.png', 'assets/crowd/cowgirl/Run0004.png', 'assets/crowd/cowgirl/Run0005.png',
            'assets/crowd/cowgirl/Run0006.png', 'assets/crowd/cowgirl/Run0007.png', 'assets/crowd/cowgirl/Run0008.png');
        self.cowGirl.offY = 18;
        self.cowGirl.scale = 0.5;

        self.girl = createSprite(windowWidth / 40, windowHeight / 1.3, 614, 307);

        //https://www.gameart2d.com/cute-girl-free-sprites.html
        self.girl.addAnimation('Idle',
            'assets/crowd/girl/Idle0001.png', 'assets/crowd/girl/Idle0002.png', 'assets/crowd/girl/Idle0003.png', 'assets/crowd/girl/Idle0004.png', 'assets/crowd/girl/Idle0005.png',
            'assets/crowd/girl/Idle0006.png', 'assets/crowd/girl/Idle0007.png', 'assets/crowd/girl/Idle0008.png', 'assets/crowd/girl/Idle0009.png', 'assets/crowd/girl/Idle0010.png',
            'assets/crowd/girl/Idle0011.png', 'assets/crowd/girl/Idle0012.png', 'assets/crowd/girl/Idle0013.png', 'assets/crowd/girl/Idle0014.png', 'assets/crowd/girl/Idle0015.png', 'assets/crowd/girl/Idle0016.png');
        self.girl.addAnimation('Walk',
            'assets/crowd/girl/Walk0001.png', 'assets/crowd/girl/Walk0002.png', 'assets/crowd/girl/Walk0003.png', 'assets/crowd/girl/Walk0004.png', 'assets/crowd/girl/Walk0005.png',
            'assets/crowd/girl/Walk0006.png', 'assets/crowd/girl/Walk0007.png', 'assets/crowd/girl/Walk0008.png', 'assets/crowd/girl/Walk0009.png', 'assets/crowd/girl/Walk0010.png',
            'assets/crowd/girl/Walk0011.png', 'assets/crowd/girl/Walk0012.png', 'assets/crowd/girl/Walk0013.png', 'assets/crowd/girl/Walk0014.png', 'assets/crowd/girl/Walk0015.png', 'assets/crowd/girl/Walk0016.png', 'assets/crowd/girl/Walk0017.png', 'assets/crowd/girl/Walk0018.png', 'assets/crowd/girl/Walk0019.png', 'assets/crowd/girl/Walk0020.png');

        self.girl.offY = 18;
        self.girl.scale = 0.5;

        //self.explode_sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);
        //self.explode_animation = loadAnimation(self.explode_sprite_sheet);


        //#1 http://unluckystudio.com/free-game-artassets-16-side-view-cars-assets/
        //#2 https://www.vecteezy.com/vector-art/126596-free-office-vector-design
        // https://www.vecteezy.com/vector-art/1384664-office-workspace-interior
        // https://www.vecteezy.com/vector-art/362972-interior-modern-living-room-with-furniture-flat-design-vector-illustration
        // https://www.vecteezy.com/vector-art/1266860-set-of-wooden-interior-door-s

        // #3 https://www.vecteezy.com/vector-art/173715-bathroom-layout-vector  washroom
        // $4 super market https://www.vecteezy.com/vector-art/173153-free-shopping-center-vector-illustration
        // GUI / NPC: https://www.gameart2d.com/freebies.html

        // inside super market bg: https://www.vecteezy.com/vector-art/1254668-woman-with-an-eco-friendly-bag-at-food-store

    }


}