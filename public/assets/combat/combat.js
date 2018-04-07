//JS Module for combat system
import Dialogue from '../dialogue/dialogue.js';

const combat = {
    createCombat(_this, player, enemies) {
        if (!Array.isArray(enemies)) {
            enemies = [enemies];
        }
        this.player = player;
        this.enemies = enemies;
        this.displayEnemies(_this);
    },

    displayEnemies(_this) {
        const width = _this.sys.game.config.width;
        const height = _this.sys.game.config.height;
        for (let i = 0; i < this.enemies.length; i++) {
            const x = width / (this.enemies.length + 1) * (i + 1);
            this.enemies[i].createInBattle(_this, x, height / 3);
        }
    },

    newRound(_this, playerAttack, enemy = 0) {
        //Define a single enemy
        this.enemy = this.enemies[enemy];

        //Search through player's abilities to find the right one
        for (let i = 0; i < this.player.actions.length; i++) {
            if (this.player.actions[i].name === playerAttack) {
                playerAttack = this.player.actions[i];
            }
        }

        //Randomly pick an attack out of possible attacks
        const enemyAttack = this.enemy.actions[Math.floor(Math.random() * this.enemies[enemy].actions.length)];

        //Calculate final HP
        this.player.stats.hp += playerAttack.restoresHealth + playerAttack.reducesDamage - enemyAttack.dealsDamage;
        if (this.player.stats.hp < 0) {
            this.player.stats.hp = 0;
        }
        this.enemy.stats.hp += enemyAttack.restoresHealth + enemyAttack.reducesDamage - playerAttack.dealsDamage;
        if (this.enemy.stats.hp < 0) {
            this.enemy.stats.hp = 0;
        }
        
        //Create Dialogue to display results
        _this.scene.add('Dialogue', new Dialogue([{
            char: 'Combat',
            text: `${ this.enemy.name } used ${ enemyAttack.name.toUpperCase() }\n${ this.player.name } took ${ enemyAttack.dealsDamage } points of damage\n\n${ this.player.name } used ${playerAttack.name.toUpperCase() }\n${ this.enemy.name } took ${ playerAttack.dealsDamage } points of damage\n`
        }, ], 0x8888ff));
    },
};

export default combat;