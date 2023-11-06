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
        this.add.text(120, 100, 'Game Over', { fontSize: '60px', fontFamily: 'Audiowide', color: '#CCFF00' });
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //Last score display
        this.lastScore = this.registry.get('score');
        if(this.lastScore < 10){ //For the purpose of correct spacing of the text from the border of the canvas
            this.scoreText = this.add.text(350, 0, 'Last Score: ' + this.lastScore, { fontFamily: 'Audiowide', fontSize: '30px', color: '#CCFF00'});
        }
        else{
            this.scoreText = this.add.text(345, 0, 'Last Score: ' + this.lastScore, { fontFamily: 'Audiowide', fontSize: '30px', color: '#CCFF00'});
        }

        //Highscore comparison and text display
        this.highScore = this.registry.get("highScore");
        if(this.highScore < this.lastScore){
            this.highScore = this.lastScore;
            this.registry.set("highScore", this.highScore);
            this.highScoreText = this.add.text(10, 0, 'New Record!!', { fontFamily: 'Audiowide', fontSize: '30px', color: '#CCFF00'});
            this.time.addEvent({ //Time event for animate new record text display
                delay: 1000,                
                callback: () => {           
                    this.highScoreText.setText('High score: ' + this.highScore);
                },
                callbackScope: this,        
                loop: false                 
            });
        }
        else{
            this.scoreText = this.add.text(10, 0, 'High score: ' + this.highScore, { fontFamily: 'Audiowide', fontSize: '30px', color: '#CCFF00'});
        }
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