// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, radius, direction, arc) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = Math.floor(Math.random() * 2) + 1;
        this.arc = arc;
        this.radius = radius;
        this.direction = direction;
    }

    update() {
        // move spaceship left
        //this.x -= this.moveSpeed;
        this.x = Math.cos(Math.PI * 2 * this.arc / 360) * this.radius + game.config.width/2 - borderUISize;
        this.y = Math.sin(Math.PI * 2 * this.arc / 360) * this.radius/2 - 20;
        this.arc += this.moveSpeed * this.direction;
        this.angle = this.arc;

        //wrap around from left edge to right edge
        if(this.arc > 360) {
            this.arc -= 360;
        }
        if(this.arc < 0) {
            this.arc += 360;
        }
        if(this.arc < 270 + this.moveSpeed/2 && this.arc > 270 - this.moveSpeed/2){
            this.moveSpeed = Math.floor(Math.random() * 2) + 1;
            if (Math.floor(Math.random() * 2) == 1) {
                this.direction *= -1
            }
        }
    }

    //position reset
    reset() {
        this.x = game.config.width / 2;
        this.y = game.config.height;
    }
}