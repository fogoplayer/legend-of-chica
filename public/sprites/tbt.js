//JS Module for Tiny Box Tim

const tbt = {

    name: 'tbt',
    displayName: 'Tiny Box Tim',

    stats: {
        hp: 20,
        maxHp: 20,
    },

    actions: [{
        name: "Crush",
        dealsDamage: 10,
        reducesDamage: 0,
        restoresHealth: 0
    }],

    /**
     * Preload for Tiny Box Tim
     * @param scene-the current scene
     * @return null
     **/
    preload(scene) {
        scene.load.image('tbt', './assets/images/tbt.png');
    },

    /**
     * Create for Tiny Box Tim
     * Should only be called in world levels
     * @param scene-the current scene
     * @param x-the inital x coordinate of the player
     * @param y-the initial y coordinate of the player
     * @return null
     **/
    createInWorld(scene, x, y) {
        scene.tbt = scene.physics.add.sprite(x, y, 'tbt').setScale(.25);
        scene.tbt.setOrigin(0.5, 0.5);
        scene.tbt.setCollideWorldBounds(false);

        let updateInWorld = setInterval(() => {
            if (scene.tbt.x > scene.sceneWidth / 2 + 50) {
                scene.tbt.setVelocityX(-320);
            }
            else {
                scene.tbt.setVelocity(0, 0);
                scene.events.emit('tbtInPosition');
                clearInterval(updateInWorld);
            }
        })
    },

    /**
     * Create animations for Tiny Box Tim
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

export default tbt;