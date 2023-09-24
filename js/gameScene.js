class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }
    
    
    preload() {
        this.load.image('background', 'assets/foreground.png');
        this.load.spritesheet("run", "assets/run.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("jump", "assets/jump.png", { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        this.image = this.add.image(0, 0, 'background');
        this.image.setOrigin(0,0);
        //Animation for the character
        this.anims.create({
            key: "run",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("run", { start: 0, end: 10}),
        });
        this.anims.create({
            key: "jump",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 10}),
        });
        //Physics for the character
        this.character = this.physics.add.sprite(250, 220, "run");
        this.character.setScale(1.5);
        
    }
    
    update(){
        this.character.play("run", true);


    }

}


export default GameScene;