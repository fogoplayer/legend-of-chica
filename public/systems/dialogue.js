//JS module for the Dialogue Scene

class Dialogue extends Phaser.Scene {
    
    /**
     * Constructor for Dialogue
     * @param DialogList-an array of objects with one property, `char`, for the character name and one property, `text`, for the spoken text.
     * @param color-(Optional) a way to specify a hex code for the dialogue popup.
     * @return null
    **/
    constructor(dialogList, color = 0x009900) {
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
            let dialogue = scene.scene.manager.add('Dialogue', new Dialogue(dialogList, color));
            dialogue.resolve = resolve;
        });
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
                                                                                              console.log('Index', this.dialogueIndex);
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
        this.text = this.add.text(10, height / 1.5 + 10, '', {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff',
            wordWrap: { width: width - 20, },
        });
        this.add.text(width - 10, height - 10, 'ENTER', {
            fontSize: '32px',
            fill: '#ffffff',
            color: '#ffffff',
        }).setOrigin(1,1);

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
                                                                    console.log(this.dialogIndex++, this.dialogList.length);
            this.scene.manager.pause('Level');
            
            let i = 1
            this.interval = setInterval(()=>{
                if(i<this.dialogList[this.dialogIndex].text.length){
                    this.text.setText(`${ this.dialogList[this.dialogIndex].char }:\n${ this.dialogList[this.dialogIndex].text.substring(0,++i) }`);
                }else{
                    clearInterval(this.interval);
                }
                
            },30);
            
            this.sys.wake();
        }
        else {
            this.input.keyboard.removeAllListeners('keydown_ENTER');
            this.scene.manager.resume('Level');
            this.scene.manager.remove('Dialogue');
            console.info('Dialogue terminated');
            this.resolve ? this.resolve() : null;
        }

    }

}

export default Dialogue;