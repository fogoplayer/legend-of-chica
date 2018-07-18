//JS Module for

const spriteName = {

    name: '',
    displayName: '',

    stats: {
        hp: 20,
        maxHp: 20,
    },

    actions: [

        {
            name: '',
            dealsDamage: 10,
            reducesDamage: 0,
            restoresHealth: 0
        },

    ],
    
    /**
     * Preload for
     * @param scene-the current scene
     * @return null
    **/
    preload(scene) {
        //scene.load.image('spriteName', './assets/images/spriteName.png');
    },
    
    /**
     * Create for
     * Should only be called in world levels
     * @param scene-the current scene
     * @param x-the inital x coordinate of the player
     * @param y-the initial y coordinate of the player
     * @return null
    **/
    createInWorld(scene, x, y) {
        scene = scene.physics.add.sprite(x, y, 'spriteName').setScale(.25);
        scene.setOrigin(0.5,0.5);
        scene.setCollideWorldBounds(false);
    },
    
    /**
     * Create animations for
     * Waiting for spritesheet
     * @param scene-the current scene
     * @return null
    **/
    createAnimations(scene) {

        scene.anims.create({
            key: 'die',
            frames: scene.anims.generateFrameNumbers('spriteName', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{
                key: 'spriteName',
                frame: 0
            }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('spriteName', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

    }
};

export default spriteName;