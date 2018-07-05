//JS module for the Hud Scene
import chica from '../../sprites/chica/chica.js';
import actionOptions from './actionOptions.js';

class Hud extends Phaser.Scene {
    /**
     * Constructor for the HUD
     * @param null
     * @return null
    **/
    constructor() {
        super({
            key: 'Hud'
        });
        Phaser.Scene.call(this, {
            key: 'Hud',
            active: true
        });
    }
    
    /**
     * Create function for the HUD
     * Creates rectangle overlay, then calls actionOptions.create() and chica.createInBattle() to add them
     * @param null
     * @return null
    **/
    create() {
        //Create graphics
        const height = this.sys.game.config.height;
        const width = this.sys.game.config.width;
        const graphics = this.add.graphics();
        graphics.fillStyle(0x888888, 1);
        graphics.fillRect(0, height * 2 / 3, width, height * 1 / 3);

        //Create Children
        actionOptions.create(this);
        chica.createInBattle(this);
    }

    update() {
                combat.update(this);
    }
}

export default Hud;