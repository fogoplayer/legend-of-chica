import system from '../systems/system.js';

const level = {
    /**
     * Centralized code to start up a level
     * @param levelName-The name of the level to be called
     * @param levelType-The type of level (world/battle)
     * @param chars-an array of characters to import for the level
    **/
    initialize: async (_this, levelType = undefined) => {
        Phaser.Scene.call(_this, {
            key: 'Level',
            active: true
        });
        
        //Modules that every level uses
        let moduleList = ['../systems/dialogue.js'];
        
        //Modules used for specific level types
        if(levelType === 'world'){
            
        }
        if(levelType === 'battle'){
            moduleList = moduleList.concat([
                '../systems/combatHud/combatHud.js',
                '../systems/combatHud/actionOptions.js',
                '../systems/combat.js'
            ]);
        }
        
        await system.addModules(moduleList)
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
    changeLevel: async (newLevel, _this) => {
        _this.sound.sounds.forEach(sound => { sound.destroy() });
        
        await system.addModules([`../levels/${ newLevel.toLowerCase() }/${ newLevel.toLowerCase() }.js`])
        let scenes = _this.scene.manager.scenes
        system.userData.currentLevel = newLevel;
        _this.add.text(384, 384, 'Progress Saved', {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff',
            backgroundColor: '#000000bb',
        }).setOrigin(0.5, 0.5);
        
        setTimeout(() => {
            while (scenes.length > 0) {
                    _this.scene.manager.remove(scenes[0].scene.key);
                };
            setTimeout(() => {
                _this.scene.manager.add(newLevel, window[newLevel]);
            }, 5);
        }, 1000);
        
        system.save(_this);
        console.clear();
    }
};

export default level;

/* New Level Boilerplate



*/