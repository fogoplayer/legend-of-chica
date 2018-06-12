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
        this.stage = 0;
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
    create() {
        let map = this.add.image(0,0,'map').setOrigin(0,0).setScale(2.4);
        
        const _this = this;
        this.sceneWidth = this.sys.game.config.width;
        this.sceneHeight = this.sys.game.config.height;
        chica.createInWorld(this, this.sceneWidth / 3, this.sceneHeight / 2);
        this.dialogue = this.scene.add('Dialogue', new Dialogue([{
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
        ]));
        
        this.input.keyboard.on('keydown_ENTER', function(){
            if (_this.stage === 1){
                bbb.createInWorld(_this, this.sceneWidth + 200, this.sceneHeight / 2);
                tbt.createInWorld(this, this.sceneWidth + 50, this.sceneHeight / 2);
            }
        },this);
        
        this.events.once('inPosition',function(){
            this.dialogue = this.scene.add('Dialogue', new Dialogue([{
                    char: 'Tiny Box Tim',
                    text: 'AHHHHHHHHHHHHHHH!!!!!!!!'
                },
                {
                    char: 'Chica',
                    text: 'Tiny Box Tim? You’re Mark’s little biscuit! I’ll save you!!!'
                },
            ]));
        },this);
        
        this.events.once('startNextLevel', function(){
            _this.scene.manager.remove('Level');
            setTimeout(function(){
                console.log(_this);
                _this.scene.add('Tutorial', new Tutorial());
                /*
                You'd think this line doesn't do anything.
                You'd be right.
                At this point in time, Amnesia has been removed, and Tutorial doesn't have any listeners yet.
                In fact, the browser throws an error that it `can't removeAllListeners of undefined`
                But for some reason, if this line isn't here, things don't load correctly in Tutorial. So it stays.
                I really should figure out why and fix it.
                
                //throw "For some reason, if this line isn't here, things don't load correctly in Tutorial. So it stays."
                //_this.input.keyboard.removeAllListeners();
                //_this.scene.start('Tutorial');*/
            },100);
        });
    }
    
    /**
     * Update for Amnesia
     * Calls bbb.updateInWorld() and tbt.updateInWorld()
     * Chica has no updateInWorld function because (right now at least) movement is handled by her createInWorld() function
     * @param null
     * @return null
    **/
    update() {
        bbb.updateInWorld(this, this.sceneWidth /2 - 100, this.sceneHeight/2 );
        tbt.updateInWorld(this, this.sceneWidth /2 - 50, this.sceneHeight/2 );
        if(this.stage === 2){
            this.events.emit('startNextLevel');
        }
    }
}