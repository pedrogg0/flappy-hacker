import StartScene from "./startScene.js";
//Main game file
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    backgroundColor: '#351f1b',
    parent: 'Flappy Hacker',
    physics: {
        default: 'arcade'
    },
    //canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    scene: [StartScene],
};

let game = new Phaser.Game(config);