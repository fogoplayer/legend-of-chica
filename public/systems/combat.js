//JS Module for combat system
import Dialogue from './dialogue.js';

const combat = {
    name: 'combat',

    /**
     * Sets up combat
     * @param scene-the scene object
     * @param player-the player object
     * @param enemies-the enemy object, or array of enemy objects
     * @return null
     **/
    createCombat(scene, player, enemies) {
        if (!Array.isArray(enemies)) {
            enemies = [enemies];
        }
        this.player = player;
        this.enemies = enemies;
        this.displayEnemies(scene);
        this.attackLimiter = undefined;
    },

    /**
     * Displays enemies, spacing them equally across the screen
     * @param scene-the scene object
     * @return null
     **/
    displayEnemies(scene) {
        const width = scene.sys.game.config.width;
        const height = scene.sys.game.config.height;
        for (let i = 0; i < this.enemies.length; i++) {
            const x = width / (this.enemies.length + 1) * (i + 1);
            this.enemies[i].createInBattle(scene, x, height / 3);
        }
    },

    /**
     * A single attack-counterattack round of combat
     * @param scene-the scene object
     * @param playerAttack-the attack the player chose
     * @param enemy-the index of the enemy being attacked. Defaults to 0.
     **/
    async newRound(scene, playerAttack, enemy = 0) {
        //If not the required attack or invalid use of an item, return without running the attack
        if (this.attackLimiter && playerAttack.name !== this.attackLimiter) {
            return;
        }
        if (playerAttack.supply > 0) {
            playerAttack.useItem();
        }
        else if (playerAttack.supply <= 0) {
            return;
        }

        //Define a single enemy
        this.enemy = this.enemies[enemy];

        //Randomly pick an attack out of possible attacks
        const enemyAttack = this.enemy.actions[Math.floor(Math.random() * this.enemies[enemy].actions.length)];

        //Calculate final HP
        if (enemyAttack.dodge) {
            playerAttack.dealsDamage = 0;
        }
        this.player.stats.hp += playerAttack.restoresHealth + playerAttack.reducesDamage - enemyAttack.dealsDamage;
        if (this.player.stats.hp < 0) {
            this.player.stats.hp = 0;
        }
        this.enemy.stats.hp += enemyAttack.restoresHealth + enemyAttack.reducesDamage - playerAttack.dealsDamage;
        if (this.enemy.stats.hp < 0) {
            this.enemy.stats.hp = 0;
        }


        this.player.updateInBattle();
        this.enemy.updateInBattle();

        let dialogArray = [];
        dialogArray.push({
            char: 'Combat',
            text: `${ this.enemy.displayName } used ${ enemyAttack.name.toUpperCase() }`
        });
        if (enemyAttack.dealsDamage - playerAttack.reducesDamage > 0) {
            dialogArray.push({
                char: 'Combat',
                text: `${ this.player.displayName } lost ${ enemyAttack.dealsDamage - playerAttack.reducesDamage} HP`
            });
        }
        if (enemyAttack.restoresHealth > 0){
            dialogArray.push({
                char: 'Combat',
                text: `${ this.enemy.displayName } ragained ${ enemyAttack.restoresHeath} HP`
            });
        }
        dialogArray.push({
            char: 'Combat',
            text: `${ this.player.displayName } used ${ playerAttack.name.toUpperCase() }`
        });
        if (playerAttack.dealsDamage - enemyAttack.reducesDamage > 0) {
            dialogArray.push({
                char: 'Combat',
                text: `${ this.enemy.displayName } lost ${ playerAttack.dealsDamage - enemyAttack.reducesDamage} HP`
            });
        }
        if (playerAttack.restoresHealth > 0){
            dialogArray.push({
                char: 'Combat',
                text: `${ this.player.displayName } ragained ${ playerAttack.restoresHealth} HP`
            });
        }

        //Create Dialogue to display results
        await Dialogue.dialogueConstructorWithPromise(scene, dialogArray, 0x8888ff);

        this.attackLimiter = undefined;

        this.resolve ? this.resolve() : null;
    },

    update(scene) {
        actionOptions.update(scene)
    }
};


export default combat;