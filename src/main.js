let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT, keyW, keyA, keyD;
let originX = game.config.width / 2;
let originY = -60;
let spawnHeight = game.config.height - 66 - borderUISize - borderPadding;

// SCORING
// I went for the S(hrek) tier
// (30) I have a simultaneous two-player mode
// (60) I redesign the game's artwork, ui, and sounds (I made all the art, and for the sound, credit to freesound.org and I found sounds under the creative commons license))
// (??) I completely replaced the ship mechanic with randomized swing targets
// (??) I set point values based on the randomized speeds of said targets
// (??) I created an animation for showing the point values when hitting a target