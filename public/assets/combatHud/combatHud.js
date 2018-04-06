//JS module for the Hud Scene
import chica from '../../sprites/chica/chica.js';
import actionOptions from './actionOptions/actionOptions.js';

class Hud extends Phaser.Scene {
    constructor(){
        super({key:'Hud'});
        Phaser.Scene.call(this, { key: 'Hud', active: true });
    }
    
    preload(){
        
    }
    
    create(){
        //createPlayerHealth();
        actionOptions.create(this);
    }
    
    update(){
        this.healthText.setText(`Health: ${ chica.health }`);
    }
    
    createPlayerHealth(){
        this.healthText = _this.add.text(0, 0, `Health: ${ chica.health }`, { fontSize: '32px', fill: '#ffffff', color: '#ffffff' });
        this.healthText.setOrigin(0, 0);
    }
}

export default Hud;