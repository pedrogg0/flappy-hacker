// Create the application helper and add its render target to the page
const app = new PIXI.Application({width: 800, height: 400});
$("#element").html(app.view);



PIXI.Assets.load([
    "assets/spritesheet.json",
]).then(() => {
    function drawAnimation(animation){ //idle,run,jump
        // get the sheet json data, required for resolving animations
        const animations = PIXI.Assets.cache.get("assets/spritesheet.json").data.animations;
        // create an animated sprite
        const character = PIXI.AnimatedSprite.fromFrames(animations[animation]);
        // configure + start animation:
        character.animationSpeed = 1 / 6;                     // 6 fps
        character.play();
    
        // add it to the stage and render!
        app.stage.addChild(character);
        character.setTransform(200,300,2,2);
    }
    function clearAnimations(){
        const character = app.stage.getChildAt(0);
        character.stop();
        character.destroy();
        app.stage.removeChild(character);
    }
    function jump(){
                // get the sheet json data, required for resolving animations
                const animations = PIXI.Assets.cache.get("assets/spritesheet.json").data.animations;
                // create an animated sprite
                const character = PIXI.AnimatedSprite.fromFrames(animations["jump"]);
                // configure + start animation:
                character.animationSpeed = 1 / 6;                     // 6 fps
                character.play();
            
                // add it to the stage and render!
                app.stage.addChild(character);

                app.ticker.add(function(delta){
                    var i = 0;
                    character.setTransform(i ,300,2,2);
                    i = i+1000;
                });

                
    }
    drawAnimation("idle");
    jump();

});


