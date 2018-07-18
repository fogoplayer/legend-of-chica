//JS module for the Intro Scene

import level from './level.js';

import chica from '../sprites/chica.js';

export default class Amnesia2 extends Phaser.Scene {
    
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
                char: '',
                text: '[TBT\'s theme]'
        
            }, {
                char: 'TBT',
                text: 'Wow, thanks, Chica! For a dog that doesn’t know how to fight, that was pretty good!'
            }, {
                char: 'Chica',
                text: 'Um… thanks?'
            }, {
                char: 'Chica',
                text: 'Do you know where we are?'
            }, {
                char: 'TBT',
                text: 'In Vincent’s wine cellar.'
            }, {
                char: 'Chica',
                text: 'Who?'
            }, {
                char: 'Chica',
                text: 'Nevermind. I need to find Mark!'
            }, {
                char: 'TBT',
                text: 'Mark? Oh, you won’ t be able to get to him from here.'
            }, {
                char: 'Chica',
                text: '[angry] What do you mean? I need to save him from that crazy fan!'
            }, {
                char: 'TBT',
                text: 'Who, Bridgett? Nah, you don’ t stand a chance.'
            }, {
                char: 'Chica',
                text: '[clearly offended]'
            }, {
                char: 'TBT',
                text: 'Not without help, anyway.'
            }, {
                char: 'Chica',
                text: 'What do you mean “help”?'
            }, {
                char: 'TBT',
                text: 'Ya know, someone to help you get stronger.'
            }, {
                char: 'Chica',
                text: '[clearly confused] But… aren’t we the only ones here?'
            }, {
                char: 'TBT',
                text: 'Well, yes and no. We are the only ones in the wine cellar, but there is someone else here.'
            }, {
                char: 'Chica',
                text: '[Does not compute]'
            }, {
                char: 'TBT',
                text: '*sigh* We’re in Bridgett’s machine, right?'
            }, {
                char: 'Chica',
                text: '[Focused] Yes.'
            }, {
                char: 'TBT',
                text: 'Alright, so Bridgett can program little individual prisons for everyone here. She made mine as a test run of sorts. Even I’m a part of her programming.'
            }, {
                char: 'Chica',
                text: '[Alarmed] Wait, if she created you, then how can I trust you?'
            }, {
                char: 'TBT',
                text: 'She programmed me to hate her.'
            }, {
                char: 'Chica',
                text: '[Does not compute] But… why… That’s just dumb.'
            }, {
                char: 'TBT',
                text: 'Tell me about it.'
            }, {
                char: 'TBT',
                text: 'But how do we get you out of here?'
            }, {
                char: 'Chica',
                text: '[Thinking]'
            }, {
                char: 'TBT',
                text: '[Thinking]'
            }, {
                char: 'Chica',
                text: '[Thinking]'
            }, {
                char: 'TBT',
                text: '[Thinking]'
            }, {
                char: 'TBT',
                text: '[Idea!!!] Wait, I got it!'
            }, {
                char: 'Chica',
                text: '[Excited] What? What is it ?'
            }, {
                char: 'TBT',
                text: 'I’m already in the programming, right?'
            }, {
                char: 'Chica',
                text: 'Right!'
            }, {
                char: 'TBT',
                text: 'What if we turned my code into a virus? Once we do that, I should be able to leave this place and bring you with me!'
            }, {
                char: 'TBT',
                text: '[Looking down] Probably.'
            }, {
                char: 'Chica',
                text: 'But how…?'
            }, {
                char: 'TBT',
                text: 'Easy… just give me a sec...'
            }, {
                char: 'TBT',
                text: '[Focused] [map sprite is zapped]'
            }, {
                char: 'Glitch TBT:',
                text: '[Appears, very pleased with himself] That should do it!'
            }, {
                char: 'Chica',
                text: '[In awe] Wow......'
            }, {
                char: 'Chica',
                text: 'So, what can you do now?'
            }, {
                char: 'Glitch TBT:',
                text: '...'
            }, {
                char: 'Glitch TBT:',
                text: 'Great question.'
            }, {
                char: 'Glitch TBT:',
                text: '[Wanders around, then has an idea]'
            }, {
                char: 'Glitch TBT:',
                text: 'Brace yourself, Chica!'
            }, {
                char: '',
                text: '[Room explodes into static, then becomes a clean, white room that looks very comfortable]'
            }, {
                char: 'Chica',
                text: '[Awe intensifies] OHMYMARKOHMYMARKOHMYMARKOHMYMARKOHMYMARKOHMYMARK'
            }, {
                char: 'Glitch TBT:',
                text: '[Smug/cocky] Pretty good right?'
            }, {
                char: 'Glitch TBT:',
                text: '[Normal] If I’m not mistaken, this area is untouchable by Bridgett.'
            }, {
                char: 'Chica',
                text: 'Nice! But...'
            }, {
                char: 'Chica',
                text: '[Curious] How to we get out?'
            }, {
                char: 'Glitch TBT:',
                text: 'All I should have to do is manipulate the code a bit'
            }, {
                char: 'Chica',
                text: '[Confused]'
            }, {
                char: 'Glitch TBT:',
                text: 'Nevermind. Just give me a sec.'
            }, {
                char: '',
                text: '[Glitch TBT sprite focuses, and the top left door dissolves into blue binary code. Chica and Glitch TBT approach glitchy door]'
            }, {
                char: 'Chica',
                text: 'So… Where does this go?'
            }, {
                char: 'Glitch TBT:',
                text: 'Let’s find out! [pushes Chica]'
            }, {
                char: 'Chica',
                text: '[surprised] AHHHHHHHHH!!!!!!!!'
            }, {
                char: 'Glitch TBT:',
                text: '[Jumps in. Happy/excited] WHEEEEEEEEEEE!!!!!!!!!!!'
            }
        
        ]);
        
        level.changeLevel('Darkeplier', this);
    }
}