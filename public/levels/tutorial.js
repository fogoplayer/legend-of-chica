//JS module for the tutorial Scene
import chica from '../sprites/chica/chica.js';
import bbb from '../sprites/bbb/bbb.js';
import Dialogue from '../assets/dialogue/dialogue.js';
import combat from '../assets/combat/combat.js';
import Hud from '../assets/combatHud/combatHud.js';

export default class Tutorial extends Phaser.Scene {
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

    preload() {
        chica.preload(this);
        bbb.preload(this);
        this.load.image('map', './levels/amnesia.png');
    }

    create() {
        var map = this.add.image(0,0,'map').setOrigin(0,0).setScale(2.4);

        this.scene.add('Hud', Hud);
        chica.createInBattle(this);
        combat.createCombat(this, chica, bbb);
        this.createKeyControls();
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
    }

    update() {
        chica.updateInBattle(this);
        bbb.updateInBattle(this);
    }

    createKeyControls() {
        const _this = this;
        this.input.keyboard.once('keydown_THREE', function() {
            if (this.stage === 1) {

                combat.newRound(this, 'Defend');
                this.input.keyboard.once('keydown_ENTER', function() {
                    this.scene.add('Dialogue', new Dialogue([{
                            char: 'Tiny Box Tim',
                            text: 'That was too close!'
                        },
                        {
                            char: 'Tiny Box Tim',
                            text: 'Alright, now you need to counter. A tail\nWHAP should do the trick!'
                        },
                    ]));

                    this.input.keyboard.once('keydown_ONE', function() {
                        if (this.stage === 3) {

                            combat.newRound(_this, 'Whap');
                            this.input.keyboard.once('keydown_ENTER', function() {

                                this.scene.add('Dialogue', new Dialogue([{
                                        char: 'Chica',
                                        text: 'Ow, ow, OW!'
                                    },
                                    {
                                        char: 'Tiny Box Tim',
                                        text: 'Oh, no, Chica! Here, use this dog treat.'
                                    },
                                ]));

                                this.input.keyboard.once('keydown_FOUR', function() {
                                    if (this.stage === 5) {
                                        combat.newRound(_this, 'Doggie Treat');
                                        this.input.keyboard.once('keydown_ENTER', function() {
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

                                            this.input.keyboard.once('keydown_TWO', function() {
                                                if (this.stage === 7) {
                                                    combat.newRound(_this, 'Cuteness');

                                                }
                                            }, this);
                                        }, this);

                                    }
                                }, this);

                            }, this);
                        }
                    }, this);

                }, this);

            }
        }, this);

    }
}