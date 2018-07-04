//JS Module to display attacks during combta
import chica from '../../../sprites/chica/chica.js';
import combat from '../../combat.js';

const actionOptions = {
    name:'actionOptions',
    index:0,
    parentIndex:undefined,
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
        
        //Vertical Line
        const graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        graphics.lineBetween(gameWidth - cellWidth, gameHeight * 2 / 3, gameWidth - cellWidth, gameHeight);
        
        //Add Text
        const categories = chica.actions;
        this.categoriesGroup = _this.add.group();
        const nOfOptions = categories.length;
        
        for (let i = 0; i < nOfOptions; i++) {
            const y = gameHeight * 2 / 3 + cellHeight * i;
            const x = 0 + gameWidth - cellWidth;

            let addedText = _this.add.text(x, y, ` ${ categories[i].name }`, {
                fontSize: '32px',
                fill: '#ffffff',
                color: '#ffffff',
                align: 'left',
                origin: { x: 0, y: 0 }
            });
            addedText.children = categories[i].children;
            this.categoriesGroup.add(addedText);

        }
        
        // _this.input.keyboard.once("keydown_UP", function() {
        //     this.openMenu(_this, 0);
        // }.bind(this));
        // _this.input.keyboard.once("keydown_DOWN", function() {
        //     this.openMenu(_this, 0);
        // }.bind(this));
    },
    
    /**
     * Code to scroll through combat menus
     * Should always be called with this bound to the actionOptions object
     * @param _this-the current scene
     * @param index-the index of the scene to be opened
     * @return null
    **/
    openMenu(_this, index = 0){
        this.index = index;
        this.parentIndex = undefined;
        
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

        //Vertical Line
        const graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        graphics.lineBetween(gameWidth - cellWidth, gameHeight * 2 / 3, gameWidth - cellWidth, gameHeight);
        
        const actions = this.categoriesGroup.children.entries[index].children;
        this.actionsGroup = _this.add.group();
        let nOfOptions = actions.length;
        
        for (let i = 0; i < nOfOptions; i++) {
            let itemsLeft = "";
            if (actions[i].supply > 0 && actions[i]) {
                itemsLeft = ` (${ actions[i].supply })`
            }
            else if (actions[i].supply <= 0) {
                actions.pop(actions[i--]);
                nOfOptions--
                continue;
            }

            const y = gameHeight * 2 / 3 + cellHeight * i;
            const x = 10 + gameWidth - cellWidth;
            
            let addedText = _this.add.text(x, y, `${ actions[i].name + itemsLeft}`, {
                fontSize: '32px',
                fill: '#ffffff',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 200 },
                origin: { x: 0, y: 0 },
            });
            this.actionsGroup.add(addedText);
                                                                                                                console.log('Add', actions[i].name);
        }
        
        //If there are no options in a particular menu, display an error
        if(this.actionsGroup.children.size === 0){
            const y = gameHeight * 2 / 3;
            const x = 10 + gameWidth - cellWidth;
            
            let addedText = _this.add.text(x, y, 'Nothing to see here!', {
                fontSize: '32px',
                fill: '#ffffff',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 200 },
                origin: { x: 0, y: 0 },
            });
            this.actionsGroup.add(addedText);
        }
        //Add new listeners
        else {
            // _this.input.keyboard.once("keydown_LEFT", function() {
            //     this.categoriesGroup.children.entries[index].setBackgroundColor('#656565');
            //     this.selectInMenu(_this, 0, index);
            // }.bind(this));
        }
        // _this.input.keyboard.once("keydown_UP", function() {
        //     index > 0          ? this.openMenu(_this, index - 1) : this.openMenu(_this, length - 1);
        // }.bind(this));
        // _this.input.keyboard.once("keydown_DOWN", function() {
        //     index < length - 1 ? this.openMenu(_this, index + 1) : this.openMenu(_this, 0);
        // }.bind(this));
    },
    
    /**
     * Code to highlight and scroll through each option in the menu
     * @param _this-the current scene
     * @param index-the index of the action to be highlighted
     * @param parentIndex-the index of the category currently being displayed
     * @return null
    **/
    selectInMenu(_this, index, parentIndex){
        this.index = index;
        this.parentIndex = parentIndex;
        
        const length = this.actionsGroup.getLength();
        
        //Remove old listeners
        _this.input.keyboard.removeAllListeners("keydown_UP");
        _this.input.keyboard.removeAllListeners("keydown_DOWN");
        _this.input.keyboard.removeAllListeners("keydown_LEFT");
        _this.input.keyboard.removeAllListeners("keydown_ENTER");
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
            combat.newRound(level, attack)
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
        _this.input.keyboard.removeAllListeners("keydown_ENTER");
        for (let i = 0; i < length; i++) {
            this.categoriesGroup.children.entries[i].setBackgroundColor('#888888');
        }
    
        try {
            while(0 < this.actionsGroup.getLength()){
                this.actionsGroup.children.entries[0].destroy();
            }
        }catch(e){console.warn(e)}
    },
    
    update(_this){
        const justDown = key => Phaser.Input.Keyboard.JustDown(_this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]));
        let length;
        if(!this.parentIndex){ length = this.categoriesGroup.getLength(); }else{ length = this.actionsGroup.getLength(); }
        
        //Navigate up and down menus
        if(justDown('W') || justDown('UP')){
            if(!this.parentIndex){
                this.openMenu(_this, this.index > 0 ? this.index - 1 : length - 1);
            }
                                                                                               console.log(_this.children.list);

        }
        
        if(justDown('S') || justDown('DOWN')){
            if(!this.parentIndex){
                this.openMenu(_this, this.index < length - 1 ? this.index + 1 : 0);
            }
        }
        
        //Open and close menus
        if((justDown('A') || justDown('LEFT')) && !this.parentIndex && this.actionsGroup.children.size > 0){
            
            this.selectInMenu(_this,0,this.index);
        }
    }
    
};

export default actionOptions;