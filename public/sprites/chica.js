//JS Module for Chica
import system from '../systems/system.js';
const chica = {

    name: 'chica',
    displayName: 'Chica',

    /**
     * Getters for Chica
     * Using system.userData allows player stats and abilities to persist across gameplay sessions
     **/
    get stats() {
        return system.userData.player.stats;
    },

    get actions() {
        return system.userData.player.actions;
    },

    /**
     * Preload for Chica
     * @param scene-the current scene
     * @return null
     **/
    preload(scene) {
        scene.load.spritesheet('chica', './assets/images/chicaSpriteSheet.png', {
            frameWidth: 24,
            frameHeight: 32
        });
        chica.speed = scene.sys.game.config.height / 2;
    },

    /**
     * Create for Chica
     * Should only be called in world levels
     * @param null
     * @return null
     **/
    createInWorld(scene, initialX, initialY) {
        scene.chica = scene.physics.add.sprite(initialX, initialY, 'chica').setScale(4);
        scene.chica.setOrigin(0.5, 0.5);
        scene.chica.setCollideWorldBounds(true);

        /*chica.createAnimations(scene);
        scene.chica.anims.play('turn');*/
    },

    /**
     * Create for Chica
     * Should only be called in combat levels
     * @param scene-the current scene
     * @return null
     **/
    createInBattle(scene) {
        const height = scene.sys.game.config.height;
        const width = scene.sys.game.config.width;
        scene.add.bitmapText(4, height * 2 / 3, 'welbutrin', `Chica`, 64);
        scene.add.text(4, height * 2 / 3 + 64 + 4, `ICON`, {
            fontSize: '96px',
            fill: '#ffffff',
            color: '#ffffff'
        });
        this.statsText = scene.add.bitmapText(4, height * 2 / 3 + 64 + 4 + 96 + 4, 'welbutrin', `HP: ${ this.stats.hp }/${ this.stats.maxHp }\nTP: ${ this.stats.tp }/${ this.stats.maxTp }`, 32);
    },

    updateInWorld(scene) {
        this.createKeyboardControlsInWorld(scene);
    },

    /**
     * Update for Chica
     * Should only be called in combat levels
     * @param scene-the current scene
     * @return null
     **/
    updateInBattle() {
        this.statsText.setText(`HP: ${ this.stats.hp }/${ this.stats.maxHp }\nTP: ${ this.stats.tp }/${ this.stats.maxTp }`);
    },

    /**
     * Create keyboard controls for Chica
     * Should only be called in world levels
     * Creates up, down, left, right
     * @param scene-the current scene
     * @return null
     **/
    createKeyboardControlsInWorld(scene) {
        const isDown = key => scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]).isDown;

        //Up/down
        if (isDown('W') || isDown('UP')) {
            scene.chica.setVelocityY(-chica.speed);
        }
        else if (isDown('S') || isDown('DOWN')) {
            scene.chica.setVelocityY(chica.speed);
        }
        else {
            scene.chica.setVelocityY(0);
        }

        //Left/right
        if (isDown('A') || isDown('LEFT')) {
            scene.chica.setVelocityX(-chica.speed);
        }
        else if (isDown('D') || isDown('RIGHT')) {
            scene.chica.setVelocityX(chica.speed);
        }
        else {
            scene.chica.setVelocityX(0);
        }
    },

    /**
     * Create animations for Chica
     * Creates left, right and turn
     * TODO put in real anims once we have spritesheets
     * @param scene-the current scene
     * @return null
     **/
    createAnimations(scene) {

        scene.anims.create({
            key: 'left',
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

export default chica;