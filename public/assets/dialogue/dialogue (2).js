//JS module for the Dialogue Scene

class Dialogue extends Phaser.Scene {
    constructor(dialogList){
        super({key:'Dialogue'});
        Phaser.Scene.call(this, { key: 'Dialogue', active: true});
        this.dialogList = dialogList;
        this.dialogIndex = 0;
    }
    
    preload(){
    }
    
    create(){
        //Create shorthand variables and set up stuff
        const height = this.sys.game.config.height;
        const width = this.sys.game.config.width;
        const graphics = this.add.graphics();
        
        //Setup Emitter
        this.input.keyboard.on('keydown_ENTER', function() {
            this.sys.sleep();
            this.loadDialogue();
        }, this);
        
        //Dim background
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, height, width);
        
        //TODO Add character image
        //Chica on the left, NPCs on the right
        
        //Add text box
        graphics.fillStyle(0x009900, 1);
        graphics.fillRect(0, height/2, this.sys.game.config.width, height);
        
        //Create text boxes
        this.text = this.add.text(10, height/2 + 10, '', { fontSize: '32px', fill: '#ffffff', color: '#ffffff' }).setOrigin(0,0);
        this.add.text(width - 10, height - 10, 'ENTER', { fontSize: '32px', fill: '#ffffff', color: '#ffffff' }).setOrigin(1,1);
        
        //Load first line of dialogue
        this.loadDialogue(this.dialogList[this.dialogIndex].char, this.dialogList[0].text);
    }
    
    update(){
        
    }
    
    loadDialogue(){
        if(this.dialogIndex < this.dialogList.length){
            this.text.setText(`${ this.dialogList[this.dialogIndex].char }:\n${ this.dialogList[this.dialogIndex].text }`);
            this.sys.wake();
            this.dialogIndex++;
            this.scene.manager.pause('Level')
            console.log(this.scene.manager.scenes[0].sys.settings.active);
        }else{
            this.scene.manager.resume('Level')
            console.log(this.scene.manager.scenes[0].sys.settings.active);
        }
    }

}

export default Dialogue;