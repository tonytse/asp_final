

function SpriteManager() {
    let self = this;


    let explode_sprite_sheet;
    let explode_animation;

    this.preload = function () {
        print( 'SpriteManager reload')
        
        self.explode_sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);
        self.explode_animation = loadAnimation(self.explode_sprite_sheet);

    }

  
}