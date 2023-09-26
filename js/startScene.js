import GameScene from "./gameScene.js";

class StartScene extends Phaser.Scene {

    constructor() {
        super("StartScene");
    }


    preload() {
        this.load.image('background', 'assets/foreground.png');
        this.load.spritesheet("idle", "assets/idle.png", { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        this.image = this.add.image(0, 0, 'background');
        this.image.setOrigin(0,0);

        //Animation for the character
        this.anims.create({
            key: "idle",
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 10}),
        });
        //Physics for the character
        this.character = this.physics.add.sprite(250, 220, "idle");
        this.character.setScale(1.5);
        //Space text and space input handler
        this.add.text(125, 125, 'Press space to start', { font: '40px Arial' });
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }
    
    update(){
        this.character.play("idle", true);
        //Checking if space key is down for launching game scene
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start("GameScene");
        }

    }

}


export default StartScene;