//JS Module for Big Box Barry

const bbb = {

    shortName: 'bbb',
    name: 'Big Box Barry',

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
        _this.load.image('bbb', './sprites/bbb/bbb.png');
        //_this.load.spritesheet('chica', './sprites/chica/chicaSpriteSheet.png',{frameWidth:24, frameHeight: 32});
        //chica.speed = _this.sys.game.config.height/2;
    },


    createInWorld(_this, x, y) {
        _this.bbb = _this.physics.add.sprite(x, y, 'bbb').setScale(.25);
        _this.bbb.setOrigin(0.5,0.5);
        _this.bbb.setCollideWorldBounds(true);
        /*chica.createAnimations(_this);
        _this.chica.anims.play('turn');
        
        chica.createKeyboardControls(_this);*/
    },

    createInBattle(_this, x, y) {
        const width = _this.sys.game.config.width;
        const height = _this.sys.game.config.height;
        const graphics = _this.add.graphics();
        _this.bbb = graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(x - 100, y - 100, 200, 200);
        _this.add.text(x, y - 104, `Big Box Barry`, {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff'
        }).setOrigin(0.5, 1);
        this.statsText = _this.add.text(x, y + 104, `HP: ${ this.stats.hp }/${ this.stats.maxHp }`, {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff'
        }).setOrigin(0.5, 0);
    },

    updateInBattle(_this) {
        this.statsText.setText(`HP: ${ this.stats.hp }/${ this.stats.maxHp }`);
    },
    
    updateInWorld(_this, x, y){
        if(_this.bbb){
            if (_this.bbb.x != x || _this.bbb.y != y) {
                _this.bbb.moveTo(x, y);
            }else{
                this.bbb.setVelocity(0, 0);
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

export default bbb;