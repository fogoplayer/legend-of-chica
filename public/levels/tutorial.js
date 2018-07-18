//JS module for the tutorial Scene

import level from './level.js';
import chica from '../sprites/chica.js';
import bbb from '../sprites/bbb.js';

// import Hud from '../../systems/combatHud/combatHud.js';
// import actionOptions from '../../systems/combatHud/actionOptions/actionOptions.js';
// import Dialogue from '../../systems/dialogue.js';
// import combat from '../../systems/combat.js';

// import Intro from '../intro/intro.js';

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
        level.initialize(this, 'battle');
    }
    
    /**
     * Preload for Tutorial
     * @param null
     * @return null
    **/
    preload() {
        level.preload(this);
        chica.preload(this);
        bbb.preload(this);
        this.load.image('map', './assets/images/amnesia.png');
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
                text: 'Alright, now you need to counter. A TAIL\nWHAP should do the trick!'
            },
        ]);
        
        await this.combatAcceptsOnly('Tail Whap');
        
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
        
        level.changeLevel('Amnesia2', this);
    }
    
    /**
     * This function allows tutorial mode to only accept specific moves
     * @param attack-The required move
     * @return Promise
    **/
    combatAcceptsOnly(move){
        return new Promise((resolve, reject) => {
            console.log(1)
            //Make resolve callable from combat and limit action options
            combat.resolve = resolve;
            combat.attackLimiter = move;
            //Automatically open menu
            chica.actions.forEach((menu, menuIndex) => {
                const actionIndex = menu.children.findIndex((action)=> action.name === move);
                if (actionIndex >= 0){
                    actionOptions.openMenu(this.scene.manager.getScene('Hud'), menuIndex);
                    actionOptions.selectInMenu(this.scene.manager.getScene('Hud'), actionIndex, menuIndex);
                }
            });
        });
    }
}