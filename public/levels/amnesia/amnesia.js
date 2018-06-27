//JS module for the amnesia Scene
import chica from '../../sprites/chica/chica.js';
import bbb from '../../sprites/bbb/bbb.js';
import tbt from '../../sprites/tbt/tbt.js';

import Dialogue from '../../assets/dialogue/dialogue.js';

import Tutorial from '../../levels/tutorial/tutorial.js';

export default class Amnesia extends Phaser.Scene {
    
    /**
     * Constructor for Amnesia
     * @param null
     * @return null
    **/
    constructor() {
        super({
            key: 'Level'
        });
        Phaser.Scene.call(this, {
            key: 'Level',
            active: true
        });
    }
    
    /**
     * Preload for Amnesia
     * @param null
     * @return null
    **/
    preload() {
        chica.preload(this);
        bbb.preload(this);
        tbt.preload(this);
        this.load.image('map', './levels/amnesia/amnesia.png');
    }
    
    /**
     * Create for Amnesia
     * @param null
     * @return null
    **/
    async create() {
        let map = this.add.image(0,0,'map').setOrigin(0,0).setScale(2.4);
        
        const _this = this;
        this.sceneWidth = this.sys.game.config.width;
        this.sceneHeight = this.sys.game.config.height;
        chica.createInWorld(this, this.sceneWidth / 3, this.sceneHeight / 2);
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
                char: 'Chica',
                text: 'Wooooof…'
            },
            {
                char: 'Chica',
                text: 'Where am I?'
            },
            {
                char: '???',
                text: 'Come on, Barry, leave me alone!'
            },
            {
                char: 'Chica',
                text: 'Who\'s that?'
            },
        ]);
        
        
        await (() => {
            return new Promise((resolve, reject)=> {
                bbb.createInWorld(this, this.sceneWidth + 200, this.sceneHeight / 2);
                tbt.createInWorld(this, this.sceneWidth + 50, this.sceneHeight / 2);
                
                this.events.on('inPosition',function(){
                    console.log('Success');
                    resolve('Success');
                });
            });
        })();
            
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
                char: 'Tiny Box Tim',
                text: 'AHHHHHHHHHHHHHHH!!!!!!!!'
            },
            {
                char: 'Chica',
                text: 'Tiny Box Tim? You’re Mark’s little biscuit! I’ll save you!!!'
            },
        ]);
        
        _this.scene.manager.remove('Level');
        setTimeout(function(){
            console.log(_this);
            _this.scene.add('Tutorial', new Tutorial());
        },1);
    }
    
    /**
     * Update for Amnesia
     * Calls bbb.updateInWorld() and tbt.updateInWorld()
     * Chica has no updateInWorld function because (right now at least) movement is handled by her createInWorld() function
     * @param null
     * @return null
    **/
    update() {
        bbb.updateInWorld(this);
        tbt.updateInWorld(this);
    }
}