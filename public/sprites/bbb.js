//JS Module for Big Box Barry

const bbb = {

    name: 'bbb',
    displayName: 'Big Box Barry',

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
     * Preload for Big Box Barry
     * @param scene-the current scene
     * @return null
     **/
    preload(scene) {
        scene.load.image('bbb', './assets/images/bbb.png');
    },

    /**
     * Create for Big Box Barry
     * Should only be called in world levels
     * @param scene-the current scene
     * @param x-the horizontal coordinate of the sprite
     * @param y- the vertical coordinate
     * @return null
     **/
    createInWorld(scene, x, y) {
        scene.bbb = scene.physics.add.sprite(x, y, 'bbb').setScale(0.25);
        scene.bbb.setOrigin(0.5, 0.5);
        scene.bbb.setCollideWorldBounds(false);

        let updateInWorld = setInterval(() => {
            if (scene.bbb.x > scene.sceneWidth / 2 + 200) {
                scene.bbb.setVelocityX(-240);
            }
            else {
                scene.bbb.setVelocity(0, 0);
                scene.events.emit('bbbInPosition');
                clearInterval(updateInWorld);
            }
        });
    },

    /**
     * Create for Big Box Barry
     * Should only be called in combat levels
     * @param scene-the current scene
     * @param x-the horizontal coordinate of the sprite
     * @param y- the vertical coordinate
     * @return null
     **/
    createInBattle(scene, x, y) {
        const width = scene.sys.game.config.width;
        const height = scene.sys.game.config.height;
        const graphics = scene.add.graphics();
        scene.bbb = graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(x - 100, y - 100, 200, 200);
        scene.add.bitmapText(x, y - 115, 'welbutrin', `Big Box Barry`, 32).setOrigin(0.5, 1);
        this.statsText = scene.add.bitmapText(x, y + 104, 'welbutrin', `HP: ${ this.stats.hp }/${ this.stats.maxHp }`, 32).setOrigin(0.5, 0);
    },

    /**
     * Update for Big Box Barry
     * Should only be called in combat levels
     * @param scene-the current scene
     * @return null
     **/
    updateInBattle(scene) {
        this.statsText.setText(`HP: ${ this.stats.hp }/${ this.stats.maxHp }`);
    },
};

export default bbb;