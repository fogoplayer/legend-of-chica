//JS module for the tutorial Scene
import chica from '../../sprites/chica/chica.js';
import bbb from '../../sprites/bbb/bbb.js';
import Dialogue from '../../assets/dialogue/dialogue.js';
import combat from '../../assets/combat/combat.js';
import Hud from '../../assets/combatHud/combatHud.js';

export default class Tutorial extends Phaser.Scene {
    
    /**
     * Constructor for Tutorial
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
     * Preload for Tutorial
     * @param null
     * @return null
    **/
    preload() {
        chica.preload(this);
        bbb.preload(this);
        this.load.image('map', './levels/amnesia/amnesia.png');
    }
    
    /**
     * Create for Tutorial
     * Calls chica.createInBattle() and combat.createCombat(), which creates the enemy
     * @param null
     * @return null
    **/
    create() {
        let map = this.add.image(0,0,'map').setOrigin(0,0).setScale(2.4);
        
        this.scene.add('Hud', Hud);
        combat.createCombat(this, chica, bbb);
        //this.createKeyControls();
        //this.updateDialogue();
        this.scene.add('Dialogue', new Dialogue([{
                char: 'Tiny Box Tim',
                text: 'Chica? Do you even know how to fight?'
            },
            {
                char: 'Chica',
                text: '...No.'
            },
            {
                char: 'Big Box Barry',
                text: "GRRRRRRRR!!! I WILL CRUSH YOU, TINY BOX TIM!!!"
            },
            {
                char: 'Tiny Box Tim',
                text: 'AHHH! Quick, defend!'
            },
        ]));
        this.dialogScene = this.scene.get('Dialogue');
        //chica.updateInBattle();
    }
    
    /**
     * Update for Tutorial
     * Calls chica.updateInBattle() and bbb.updateInBattle()
     * @param null
     * @return null
    **/
    update() {
        //chica.updateInBattle(this);
        bbb.updateInBattle(this);
        this.updateDialogue();
    }
    
    /**
     * Sets up the dialogue train for this scene
     * @param null
     * @return null
    **/
    updateDialogue() {
        const _this = this;
        if (this.stage === 2) {
            this.scene.add('Dialogue', new Dialogue([{
                    char: 'Tiny Box Tim',
                    text: 'That was too close!'
                },
                {
                    char: 'Tiny Box Tim',
                    text: 'Alright, now you need to counter. A tail\nWHAP should do the trick!'
                },
            ]));
        }
    
        if (this.stage === 4) {
            this.scene.add('Dialogue', new Dialogue([{
                    char: 'Chica',
                    text: 'Ow, ow, OW!'
                },
                {
                    char: 'Tiny Box Tim',
                    text: 'Oh, no, Chica! Here, use this dog treat.'
                },
            ]));
        }
    
        if (this.stage === 6) {
            this.scene.add('Dialogue', new Dialogue([{
                    char: 'Tiny Box Tim',
                    text: 'Ack! Chica, this calls for desperate measures.'
                },
                {
                    char: 'Tiny Box Tim',
                    text: 'Chica, KILL HIM WITH CUTENESS!!!!'
                },
                {
                    char: 'Big Box Barry',
                    text: 'RAAAAAWGH!!!'
                },
            ]));
        }
    }
}