//JS module for the tutorial Scene
import chica from '../../sprites/chica/chica.js';
import bbb from '../../sprites/bbb/bbb.js';

import Hud from '../../assets/combatHud/combatHud.js';
import Dialogue from '../../assets/dialogue/dialogue.js';
import combat from '../../assets/combat/combat.js';

import Intro from '../amnesia/amnesia.js'

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
    async create() {
        let map = this.add.image(0,0,'map').setOrigin(0,0).setScale(2.4);
        
        this.scene.add('Hud', Hud);
        combat.createCombat(this, chica, bbb);
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
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
        ]);
        
        await this.combatAcceptsOnly('Defend');
        
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
                char: 'Tiny Box Tim',
                text: 'That was too close!'
            },
            {
                char: 'Tiny Box Tim',
                text: 'Alright, now you need to counter. A tail\nWHAP should do the trick!'
            },
        ]);
        
        await this.combatAcceptsOnly('Whap');
        
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
                char: 'Chica',
                text: 'Ow, ow, OW!'
            },
            {
                char: 'Tiny Box Tim',
                text: 'Oh, no, Chica! Here, use this doggie treat.'
            },
        ]);
        
        await this.combatAcceptsOnly('Doggie Treat');
        
        await Dialogue.dialogueConstructorWithPromise(this, [
            {
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
        ]);
        
        await this.combatAcceptsOnly('Cuteness');
        
        this.scene.manager.remove('Level');
        setTimeout(() => {
            this.scene.add('Intro', new Intro());
        },1);
    }
    
    /**
     * Update for Tutorial
     * Calls chica.updateInBattle() and bbb.updateInBattle()
     * @param null
     * @return null
    **/
    update() {
        // chica.updateInBattle(this);
        // bbb.updateInBattle(this);
        //this.updateDialogue();
    }
    
    /**
     * This function allows tutorial mode to only accept specific moves
     * @param attack-The required move
     * @return Promise
    **/
    combatAcceptsOnly(move){
        return new Promise((resolve, reject) => {
            //Make resolve callable from combat and limit action options
            combat.resolve = resolve;
            combat.attackLimiter = move;
                                                                        console.log('AttackLimiter:',combat.attackLimiter)
            //Intercept hitting the enter key
            // this.input.keyboard.on('keydown', () => {
            //     this.input.keyboard.removeListener('keydown_ENTER');
            //     this.input.keyboard.on('keydown_ENTER', () => {
            //         console.log('ENTER')
            //     })
                
            //     setTimeout(()=>{
            //         resolve();
            //     },10000);
            // });
            
        });
    }
    
    /**
     * Sets up the dialogue train for this scene
     * @param null
     * @return null
    **/
    // updateDialogue() {
    //     const _this = this;
    //     if (this.stage === 2) {
    //         this.scene.add('Dialogue', new Dialogue([{
    //                 char: 'Tiny Box Tim',
    //                 text: 'That was too close!'
    //             },
    //             {
    //                 char: 'Tiny Box Tim',
    //                 text: 'Alright, now you need to counter. A tail\nWHAP should do the trick!'
    //             },
    //         ]));
    //     }
    
    //     if (this.stage === 4) {
    //         this.scene.add('Dialogue', new Dialogue([{
    //                 char: 'Chica',
    //                 text: 'Ow, ow, OW!'
    //             },
    //             {
    //                 char: 'Tiny Box Tim',
    //                 text: 'Oh, no, Chica! Here, use this dog treat.'
    //             },
    //         ]));
    //     }
    
    //     if (this.stage === 6) {
    //         this.scene.add('Dialogue', new Dialogue([{
    //                 char: 'Tiny Box Tim',
    //                 text: 'Ack! Chica, this calls for desperate measures.'
    //             },
    //             {
    //                 char: 'Tiny Box Tim',
    //                 text: 'Chica, KILL HIM WITH CUTENESS!!!!'
    //             },
    //             {
    //                 char: 'Big Box Barry',
    //                 text: 'RAAAAAWGH!!!'
    //             },
    //         ]));
    //     }
    // }
}