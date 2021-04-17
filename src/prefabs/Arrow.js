// arrow prefab
class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 10;
        this.player = player;
        this.sfxRocket = scene.sound.add('sfx_arrow_shot'); // add arrow sfx
    }

    update() {
        if (this.player.player == 1) {
            // fire button
            if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx
            }
        } else {
            // fire button
            if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx
            }
        }

        // move with player cart
        if (!this.isFiring) {
            this.x = this.player.x;
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUISize) {
            this.isFiring = false;
            this.y = spawnHeight;
            this.x = this.player.x;
        }
    }

    // reset arrow to "ground"
    reset() {
        this.isFiring = false;
        this.x = this.player.x;
        this.y = spawnHeight;
    }
}