class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }
    
    
    preload() {
        this.load.image('background', 'assets/foreground.png');
        this.load.spritesheet("run", "assets/run.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("jump", "assets/jump.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("wall1", "assets/wall1.png", { frameWidth: 45, frameHeight: 30 });
        this.load.spritesheet("wall2", "assets/wall2.png", { frameWidth: 49, frameHeight: 34 });

    }

    create() {
        //Add background
        this.image = this.add.image(0, 0, 'background');
        this.image.setOrigin(0,0);

        //Keyboard handler
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Props creation
        this.wall = this.physics.add.sprite(700,220, "wall1");
        this.wall.body.setAllowGravity(false);
        this.wall.inputEnabled = true;
        this.wall.setSize(4,4);
        
        //Animation for the character
        this.anims.create({
            key: "run",
            frameRate: 16,
            frames: this.anims.generateFrameNumbers("run", { start: 0, end: 7}),
        });
        this.anims.create({
            key: "jump",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 3}),
        });

        //Physics
        //World Gravity
        this.physics.world.gravity.y = 400;

        //Physics for the character
        this.character = this.physics.add.sprite(250, 220, "run");
        this.character.setGravityY(300);
        this.character.setCollideWorldBounds(true);
        this.character.setScale(1.5);
        
    }
    
    update(){
        var onAir = !this.character.body.onFloor(); // Check if the character is in the air
        if (onAir) {
            this.character.play("jump", true);  // Play the jump animation if in the air
        } else {
            this.character.play("run", true);   // Play the run animation if on the ground
        }
        
        if(this.space.isDown && this.character.body.onFloor()){
            this.character.setVelocityY(-310);
        }
        //Walls movement
        this.wall.x -= 6; //Walls speed (difficulty)
        if(this.wall.x < 0){
            this.spawnWall();
        }
        this.physics.add.collider(this.wall, this.character, function(){
            console.log("collision");
        });
    }

    spawnWall(){
        this.wall.destroy();
        this.wall = this.physics.add.sprite(600,220, "wall" + Math.floor(Math.random() * 2 + 1));
        this.wall.body.setAllowGravity(false);
        this.wall.setSize(4,4);
    }

}


export default GameScene;