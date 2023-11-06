import StartScene from "./startScene.js";
import GameScene from "./gameScene.js";
import EndGameScene from "./endGameScene.js";
//Main game file
WebFont.load({
    google: {
        families: ['Audiowide']
    },
    active: function() {
        // Inicia el juego una vez que las fuentes estén activas
        startGame();
    }
});

function startGame(){
    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 250,
        backgroundColor: '#351f1b',
        parent: 'Flappy Hacker',
        physics: {
            default: 'arcade'
        },
        canvasStyle: `display: block; width: 80%; height: 80%;`,
        autoFocus: true,
        scene: [StartScene, GameScene, EndGameScene],
    };
    
    let game = new Phaser.Game(config);
}
