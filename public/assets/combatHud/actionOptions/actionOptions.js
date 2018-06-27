//JS Module to display attacks during combta
import chica from '../../../sprites/chica/chica.js';
import combat from '../../combat/combat.js';

const actionOptions = {
    /**
     * Constructor for ActionOptions
     * @param _this-the scene calling the function
     * @return null
    **/
    create(_this) {
        //A few initial variables
        const gameWidth = _this.sys.game.config.width;
        const gameHeight = _this.sys.game.config.height;
        const cellWidth = 200;
        const cellHeight = 48;
        
        //Draw Background
        const graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        graphics.lineBetween(gameWidth - cellWidth, gameHeight * 2 / 3, gameWidth - cellWidth, gameHeight);
        
        const actions = chica.actions;
        this.categoriesGroup = _this.add.group();
        const nOfOptions = actions.length;
        
        for (let i = 0; i < nOfOptions; i++) {
            const y = gameHeight * 2 / 3 + cellHeight * i;
            const x = 0 + gameWidth - cellWidth;

            let addedText = _this.add.text(x, y, ` ${ actions[i].name }`, {
                fontSize: '32px',
                fill: '#ffffff',
                color: '#ffffff',
                align: 'left',
                origin: { x: 0, y: 0 }
            });
            addedText.children = actions[i].children;
            this.categoriesGroup.add(addedText);

        }
        
        _this.input.keyboard.once("keydown_UP", function() {
            this.openMenu(_this, 0);
        }.bind(this));
        _this.input.keyboard.once("keydown_DOWN", function() {
            this.openMenu(_this, 0);
        }.bind(this));
    },
    
    /**
     * Code to scroll through combat menus
     * Should always be called with this bound to the actionOptions object
     * @param _this-the current scene
     * @param index-the index of the scene to be opened
     * @return null
    **/
    openMenu(_this, index = 0){
        //A few initial variables
        const gameWidth = _this.sys.game.config.width;
        const gameHeight = _this.sys.game.config.height;
        const cellWidth = 2 * 200;
        const cellHeight = 48;
        const length = this.categoriesGroup.getLength();
        
        //Remove old listeners & reset
        this.closeMenus(_this);
        
        //Change background color of selected menu
        this.categoriesGroup.children.entries[index].setBackgroundColor('#000000');

        //Draw Background
        const graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        graphics.lineBetween(gameWidth - cellWidth, gameHeight * 2 / 3, gameWidth - cellWidth, gameHeight);
        
        //const actions = chica.actions;
        const actions = this.categoriesGroup.children.entries[index].children;
        this.actionsGroup = _this.add.group();
        const nOfOptions = actions.length;
        
        for (let i = 0; i < nOfOptions; i++) {
            const y = gameHeight * 2 / 3 + cellHeight * i;
            const x = 10 + gameWidth - cellWidth;

            let addedText = _this.add.text(x, y, `${ actions[i].name }`, {
                fontSize: '32px',
                fill: '#ffffff',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 200 },
                origin: { x: 0, y: 0 },
            });
            addedText.children = actions[i].children;
            this.actionsGroup.add(addedText);

        }
        
        //Add new listeners
        _this.input.keyboard.once("keydown_UP", function() {
            index > 0          ? this.openMenu(_this, index - 1) : this.openMenu(_this, length - 1);
        }.bind(this));
        _this.input.keyboard.once("keydown_DOWN", function() {
            index < length - 1 ? this.openMenu(_this, index + 1) : this.openMenu(_this, 0);
        }.bind(this));
        _this.input.keyboard.once("keydown_LEFT", function() {
            this.categoriesGroup.children.entries[index].setBackgroundColor('#656565');
            this.selectInMenu(_this, 0, index);
        }.bind(this));
    },
    
    /**
     * Code to highlight and scroll through each option in the menu
     * @param _this-the current scene
     * @param index-the index of the action to be highlighted
     * @param parentIndex-the index of the category currently being displayed
     * @return null
    **/
    selectInMenu(_this, index, parentIndex){
        
        const length = this.actionsGroup.getLength();
        
        //Remove old listeners
        _this.input.keyboard.removeAllListeners("keydown_UP");
        _this.input.keyboard.removeAllListeners("keydown_DOWN");
        _this.input.keyboard.removeAllListeners("keydown_LEFT");
        for (let i = 0; i < length; i++) {
            this.actionsGroup.children.entries[i].setBackgroundColor('#888888');
        }
        
        //Add new listeners
        _this.input.keyboard.once("keydown_UP", function() {
            index > 0          ? this.selectInMenu(_this, index - 1, parentIndex) : this.selectInMenu(_this, length - 1, parentIndex);
        }.bind(this));
        _this.input.keyboard.once("keydown_DOWN", function() {
            index < length - 1 ? this.selectInMenu(_this, index + 1, parentIndex) : this.selectInMenu(_this, 0, parentIndex);
        }.bind(this));
        _this.input.keyboard.once("keydown_RIGHT", function() {
            this.openMenu(_this, parentIndex);
        }.bind(this));
        _this.input.keyboard.once("keydown_ENTER", function() {
            const attack = chica.actions[parentIndex].children[index];
            const level = _this.scene.get('Level');
            combat.newRound(level, attack);
        }.bind(this));
        
        //Open Menu
        this.actionsGroup.children.entries[index].setBackgroundColor('#000000');
    },
    
    /**
     * Code to close the open menu
     * Removes listeners, eliminates background color, and removes all entities from menu
     * @param _this-the current scene
     * @return null
    **/
    closeMenus(_this){
        const length = this.categoriesGroup.getLength();
        _this.input.keyboard.removeAllListeners("keydown_UP");
        _this.input.keyboard.removeAllListeners("keydown_DOWN");
        _this.input.keyboard.removeAllListeners("keydown_LEFT");
        for (let i = 0; i < length; i++) {
            this.categoriesGroup.children.entries[i].setBackgroundColor('#888888');
        }
    
        try {
            while(0 < this.actionsGroup.getLength()){
                this.actionsGroup.children.entries[0].destroy();
            }
        }catch(e){console.warn(e)}
    },
    
};

export default actionOptions;