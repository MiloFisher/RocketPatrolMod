// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, radius, direction, arc) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = Math.floor(Math.random() * 3) * .5 + 1;
        this.points = this.getPoints(this.moveSpeed);
        this.arc = arc;
        this.radius = radius;
        this.direction = direction;
    }

    update() {
        this.angle = this.arc;
        this.arc += this.moveSpeed * this.direction;
 
        //wrap around from left edge to right edge
        if(this.arc > 360) {
            this.arc -= 360;
        }
        if(this.arc < 0) {
            this.arc += 360;
        }
        if(this.arc < 270 + this.moveSpeed/2 && this.arc > 270 - this.moveSpeed/2){
            this.moveSpeed = Math.floor(Math.random() * 3) * .5 + 1;
            this.points = this.getPoints(this.moveSpeed);
            if (Math.floor(Math.random() * 2) == 1) {
                this.direction *= -1
            }
        }
    }

    //position reset
    reset() {
        //this.x = game.config.width / 2;
        //this.y = game.config.height;
    }

    getPoints(points) {
        if(points == 1) {
            return 100;
        } else if(points == 1.5) {
            return 200;
        } else if (points == 2) {
            return 500;
        }
        return 0;
    }
}