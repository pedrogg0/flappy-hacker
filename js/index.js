var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("background", 'assets/foreground.png');
    this.load.spritesheet("idle", "assets/idle.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("jump", "assets/jump.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("land", "assets/land.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("run", "assets/run.png", { frameWidth: 48, frameHeight: 48 });
}

function create ()
{
    //Background creation
    background = this.add.image(400, 200, "background");
    background.setScale(1.75);

    //Player creation
    player = this.physics.add.sprite(200, 450, 'idle');
    player.setScale(2);
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300)

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 9 }),
        frameRate: 3,
        repeat: -1
    });
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('run', { start: 0, end: 10 }),
        frameRate: 6
    });
    
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 8 }),
        frameRate: 2,
        repeat: -1
    });

    this.anims.create({
        key: 'land',
        frames: this.anims.generateFrameNumbers('land', { start: 0, end: 8 }),
        frameRate: 2,
        repeat: -1
    });

    //Bounds creation

}

function update ()
{

    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.up.isDown && player.body.checkWorldBounds()) {
        player.setVelocityY(-330);
    }
    if(!player.body.checkWorldBounds()){
        player.anims.play('jump', true);
    }
    else{
        player.anims.play("run", true);
    }
}