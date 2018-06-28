import system from '../systems/system.js';
import Amnesia from './amnesia/amnesia.js'; //Remove

const level = {
    /**
     * Centralized code to start up a level
     * @param levelName-The name of the level to be called
     * @param levelType-The type of level (world/battle)
     * @param chars-an array of characters to import for the level
    **/
    initialize: async (chars = [], levelType = undefined) => {
        Phaser.Scene.call(this, {
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
                '../systems/combatHud/actionOptions/actionOptions.js',
                '../systems/combat.js'
            ]);
        }
        
        //Character modules
        (typeof chars !== 'object') ? chars = [chars] : null;
        moduleList = moduleList.concat(chars.map((char) => {
            return `../sprites/${ char.toLowerCase() }/${ char.toLowerCase() }.js`;
        }));
        
        await system.addModules(moduleList);
        alert('Hi')
    },
    
    changeLevel: async (newLevel, _this) => {
        _this.sound.destroy();
        await system.addModules([`../levels/${ newLevel.toLowerCase() }/${ newLevel.toLowerCase() }.js`])
        _this.scene.manager.remove('Level');
        setTimeout(() => {
            _this.scene.add('Amnesia', new Amnesia());
        },1);
        //system.userData.currentLevel = newLevel;
        system.save();
    }
};

export default level;

/* New Level Boilerplate



*/