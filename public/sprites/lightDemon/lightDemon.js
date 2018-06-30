//JS Module for Light Demon

const lightDemon = {

    name: 'lightDemon',
    displayName: 'lightDemons',

    stats: {
        hp: 15,
        maxHp: 15,
    },

    actions: [
        {
            name: 'Attack',
            dealsDamage: 6,
            reducesDamage: 0,
            restoresHealth: 0
        },
        {
            name: 'Threatening wobble',
            dealsDamage: /*TODO how much?*/6,
            reducesDamage: 0,
            restoresHealth: 0
        },
        {
            name: 'Evasive Shimmy',
            dealsDamage: /*TODO how much?*/6,
            reducesDamage: 0,
            restoresHealth: 0,
            dodge:true,
        },
        {
            name: 'Blinding Samba',
            dealsDamage: /*TODO how much?*/6,
            reducesDamage: 0,
            restoresHealth: 0
        },
    ],
    
    /**
     * Preload for Light Demon
     * @param _this-the current scene
     * @return null
    **/
    preload(_this) {
        //_this.load.image('tbt', './sprites/tbt/tbt.png');
    },
    
    /**
     * Create for Light Demon
     * Should only be called in world levels
     * @param _this-the current scene
     * @param x-the inital x coordinate of the player
     * @param y-the initial y coordinate of the player
     * @return null
    **/
    createInWorld(_this, x, y) {
        _this.lightDemon = _this.physics.add.sprite(x, y, 'tbt').setScale(.25);
        _this.lightDemon.setOrigin(0.5,0.5);
        _this.lightDemon.setCollideWorldBounds(false);
    },
    
    /**
     * Create animations for Light Demon
     * Waiting for spritesheet
     * @param _this-the current scene
     * @return null
    **/
    createAnimations(_this) {

        _this.anims.create({
            key: 'die',
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

export default tbt;