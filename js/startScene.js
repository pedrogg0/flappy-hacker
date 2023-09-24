class StartScene extends Phaser.Scene {

    constructor() {
        super({ Key: "StartScene" });
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
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 10}),
        });

        this.character = this.physics.add.sprite(250, 220, "idle");
        this.character.setScale(1.5);
        this.add.text(125, 125, 'Press space to start', { font: '40px Arial' });
        this.input.keyboard.on('keydown-ENTER', function (event) {
            console.log("hola");
        });

    }

    update(){
        this.character.play("idle", true);

    }

}


export default StartScene;