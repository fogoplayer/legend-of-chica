//JS Module for Light Demon

const lightDemon = {

    name: 'lightDemon',
    displayName: 'lightDemons',

    stats: {
        hp: 15,
        maxHp: 15,
    },

    actions: [{
            name: 'Attack',
            dealsDamage: 6,
            reducesDamage: 0,
            restoresHealth: 0
        },
        {
            name: 'Threatening wobble',
            dealsDamage: /*TODO how much?*/ 6,
            reducesDamage: 0,
            restoresHealth: 0
        },
        {
            name: 'Evasive Shimmy',
            dealsDamage: /*TODO how much?*/ 6,
            reducesDamage: 0,
            restoresHealth: 0,
            dodge: true,
        },
        {
            name: 'Blinding Samba',
            dealsDamage: /*TODO how much?*/ 6,
            reducesDamage: 0,
            restoresHealth: 0
        },
    ],

    /**
     * Preload for Light Demon
     * @param scene-the current scene
     * @return null
     **/
    preload(scene) {
        //scene.load.image('tbt', './sprites/tbt/tbt.png');
    },

    /**
     * Create for Light Demon
     * Should only be called in world levels
     * @param scene-the current scene
     * @param x-the inital x coordinate of the player
     * @param y-the initial y coordinate of the player
     * @return null
     **/
    createInWorld(scene, x, y) {
        scene.lightDemon = scene.physics.add.sprite(x, y, 'tbt').setScale(.25);
        scene.lightDemon.setOrigin(0.5, 0.5);
        scene.lightDemon.setCollideWorldBounds(false);
    },

    /**
     * Create animations for Light Demon
     * Waiting for spritesheet
     * @param scene-the current scene
     * @return null
     **/
    createAnimations(scene) {

        scene.anims.create({
            key: 'die',
            frames: scene.anims.generateFrameNumbers('chica', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{
                key: 'chica',
                frame: 0
            }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('chica', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

    }
};

export default lightDemon;