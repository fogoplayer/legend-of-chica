//JS module for the Dialogue Scene

import system from './system.js';

class Dialogue extends Phaser.Scene {
    
    /**
     * Constructor for Dialogue
     * @param DialogList-an array of objects with one property, `char`, for the character name and one property, `text`, for the spoken text.
     * @param color-(Optional) a way to specify a hex code for the dialogue popup.
     * @return null
    **/
    constructor(dialogList, color = 0x009900, resolve = function(){}) {
        super({
            key: 'Dialogue'
        });
        Phaser.Scene.call(this, {
            key: 'Dialogue',
            active: true
        });
        this.dialogList = dialogList;
        this.dialogIndex = 0;
        this.color = color;
        this.resolve=resolve;
    }
    
    /**
     * Code to create Dialogue inside a promise
     * Since the dialogue system now uses async/await,
     * I wanted an async function that invoked the Dialog
     * constructor and returned a promise, just to simplify
     * implementation.
     * @param scene-the current scene
     * @param dialogList-an array of objects with one property, `char`, for the character name and one property, `text`, for the spoken text.
     * @param color-(Optional) a way to specify a hex code for the dialogue popup.
     * @return Promise
    **/
    static dialogueConstructorWithPromise(scene, dialogList, color = 0x009900){
        return new Promise((resolve,reject) => {
            let dialogue = scene.scene.manager.add('Dialogue', new Dialogue(dialogList, color, resolve));
        });
    }
    
    /**
     * Preload Welbutrin
     * @param null
     * @return null
    **/
    preload() {
        this.load.bitmapFont('welbutrin', './assets/fonts/font.png', './assets/fonts/font.fnt');
    }
    
    /**
     * Create function for Dialogue
     * @param null
     * @return null
    **/
    create() {
        //Create shorthand variables and set up stuff
        const height = this.sys.game.config.height;
        const width = this.sys.game.config.width;
        const graphics = this.add.graphics();

        //Close on enter key
        this.input.keyboard.on('keydown_ENTER', function() {
            if (!this.sys.isSleeping()) {
                this.dialogIndex++;
                clearInterval(this.interval);
                this.sys.sleep();
                this.loadDialogue();
            }
        }, this);

        //Dim background
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, height, width);

        //TODO Add character image
        //Chica on the left, NPCs on the right

        //Add text box
        graphics.fillStyle(this.color, 0.5);
        graphics.fillRect(0, height / 1.5, this.sys.game.config.width, height / 1.5);

        //Create text boxes
        this.text = this.add.bitmapText(10, height / 1.5 + 10, 'welbutrin', '', 32);
        this.add.bitmapText(width - 10, height - 20, 'welbutrin', 'ENTER', 32).setOrigin(1,1);

        //Load first line of dialogue
        this.loadDialogue();
    }
    
    /**
     * Updates the dialogue in the dialogue box. or closes the dialogue popup
     * @param null
     * @return null
    **/
    loadDialogue() {
        if (this.dialogIndex < this.dialogList.length) {
            
            system.pauseExceptFor('Level', this);
            
            let i = 0;
            let lastSpaceIndex;
            const dialogText = this.dialogList[this.dialogIndex];
            this.interval = setInterval(()=>{
                if(i < dialogText.text.length){
                    this.text.setText(`${ dialogText.char }:\n${ dialogText.text.substring(0,++i) }`);
                    
                    //Keep track of spaces
                    if(dialogText.text.substring(i - 1,i) === " "){ lastSpaceIndex = i - 1 }
                    
                    //Insert line breaks dynamically
                    if(this.text.width >= 512*1.5 - 20){ dialogText.text = dialogText.text.substring(0,lastSpaceIndex)+"\n"+dialogText.text.substring(lastSpaceIndex + 1); }
                }else{
                    clearInterval(this.interval);
                }
                
            },20);
            
            this.sys.wake();
        }
        else {
            this.input.keyboard.removeAllListeners('keydown_ENTER');
            this.input.keyboard.once('keyup_ENTER', ()=>{
                system.resumeAll(this);
            });
            this.scene.manager.remove('Dialogue');
            console.info('Dialogue terminated');
            this.resolve ? this.resolve() : null;
        }

    }

}

export default Dialogue;