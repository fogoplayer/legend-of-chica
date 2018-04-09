//JS module for the Hud Scene
import chica from '../../sprites/chica/chica.js';
import actionOptions from './actionOptions/actionOptions.js';

class Hud extends Phaser.Scene {
    constructor() {
        super({
            key: 'Hud'
        });
        Phaser.Scene.call(this, {
            key: 'Hud',
            active: true
        });
    }

    preload() {

    }

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
        
        console.log(this.scene.manager.scenes);

    }

    update() {}
}

export default Hud;