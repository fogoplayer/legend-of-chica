//JS module for the amnesia Scene

import level from '../level.js';

import chica from '../../sprites/chica/chica.js';
import bbb from '../../sprites/bbb/bbb.js';
import tbt from '../../sprites/tbt/tbt.js';

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
        level.initialize(this);
    }
    
    /**
     * Preload for Amnesia
     * @param null
     * @return null
    **/
    async preload() {
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
                    resolve();
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
        
        level.changeLevel('Tutorial', this);
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