//JS Module for Chica
import system from '../systems/system.js';
const chica = {

    name: 'chica',
    displayName: 'Chica',

    get stats() {
        return system.userData.player.stats;
    },
    // {
    //     hp: 20,
    //     maxHp: 20,
    //     tp: 20,
    //     maxTp: 20,
    // },

    get actions() {
        return system.userData.player.actions;
    },

    /**
     * Preload for Chica
     * @param _this
     * @return null
     **/
    preload(_this) {
        _this.load.spritesheet('chica', './assets/images/chicaSpriteSheet.png', {
            frameWidth: 24,
            frameHeight: 32
        });
        chica.speed = _this.sys.game.config.height / 2;
    },

    /**
     * Create for Chica
     * Should only be called in world levels
     * @param null
     * @return null
     **/
    createInWorld(_this, initialX, initialY) {
        _this.chica = _this.physics.add.sprite(initialX, initialY, 'chica').setScale(4);
        _this.chica.setOrigin(0.5, 0.5);
        _this.chica.setCollideWorldBounds(true);

        /*chica.createAnimations(_this);
        _this.chica.anims.play('turn');*/

        //chica.createKeyboardControlsInWorld(_this);
    },

    /**
     * Create for Chica
     * Should only be called in combat levels
     * @param _this-the current scene
     * @return null
     **/
    createInBattle(_this) {
        const height = _this.sys.game.config.height;
        const width = _this.sys.game.config.width;
        _this.add.bitmapText(4, height * 2 / 3, 'welbutrin', `Chica`, 64);
        _this.add.text(4, height * 2 / 3 + 64 + 4, `ICON`, {
            fontSize: '96px',
            fill: '#ffffff',
            color: '#ffffff'
        });
        this.statsText = _this.add.bitmapText(4, height * 2 / 3 + 64 + 4 + 96 + 4, 'welbutrin', `HP: ${ this.stats.hp }/${ this.stats.maxHp }\nTP: ${ this.stats.tp }/${ this.stats.maxTp }`, 32);
    },

    updateInWorld(_this) {
        this.createKeyboardControlsInWorld(_this);
    },

    /**
     * Update for Chica
     * Should only be called in combat levels
     * @param _this-the current scene
     * @return null
     **/
    updateInBattle() {
        this.statsText.setText(`HP: ${ this.stats.hp }/${ this.stats.maxHp }\nTP: ${ this.stats.tp }/${ this.stats.maxTp }`);
    },

    /**
     * Create keyboard controls for Chica
     * Should only be called in world levels
     * Creates up, down, left, right
     * @param _this-the current scene
     * @return null
     **/
    createKeyboardControlsInWorld(_this) {
        const isDown = key => _this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]).isDown;

        //Up/down
        if (isDown('W') || isDown('UP')) {
            _this.chica.setVelocityY(-chica.speed);
        }else if (isDown('S') || isDown('DOWN')) {
            _this.chica.setVelocityY(chica.speed);
            _this.chica.setVelocityY(0);
        }
        
        //Left/right
        if (isDown('A') || isDown('LEFT')) {
            _this.chica.setVelocityX(-chica.speed);
        }else if (isDown('D') || isDown('RIGHT')) {
            _this.chica.setVelocityX(chica.speed);
        }else{
            _this.chica.setVelocityX(0);
        }
    },

    /**
     * Create animations for Chica
     * Creates left, right and turn
     * TODO put in real anims once we have spritesheets
     * @param _this-the current scene
     * @return null
     **/
    createAnimations(_this) {

        _this.anims.create({
            key: 'left',
            frames: _this.anims.generateFrameNumbers('chica', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

        _this.anims.create({
            key: 'turn',
            frames: [{
                key: 'chica',
                frame: 0
            }],
            frameRate: 20
        });

        _this.anims.create({
            key: 'right',
            frames: _this.anims.generateFrameNumbers('chica', {
                start: 9,
                end: 16
            }),
            frameRate: 10,
            repeat: -1
        });

    }
};

export default chica;