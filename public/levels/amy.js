//JS module for the Intro Scene

import level from './level.js';

import chica from '../sprites/chica.js';

export default class Amy extends Phaser.Scene {

    /**
     * Constructor for Amy
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
     * Preload for Amy
     * @param null
     * @return null
     **/
    preload() {
        level.preload(this);
    }

    /**
     * Create for Amy
     * @param null
     * @return null
     **/
    async create() {
        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: 'Uuuuhhhhh...'
        }, {
            char: 'GTBT',
            text: 'Yeah! Let’s do that again!'
        }, {
            char: 'Chica',
            text: 'Please... Never again?'
        }, {
            char: 'Chica',
            text: 'So, where are we?'
        }, {
            char: 'TBT',
            text: 'Welcome to Amy’s Prison!'
        }, {
            char: 'Chica',
            text: 'Amy’s here?'
        }]);

        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: 'Amy!'
        }]);

        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: 'Amy!'
        }]);

        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: 'Amy!'
        }]);

        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'Chica',
            text: 'Amy!'
        }]);

        await Dialogue.dialogueConstructorWithPromise(this, [{
            char: 'TBT',
            text: 'She can’t hear you, you know.'
        }, {
            char: 'Chica',
            text: 'Oh.'
        }, {
            char: 'Chica',
            text: 'Well, let’s go find her!'
        }]);

        level.changeLevel('Darkeplier', this);
    }
}