class StartScene extends Phaser.Scene {

    constructor() {
        super({ Key: "StartScene" });
    }


    preload() {
        this.load.image('background', 'assets/foreground.png');
    }

    create() {
        this.image = this.add.image(400, 300, 'background');
    }
}

export default StartScene;