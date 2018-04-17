//JS Module for Big Box Barry

const tbt = {

    shortName: 'tbt',
    name: 'Tiny Box Tim',

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

    preload(_this) {
        _this.load.image('tbt', './sprites/tbt/tbt.png');
    },


    createInWorld(_this, x, y) {
        _this.tbt = _this.physics.add.sprite(x, y, 'tbt').setScale(.25);
        _this.tbt.setOrigin(0.5,0.5);
        _this.tbt.setCollideWorldBounds(false);
        /*chica.createAnimations(_this);
        _this.chica.anims.play('turn');
        
        chica.createKeyboardControls(_this);*/
    },
    
    updateInWorld(_this, x){
        if(_this.tbt){
            if (_this.tbt.x > _this.sceneWidth / 2 + 50) {
                _this.tbt.setVelocityX(-80);
            }else{
                _this.tbt.setVelocity(0, 0);
            }
        }
    },

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