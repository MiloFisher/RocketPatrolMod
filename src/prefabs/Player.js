// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);
  
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 40;
        this.player = player;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if (this.player == 1) {
            // left/right movement
            if (!this.isFiring) {
                if (keyA.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
        } else {
            // left/right movement
            if (!this.isFiring) {
                if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
        }
    }
}