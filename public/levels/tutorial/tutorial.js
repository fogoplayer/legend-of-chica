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
        
        this.scene.manager.remove('Level');
        setTimeout(() => {
            this.scene.add('Intro', new Intro());
        },1);
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
        });
    }
}