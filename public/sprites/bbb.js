//JS Module for Big Box Barry

const bbb = {
    
    name: 'bbb',
    displayName: 'Big Box Barry',

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
        _this.load.image('bbb', './assets/images/bbb.png');
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
        
        let updateInWorld = setInterval(()=> {
            if (_this.bbb.x > _this.sceneWidth / 2 + 200) {
                _this.bbb.setVelocityX(-240);
            }
            else {
                _this.bbb.setVelocity(0, 0);
                _this.events.emit('bbbInPosition');
                clearInterval(updateInWorld);
            }
        })
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
        _this.add.bitmapText(x, y - 115,'welbutrin', `Big Box Barry`, 32).setOrigin(0.5, 1);
        this.statsText = _this.add.bitmapText(x, y + 104,'welbutrin', `HP: ${ this.stats.hp }/${ this.stats.maxHp }`, 32).setOrigin(0.5, 0);
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