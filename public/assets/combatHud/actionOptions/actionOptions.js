//JS Module to display attacks at the bottom of the screen
import chica from '../../../sprites/chica/chica.js';

const actionOptions = {
    
    preload(_this){
        
    },
    
    
    create(_this){
        let graphics = _this.add.graphics();
        graphics.lineStyle(1, 0xffffff);
        let actions = chica.attributes.actions;
        let nOfOptions = actions.length;
        let cellWidth = 100;
        let cellHeight = 16 * 4;
        
        for (let i = 0; i < nOfOptions; i++){
            let y = _this.sys.game.config.height - cellHeight;
            let x = _this.sys.game.config.width/2 + (-(nOfOptions - 1)/2 + i ) * (cellWidth);
            
            graphics.lineBetween(x - cellWidth/2, y, x - cellWidth/2, y + 100);
            
            let addedText = _this.add.text(x, y, `${ i + 1 }\n${ actions[i].name }`, { fontSize: '16px', fill: '#ffffff', color: '#ffffff', align:'center'});
            addedText.setOrigin(0.5,0);
            
            graphics.lineBetween(x + cellWidth/2, y, x + cellWidth/2, y + cellHeight);
        }
    },
    
    update(_this){
        
    }
};

export default actionOptions;