class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }
    
    
    preload() {
        this.load.image('background', 'assets/foreground.png');
        this.load.spritesheet("run", "assets/run.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("jump", "assets/jump.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("wall1", "assets/wall1.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet("wall2", "assets/wall2.png", { frameWidth: 50, frameHeight: 50 });

    }

    create() {
        //Add background
        this.image = this.add.image(0, 0, 'background');
        this.image.setOrigin(0,0);

        //Keyboard handler
        this.cursors = this.input.keyboard.createCursorKeys();

        //Props creation
        this.wall = this.add.sprite(700,220, "wall1");
        this.wall.inputEnabled = true;

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
        
        if(this.cursors.up.isDown && this.character.body.onFloor()){
            this.character.setVelocityY(-310);
        }
        //Walls movement
        this.wall.x -= 5; //Walls speed (difficulty)
        if(this.wall.x < 0){
            this.wall.destroy();
            this.wall = this.add.sprite(600,220, "wall" + Math.floor(Math.random() * 2 + 1));
        }

        if(this.wall.onInputOver != null){
            console.log("touch wall");
        }
    }

}


export default GameScene;