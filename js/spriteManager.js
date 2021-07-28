

function SpriteManager() {
    let self = this;
    this.player = null;


    this.explode_sprite_sheet = null;
    this.explode_animation = null;

    this.preload = function () {
        print('SpriteManager reload')

        self.player = createSprite(300, 300, 614, 307);

        self.player.addAnimation('Idle', 
            'assets/player/Idle0001.png',
            'assets/player/Idle0002.png',
            'assets/player/Idle0003.png',
            'assets/player/Idle0004.png',
            'assets/player/Idle0005.png',
            'assets/player/Idle0006.png',
            'assets/player/Idle0007.png',
            'assets/player/Idle0008.png',
            'assets/player/Idle0009.png',
            'assets/player/Idle0010.png',
            'assets/player/Idle0011.png',
            'assets/player/Idle0012.png',
            'assets/player/Idle0013.png',
            'assets/player/Idle0014.png',
            'assets/player/Idle0015.png');
        self.player.addAnimation('Walk',
            'assets/player/Walk0001.png',
            'assets/player/Walk0002.png',
            'assets/player/Walk0003.png',
            'assets/player/Walk0004.png',
            'assets/player/Walk0005.png',
            'assets/player/Walk0006.png',
            'assets/player/Walk0007.png',
            'assets/player/Walk0008.png',
            'assets/player/Walk0009.png',
            'assets/player/Walk0010.png',
            'assets/player/Walk0011.png',
            'assets/player/Walk0012.png',
            'assets/player/Walk0013.png',
            'assets/player/Walk0014.png',
            'assets/player/Walk0015.png');
        self.player.offY = 18;

        //self.explode_sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);
        //self.explode_animation = loadAnimation(self.explode_sprite_sheet);

    }


}