import system from '../systems/system.js';

const level = {
    /**
     * Centralized code to start up a level
     * @param levelName-The name of the level to be called
     * @param levelType-The type of level (world/battle)
     * @param chars-an array of characters to import for the level
     **/
    initialize: async(scene, levelType = undefined) => {
        Phaser.Scene.call(scene, {
            key: 'Level',
            active: true
        });

        //Modules that every level uses
        let moduleList = ['../systems/dialogue.js'];

        //Modules used for specific level types
        if (levelType === 'world') {

        }
        if (levelType === 'battle') {
            moduleList = moduleList.concat([
                '../systems/combatHud/combatHud.js',
                '../systems/combatHud/actionOptions.js',
                '../systems/combat.js'
            ]);
        }

        await system.addModules(moduleList);
    },

    preload(scene) {
        scene.load.bitmapFont('welbutrin', './assets/fonts/font.png', 'assets/fonts/font.fnt');
    },

    /**
     * Loads in dependencies
     * NOT CURRENTLY IN USE
     * May be needed to add dynamic character module imports
     * @param _this-The current scene
     * @param chars-an array of characters to import for the level
     * @param levelType-The type of level (world/battle)
     **/
    // loadModules: async (_this, chars = [], levelType = undefined) => {

    //     //Modules that every level uses
    //     let moduleList = ['../systems/dialogue.js'];

    //     //Modules used for specific level types
    //     if(levelType === 'world'){

    //     }
    //     if(levelType === 'battle'){
    //         moduleList = moduleList.concat([
    //             '../systems/combatHud/combatHud.js',
    //             '../systems/combatHud/actionOptions/actionOptions.js',
    //             '../systems/combat.js'
    //         ]);
    //     }

    //     //Character modules
    //     (typeof chars !== 'object') ? chars = [chars] : null;
    //     moduleList = moduleList.concat(chars.map((char) => {
    //         return `../sprites/${ char.toLowerCase() }/${ char.toLowerCase() }.js`;
    //     }));

    //     await system.addModules(moduleList)
    // },

    /**
     * Changes the current level
     * @param newLevel-the key of the level to be added
     * @param _this-the current scene object
     **/
    changeLevel: async(newLevel, scene) => {
        scene.sound.sounds.forEach(sound => {
            sound.destroy()
        });

        await system.addModules([`../levels/${ newLevel.toLowerCase() }.js`])
        system.userData.currentLevel = newLevel;
        scene.add.bitmapText(384, 384, 'welbutrin', 'Progress Saved', 32
            /*{
                        fontSize: '32px',
                        fill: '#ffffff',
                        color: '#ffffff',
                        backgroundColor: '#000000bb',
                    }*/
        ).setOrigin(0.5, 0.5);

        let scenes = scene.scene.manager.scenes;
        setTimeout(() => {
            while (scenes.length > 0) {
                scene.scene.manager.remove(scenes[0].scene.key);
            };
            setTimeout(() => {
                scene.scene.manager.add(newLevel, window[newLevel]);
            }, 5);
        }, 1000);
        system.pauseExceptFor(null, scene);

        system.save(scene);
        console.clear();
        console.log(scene);
    }
};

export default level;

/* New Level Boilerplate



*/