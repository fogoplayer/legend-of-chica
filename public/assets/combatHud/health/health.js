//JS Module for health
const health = {
    
    attributes: {
        health:0,
    },
    
    preload(_this){
        
    },
    
    
    create(_this, initialX, initialY){
        
    },
    
    changeHealth(amount){
        health.attributes.health += amount;
        health.attributes.healthText = 'Health: ' + health.attributes.health;
    }
};

export default health;