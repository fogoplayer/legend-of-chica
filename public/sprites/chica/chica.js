//JS Module for Chica

const chica = {

    shortName: 'chica',
    name: 'Chica',

    stats: {
        hp: 20,
        maxHp: 20,
        tp: 20,
        maxTp: 20,
    },

    actions: [
        {
            name:"Attack",
            children:[
                {
                    name: "Whap",
                    dealsDamage: 17,
                    reducesDamage: 0,
                    restoresHealth: 0
                },
            ]
        },
        
        {
            name:"Defend",
            children:[
                {
                    name: "Defend",
                    dealsDamage: 0,
                    reducesDamage: 9,
                    restoresHealth: 0,
                },
            ]
        },
        
        {
            name:"Special",
            children:[
        
                {
                    name: "Cuteness",
                    dealsDamage: 8,
                    reducesDamage: 0,
                    restoresHealth: 7,
                },
            ]
        },
        
        {
            name:"Items",
            children:[
                {
                    name: 'Doggie Treat',
                    dealsDamage: 0,
                    reducesDamage: 0,
                    restoresHealth: 15,
                }
            ]
        },
        
        
    ],
    
    /**
     * Preload for Chica
     * @param _this
     * @return null
    **/
    preload(_this) {
        _this.load.spritesheet('chica', './sprites/chica/chicaSpriteSheet.png', {
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

        chica.createAnimations(_this);
        _this.chica.anims.play('turn');

        chica.createKeyboardControlsInWorld(_this);
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
        _this.add.text(4, height * 2 / 3, `Chica`, {
            fontSize: '64px',
            fill: '#ffffff',
            color: '#ffffff'
        });
        _this.add.text(4, height * 2 / 3 + 64 + 4, `ICON`, {
            fontSize: '96px',
            fill: '#ffffff',
            color: '#ffffff'
        });
        this.statsText = _this.add.text(4, height * 2 / 3 + 64 + 4 + 96 + 4, `HP: ${ this.stats.hp }/${ this.stats.maxHp }\nTP: ${ this.stats.tp }/${ this.stats.maxTp }`, {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff'
        });
    },
    
    /**
     * Update for Chica
     * Should only be called in combat levels
     * @param _this-the current scene
     * @return null
    **/
    updateInBattle() {
        /*console.log("HP:" + this.stats.hp);
        console.log("StatsText:", this.statsText);
        this.statsText.setBackgroundColor("#000000")
        this.statsText.setText("Hello");*/
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
        //Up
        _this.input.keyboard.on('keydown_UP', function() {
            _this.chica.setVelocityY(-chica.speed);
        }, _this);

        _this.input.keyboard.on('keydown_W', function() {
            _this.chica.setVelocityY(-chica.speed);
        }, _this);

        _this.input.keyboard.on('keyup_UP', function() {
            _this.chica.setVelocityY(0);
        }, _this);

        _this.input.keyboard.on('keyup_W', function() {
            _this.chica.setVelocityY(0);
        }, _this);

        //Down
        _this.input.keyboard.on('keydown_DOWN', function() {
            _this.chica.setVelocityY(chica.speed);
        }, _this);

        _this.input.keyboard.on('keydown_S', function() {
            _this.chica.setVelocityY(chica.speed);
        }, _this);

        _this.input.keyboard.on('keyup_DOWN', function() {
            _this.chica.setVelocityY(0);
        }, _this);

        _this.input.keyboard.on('keyup_S', function() {
            _this.chica.setVelocityY(0);
        }, _this);

        //Left
        _this.input.keyboard.on('keydown_LEFT', function() {
            _this.chica.setVelocityX(-chica.speed);
        }, _this);

        _this.input.keyboard.on('keydown_A', function() {
            _this.chica.setVelocityX(-chica.speed);
        }, _this);

        _this.input.keyboard.on('keyup_LEFT', function() {
            _this.chica.setVelocityX(0);
        }, _this);

        _this.input.keyboard.on('keyup_A', function() {
            _this.chica.setVelocityX(0);
        }, _this);

        //Right
        _this.input.keyboard.on('keydown_RIGHT', function() {
            _this.chica.setVelocityX(chica.speed);
        }, _this);

        _this.input.keyboard.on('keydown_D', function() {
            _this.chica.setVelocityX(chica.speed);
        }, _this);

        _this.input.keyboard.on('keyup_RIGHT', function() {
            _this.chica.setVelocityX(0);
        }, _this);

        _this.input.keyboard.on('keyup_D', function() {
            _this.chica.setVelocityX(0);
        }, _this);
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