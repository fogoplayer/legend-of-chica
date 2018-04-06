const dude = {
    preload: (obj) => {
        obj.load.spritesheet('dude', './sprites/dude/dude.png',{frameWidth:32, frameHeight: 48});
        console.log(obj);
    },
    
    create: (obj, vars) => {
        vars.player = obj.physics.add.sprite(100, 450, 'dude');

        vars.player.setBounce(0.2);
        vars.player.setCollideWorldBounds(true);

        obj.anims.create({
            key: 'left',
            frames: obj.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        obj.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        obj.anims.create({
            key: 'right',
            frames: obj.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    },
    
    update: (obj, vars) => {
        if (vars.cursors.left.isDown)
        {
            vars.player.setVelocityX(-160);
        
            vars.player.anims.play('left', true);
        }
        else if (vars.cursors.right.isDown)
        {
            vars.player.setVelocityX(160);
        
            vars.player.anims.play('right', true);
        }
        else
        {
            vars.player.setVelocityX(0);
        
            vars.player.anims.play('turn');
        }
        
        if (vars.cursors.up.isDown && vars.player.body.touching.down)
        {
            vars.player.setVelocityY(-330);
        }
    },
};

export default dude;