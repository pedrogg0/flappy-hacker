import GameScene from "./gameScene.js";

class EndGameScene extends Phaser.Scene {

    constructor() {
        super("EndGameScene");
    }


    preload() {
        console.log("here");
        this.load.image('background', 'assets/foreground.png');
        this.load.spritesheet("death", "assets/death.png", { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.image = this.add.image(0, 0, 'background');
        this.image.setOrigin(0, 0);

        //Animation for the character
        this.played = false;
        this.anims.create({
            key: "death",
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("death", { start: 0, end: 10 }),
        });

        //character creation
        this.character = this.add.sprite(250, 220, "death");
        this.character.setScale(1.5);

        //Space text and space input handler
        this.add.text(200, 100, 'Game Over', { fontSize: '60px', fontFamily: 'Handjet', color: '#a80874' });
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    }
    
    update() {
        if(!this.played){
            this.character.play("death", true);
            this.played = true;
        }
        
        //Checking if space key is down for launching game scene
        if (Phaser.Input.Keyboard.JustDown(this.space))
        {
            this.scene.start("GameScene");
            //this.theOtherScene.scene.restart();
        }

    }


}


export default EndGameScene;