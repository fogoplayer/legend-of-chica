//JS module for the amnesia Scene
import Dialogue from '../../assets/dialogue/dialogue.js';
import Amnesia from '../amnesia/amnesia.js';

export default class Intro extends Phaser.Scene {
    
    /**
     * Constructor for Intro
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
     * Preload for Intro
     * @param null
     * @return null
    **/
    preload() {

    }
    
    /**
     * Create for Amnesia
     * @param null
     * @return null
    **/
    create() {
        this.dialogue = this.scene.add('Dialogue', new Dialogue([
            {
                char: 'Narrator',
                text: 'Hello [player name], and welcome to “The Legend of Chica: Golden Guardian”!',
            },
            {
                char: 'Narrator',
                text: 'Thank you so much for downloading our game! This is our first game, so please forgive any bugs you may come across.',
            },
            {
                char: 'Narrator',
                text: 'That being said, we hope you enjoy the game. See you in the party room!',
            },
            {
                //TODO end dialogue scene, start music, then restart dialogue scene
                char: '[Music note]',
                text: '[Mark’s Theme]',
            },
            {
                char: 'Mark',
                text: '…and for all of you that just recently came on to the stream, I’d like to remind you all that this is a charity stream.',
            },
            {
                char: 'Chica',
                text: 'Boof!',
            },
            {
                char: 'Mark',
                text: 'That’s right, Chica! All proceeds will be going towards the Brain and Behavior Research Foundation to help fund research to alleviate mental illness. There are links in the des-',
            },
            {
                char: '[MUSIC NOTE]',
                text: '[Bridgett’s Theme]',
            },
            {
                char: 'Bridgett',
                text: '(crashes through a window) OH, MARKIMOOOOOOOO! YOUR NUMBER ONE FAN IS HERE!!!',
            },
            {
                char: 'Mark',
                text: 'My what?',
            },
            {
                char: 'Chica',
                text: '*Whine*?',
            },
            {
                char: 'Bridgett',
                text: 'What do you mean, Marki-dearest?',
            },
            {
                char: 'Bridgett',
                text: 'I’ve only been sending you fan-mail since your first video, not to mention all the fanart I’ve drawn of us together. I’ve also been buying all of your merch, and I bought 5 of your tasteful nudes calendars, and-',
            },
            {
                char: 'Mark',
                text: 'Okay! That’s enough! I get it! I think I remember you now. You do know I have a girlfriend, right?',
            },
            {
                char: 'Bridgett',
                text: 'Oh, that witch? I took care of her. She won’t get in between us again.',
            },
            {
                char: '[ART NOTE]',
                text: '[Chica and Mark are shook]',
            },
            {
                char: 'Mark',
                text: 'What… what did you do to Amy?!?',
            },
            {
                char: 'Bridgett',
                text: 'Does that matter? No, it doesn’t. All that matters is that we can be together forever!',
            },
            {
                char: '[ART NOTE]',
                text: '[Bridgett pulls out a strange machine]',
            },
            {
                char: 'Bridgett',
                text: 'And now you’re all mine, Marki-darling! I’ve caught you, and you’re all MINE!',
            },
            {
                char: '[ART NOTE]',
                text: '[STRANGE MACHINE activates and sucks in Mark, Chica, and Bridgett]',
            },
            {
                char: '[ART NOTE]',
                text: '[In a state of static-y limbo]',
            },
            {
                char: 'Chica',
                text: 'Mark!',
            },
            {
                char: '[ART NOTE]',
                text: '[Chica and Mark are extra shook]',
            },
            {
                char: 'Mark',
                text: 'Chica, you can-',
            },
            {
                char: 'Bridgett',
                text: 'Ugh, what are you doing here, you mutt? Get out!',
            },
            {
                char: '[ART NOTE]',
                text: '[Bridgett knocks Chica out of the limbo]',
            },
            {
                char: 'Mark',
                text: 'CHICA, NOOOOOOOOO!'
            }
        ]));
        
        this.events.once('startNextLevel', () => {
            this.scene.manager.remove('Level');
            setTimeout(() => {
                console.log(this);
                this.scene.add('Amnesia', new Amnesia());
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
        if(this.stage === 1){
            this.events.emit('startNextLevel');
        }
    }
}