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
    
    /**
     * Preload for Big Box Barry
     * @param null
     * @return null
    **/
    preload(_this) {
        _this.load.image('bbb', './sprites/bbb/bbb.png');
    },

    /**
     * Create for Big Box Barry
     * Should only be called in world levels
     * @param _this-the current scene
     * @param x-the horizontal coordinate of the sprite
     * @param y- the vertical coordinate
     * @return null
    **/
    createInWorld(_this, x, y) {
        _this.bbb = _this.physics.add.sprite(x, y, 'bbb').setScale(0.25);
        _this.bbb.setOrigin(0.5,0.5);
        _this.bbb.setCollideWorldBounds(false);
        /*chica.createAnimations(_this);
        _this.chica.anims.play('turn');
        
        chica.createKeyboardControls(_this);*/
    },
    
    /**
     * Create for Big Box Barry
     * Should only be called in combat levels
     * @param _this-the current scene
     * @param x-the horizontal coordinate of the sprite
     * @param y- the vertical coordinate
     * @return null
    **/
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
    
    /**
     * Update for Big Box Barry
     * Should only be called in world levels
     * @param _this-the current scene
     * @return null
    **/
    updateInWorld(_this){
        if(_this.bbb){
            if (_this.bbb.x > _this.sceneWidth / 2 + 200) {
                _this.bbb.setVelocityX(-80);
            }else{
                _this.bbb.setVelocity(0, 0);
                _this.events.emit('inPosition');
            }
        }
    },
    
    /**
     * Update for Big Box Barry
     * Should only be called in combat levels
     * @param _this-the current scene
     * @return null
    **/
    updateInBattle(_this) {
        this.statsText.setText(`HP: ${ this.stats.hp }/${ this.stats.maxHp }`);
    },
};

export default bbb;