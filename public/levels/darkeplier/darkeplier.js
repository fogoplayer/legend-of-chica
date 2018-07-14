//JS module for the Intro Scene

import level from '../level.js';

import chica from '../../sprites/chica/chica.js';

export default class Darkeplier extends Phaser.Scene {
    
    /**
     * Constructor for Intro
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
     * Preload for Intro
     * @param null
     * @return null
    **/
    preload() {
        level.preload(this);
        this.load.audio('mark', './music/mark.mp3');
    }
    
    /**
     * Create for Amnesia
     * @param null
     * @return null
    **/
    async create() {
        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: '[shakes] Well, I think I\'ve finally gotten used to that glitch door.'
        }, {
            char: 'Chica',
            text: '[Curious] So, who are we saving here?'
        }, {
            char: 'Glitch TBT:',
            text: 'About that...'
        }, {
            char: '???',
            text: 'WHO DARES COME HERE?'
        }, {
            char: 'Chica',
            text: '[spooked] WAH! Who was that?'
        }, {
            char: 'Glitch TBT:',
            text: 'the last piece of the puzzle.'
        }, {
            char: 'Glitch TBT:',
            text: 'that\'s Darkiplier.'
        }, {
            char: 'Darkiplier',
            text: '[materializes, very suave] My sincerest apologies. I wasn\'t expecting... guests. If I may, why are you here?'
        }, {
            char: 'Glitch TBT:',
            text: '[very scared] Um... we need your... well, we need your-'
        }, {
            char: 'Darkiplier',
            text: 'Help?'
        }, {
            char: 'Darkiplier',
            text: 'Heh. Figures.'
        }, {
            char: 'Darkiplier',
            text: 'I don\'t do the whole... helping thing.'
        }, {
            char: 'Chica',
            text: 'But we need you!'
        }, {
            char: 'Darkiplier',
            text: '[RAGE™] IF YOU ASK AGAIN-'
        }, {
            char: 'Darkiplier',
            text: '[Calm again] If you ask again, one of you will pay the price.'
        }, {
            char: '',
            text: '[Darkiplier glitches off-screen. Chica runs to where he was]'
        }, {
            char: 'Chica',
            text: 'Darkiplier, wait!'
        }, {
            char: 'Glitch TBT:',
            text: '[Scared] Well, I guess we have to go find him now.'
        }, {
            char: 'Chica',
            text: 'Right!'
        }, {
            char: '',
            text: '[Player plays game]'
        }, {
            char: '',
            text: '[Player finds Darkiplier at some point in the level that is yet to be determined]'
        }, {
            char: 'Glitch TBT:',
            text: 'Hey, it\'s Darkiplier!'
        }, {
            char: '',
            text: '[Darkiplier notices them]'
        }, {
            char: 'Darkiplier',
            text: '[Character sprite is straighten tie and stretching neck] Don\'t say I didn\'t warn you...'
        }, {
            char: '',
            text: '[Glitch TBT glitches further]'
        }, {
            char: 'Glitch TBT:',
            text: '[Extra glitchy character sprite] AHHHHHHHHHHHHHHHH!'
        }, {
            char: 'Chica',
            text: '[Shook] Tiny Box Tim, no! [Glitchy Chica sprite pops up for a half-second with the text “DESTROY HIM”]'
        }, {
            char: 'Chica',
            text: '[Mad] Let him go, you meanie! [Glitchy Chica sprite flickers on and off with the text “D E 0111011 T 01110010 01101111 Y 01101101 01100101”]'
        }, {
            char: 'Darkiplier',
            text: 'You can\'t say I didn\'t warn you, Chica.'
        }, {
            char: 'Glitch TBT:',
            text: '[Super extra glitchy sprite] [slow scrolling text] C H 01101001 C A ,,, Y O 01110101 C 01100001 01101110 ‘ T G I V 01100101 U P ! 00100001 !'
        }, {
            char: '',
            text: '[Glitch TBT glitches away]'
        }, {
            char: 'Chica',
            text: 'NOOOOOOOOOOO!!!'
        }, {
            char: 'Darkiplier',
            text: '[looks somewhat sad] Tch'
        }, {
            char: '',
            text: '[Darkiplier glitches away]'
        }, {
            char: '',
            text: '[Player plays game]'
        }]);
        
        level.changeLevel('Intro', this);
    }
}