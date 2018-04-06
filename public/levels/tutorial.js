//JS module for the tutorial Scene
import chica from  '../sprites/chica/chica.js';
import Dialogue from '../assets/dialogue/dialogue.js';

export default class Tutorial extends Phaser.Scene {
    constructor(){
        super({key:'Level'});
        Phaser.Scene.call(this, { key: 'Level', active: true });
        this.sceneType = 'tutorial';
        this.stage = 0;
    }
    
    preload(){
        chica.preload(this);
    }
    
    create(){
        //chica.create(this, this.sys.game.config.width/2, this.sys.game.config.height/2);
        this.createKeyControls();
        this.scene.add('Dialogue', new Dialogue([
                { char: 'Tiny Box Tim', text: 'Chica? Do you even know how to fight?' },
                { char: 'Chica', text: '...No.' },
                { char: 'Big Box Barry', text: "GRRRRRRRR!!! I WILL CRUSH YOU, TINY BOX\nTIM!!!" },
                { char: 'Tiny Box Tim',  text: 'AHHH! Quick, defend!' },
            ]));
        this.stage++
        console.log("Where will I appear?");
    }
    
    update(){
        chica.update(this);
    }
    
    createKeyControls(){
        
        this.input.keyboard.on('keydown_THREE', function() {
            if (this.stage === 1){
                console.log('Defend')
            }
        }, this);
        
    }
}