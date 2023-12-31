import EndGameScene from "./endGameScene.js";
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
        this.load.audio('jumpSound', 'assets/jump.mp3');
        this.load.audio('wallCrash', 'assets/death.mp3');

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
        //World framerate
        this.physics.world.setFPS(60);
        //World Gravity
        this.physics.world.gravity.y = 400;

        //Physics for the character
        this.character = this.physics.add.sprite(250, 220, "run");
        this.character.setGravityY(300);
        this.character.setCollideWorldBounds(true);
        this.character.setScale(1.5);
        
        //score
        this.score = 0;
        this.registry.set('score', this.score); //Save score in registry for use it later on endGameScene
        this.scoreText = this.add.text(10, 0, 'Score: 0', { fontFamily: 'Audiowide', fontSize: '30px', color: '#CCFF00'});
        
    }
    
    update(time, delta){
        this.playAnimations();
        this.manageJump();
        this.wallsMovement(delta);
        this.checkCollision();
    }

    
    //play animations depending on character situation
    playAnimations() {
        var onAir = !this.character.body.onFloor(); // Check if the character is in the air
        if (onAir) {
            this.character.play("jump", true);  // Play the jump animation if in the air
        } else {
            this.character.play("run", true);   // Play the run animation if on the ground
        }
    }
    
    //Jump when spacebar is pressed
    manageJump() {
        if (this.space.isDown && this.character.body.onFloor()) {
            this.character.setVelocityY(-310);
            this.sound.play('jumpSound');
        }

        
    }
    
    wallsMovement(delta) {
        this.wall.x -= this.getDifficulty() * delta/10; //Walls speed (difficulty) Using delta for make the speed the same in every monitor not depending on refresh rate
        if (this.wall.x < 0) {
            this.spawnWall(); //Spawn new wall when current wall exit scene
        }
    }
    
    //Spawn wall when the last wall exit the scene
    spawnWall(){
        this.wall.destroy(); //Destroy previous wall object
        if(this.score < 90){
            this.wall = this.physics.add.sprite(600,220, "wall" + Math.floor(Math.random() * 2 + 1)); //Choose randomly between wall assets
            this.wall.body.setAllowGravity(false);
            this.wall.setSize(4,4);
            this.score += 5; //Increase score every time a wall does spawn
            this.scoreText.setText("Score: " + this.score);
            this.registry.set('score', this.score); //Save score in registry for use it later on endGameScene
        }
        else{
            if(!this.wallEvent || this.wallEvent.getProgress() === 1){ //Randomize time between new walls after score is higher of 90 to increase difficulty
                this.wallEvent = this.time.addEvent({ //Time event for animate new record text display
                    delay: Phaser.Math.Between(0, 1500),                
                    callback: () => {           
                        this.wall = this.physics.add.sprite(600,220, "wall" + Math.floor(Math.random() * 2 + 1)); //Choose randomly between wall assets
                        this.wall.body.setAllowGravity(false);
                        this.wall.setSize(4,4);
                        this.score += 5; //Increase score every time a wall does spawn
                        this.scoreText.setText("Score: " + this.score);
                        this.registry.set('score', this.score); //Save score in registry for use it later on endGameScene
                    },
                    callbackScope: this,        
                    loop: false                 
                });
            }
        }
    }

    checkCollision(){
        this.physics.add.collider(this.wall, this.character, collision.bind(this));
    }

    getDifficulty(){
        if(this.score < 20){
            return 3;
        }
        else if(this.score < 40){
            return 4;
        }
        else if(this.score < 60){
            return 5;
        }
        else if(this.score < 90){
            return 6;
        }
        else{
            return 7
        }

    }
    
}

function collision(){
    this.sound.play('wallCrash');
    this.wall.destroy();
    this.scene.start("EndGameScene");
}


export default GameScene;