//JS Module to display attacks at the bottom of the screen
import chica from '../../../sprites/chica/chica.js';

const actionOptions = {
    
    preload(_this){
        
    },
    
    
    create(_this){
        const graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        const actions = chica.actions;
        const nOfOptions = actions.length;
        const gameWidth = _this.sys.game.config.width;
        const gameHeight = _this.sys.game.config.height;
        const cellWidth = 160;
        const cellHeight = 24;
        
        graphics.lineBetween(gameWidth - cellWidth, _this.sys.game.config.height/2, gameWidth - cellWidth, gameHeight /*_this.sys.game.config.height / 2 + cellHeight * nOfOptions*/);
        
        for (let i = 0; i < nOfOptions; i++){
            const y = _this.sys.game.config.height/2 + cellHeight * (i + .5);
            const x = gameWidth - cellWidth;
            
            //graphics.lineBetween(x, y - cellHeight / 2, x + cellWidth, y - cellHeight / 2);
            
            let addedText = _this.add.text(x, y, ` ${ i + 1 } ${ actions[i].name }`, { fontSize: '16px', fill: '#ffffff', color: '#ffffff', align:'left'});
            addedText.setOrigin(0,0.5);
            
            //graphics.lineBetween(x, y + cellHeight / 2, x + cellWidth, y + cellHeight / 2);
        }
    },
    
    update(_this){
        
    }
};

export default actionOptions;