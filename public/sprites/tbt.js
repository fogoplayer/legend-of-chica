//JS Module for Tiny Box Tim

const tbt = {

    name: 'tbt',
    displayName: 'Tiny Box Tim',

    stats: {
        hp: 20,
        maxHp: 20,
    },

    actions: [

        {
            name: "Crush",
            dealsDamage: 10,
            reducesDamage: 0,
            restoresHealth: 0
        },

    ],
    
    /**
     * Preload for Tiny Box Tim
     * @param _this-the current scene
     * @return null
    **/
    preload(_this) {
        _this.load.image('tbt', './assets/images/tbt.png');
    },
    
    /**
     * Create for Tiny Box Tim
     * Should only be called in world levels
     * @param _this-the current scene
     * @param x-the inital x coordinate of the player
     * @param y-the initial y coordinate of the player
     * @return null
    **/
    createInWorld(_this, x, y) {
        _this.tbt = _this.physics.add.sprite(x, y, 'tbt').setScale(.25);
        _this.tbt.setOrigin(0.5,0.5);
        _this.tbt.setCollideWorldBounds(false);
        
        let updateInWorld = setInterval(()=> {
            if (_this.tbt.x > _this.sceneWidth / 2 + 50) {
                _this.tbt.setVelocityX(-320);
            }
            else {
                _this.tbt.setVelocity(0, 0);
                _this.events.emit('tbtInPosition');
                clearInterval(updateInWorld);
            }
        })
    },
    
    /**
     * Create animations for Tiny Box Tim
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