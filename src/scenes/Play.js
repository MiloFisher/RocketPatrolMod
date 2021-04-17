class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        this.load.image('player1', './assets/player1.png');
        this.load.image('player2', './assets/player2.png');
        this.load.image('target1', './assets/hanging_target1.png');
        this.load.image('target2', './assets/hanging_target2.png');
        this.load.image('target3', './assets/hanging_target3.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('background1', './assets/background1.png');
        this.load.image('background2', './assets/background2.png');
        this.load.image('border', './assets/border.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('points100', './assets/points100.png', { frameWidth: 45, frameHeight: 70, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('points200', './assets/points200.png', { frameWidth: 45, frameHeight: 70, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('points500', './assets/points500.png', { frameWidth: 45, frameHeight: 70, startFrame: 0, endFrame: 9 });
    }

    create() {
        // place tile sprite
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);
       
        // add players
        this.player1 = new Player(this, game.config.width / 2 + 5, spawnHeight, 'player1', 0, 1).setOrigin(0.5, 0);
        this.arrow1 = new Arrow(this, this.player1.x, spawnHeight, 'arrow', 0, this.player1).setOrigin(0.5, 0);
        this.player2 = new Player(this, game.config.width / 2 - 5, spawnHeight, 'player2', 0, 2).setOrigin(0.5, 0);
        this.arrow2 = new Arrow(this, this.player2.x, spawnHeight, 'arrow', 0, this.player2).setOrigin(0.5, 0);
        // add targets
        this.target1 = new Target(this, originX, originY, 'target1', 0, 300, 1, 0).setOrigin(0, 0);
        this.target2 = new Target(this, originX, originY, 'target2', 0, 275, -1, 180).setOrigin(0, 0);
        this.target3 = new Target(this, originX, originY, 'target3', 0, 250, 1, 90).setOrigin(0, 0);

        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'points100',
            frames: this.anims.generateFrameNumbers('points100', { start: 0, end: 9, first: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'points200',
            frames: this.anims.generateFrameNumbers('points200', { start: 0, end: 9, first: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'points500',
            frames: this.anims.generateFrameNumbers('points500', { start: 0, end: 9, first: 0 }),
            frameRate: 10
        });
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig1 = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#B72426',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 60
        }
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#344CA0',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 60
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding + 5, borderUISize + borderPadding*2, this.p1Score, scoreConfig1);
        this.scoreRight = this.add.text(game.config.width - (borderUISize + borderPadding) - 64, borderUISize + borderPadding * 2, this.p2Score, scoreConfig2);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig1.fixedWidth = 0;
        scoreConfig2.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig1).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig1).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver) {
            this.background2.tilePositionX += 1;
            this.player1.update();
            this.player2.update();
            this.arrow1.update();
            this.arrow2.update();
            this.target1.update();               
            this.target2.update();
            this.target3.update();
        }
        // check collisions
        if(this.checkCollision(this.arrow1, this.target3)) {
            this.arrow1.reset();
            //this.shipExplode(this.target3);
            this.targetHit(this.target3,this.arrow1);
        }
        if (this.checkCollision(this.arrow1, this.target2)) {
            this.arrow1.reset();
            //this.shipExplode(this.target2);
            this.targetHit(this.target2, this.arrow1);
        }
        if (this.checkCollision(this.arrow1, this.target1)) {
            this.arrow1.reset();
            //this.shipExplode(this.target1);
            this.targetHit(this.target1, this.arrow1);
        }
        if (this.checkCollision(this.arrow2, this.target3)) {
            this.arrow2.reset();
            //this.shipExplode(this.target3);
            this.targetHit(this.target3, this.arrow2);
        }
        if (this.checkCollision(this.arrow2, this.target2)) {
            this.arrow2.reset();
            //this.shipExplode(this.target2);
            this.targetHit(this.target2, this.arrow2);
        }
        if (this.checkCollision(this.arrow2, this.target1)) {
            this.arrow2.reset();
            //this.shipExplode(this.target1);
            this.targetHit(this.target1, this.arrow2);
        }
    }

    checkCollision(arrow, target) {
        //simple AABB checking
        var X = Math.cos(Math.PI * 2 * (target.arc + 90) / 360) * target.radius + originX;
        var Y = Math.sin(Math.PI * 2 * (target.arc + 90) / 360) * target.radius + originY - 64;
        if (arrow.x < X + 64 && 
            arrow.x + arrow.width > X && 
            arrow.y < Y + 64 &&
            arrow.height + arrow.y > Y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion'); 
    }

    targetHit(target,arrow) {
        var X = Math.cos(Math.PI * 2 * (target.arc + 90) / 360) * target.radius + originX;
        var Y = Math.sin(Math.PI * 2 * (target.arc + 90) / 360) * target.radius + originY;
        
        var p = 'points100';
        if(target.points == 200) {
            p = 'points200';
        }else if(target.points == 500) {
            p = 'points500';
        }    

        let points = this.add.sprite(X, Y - 64* 2, p).setOrigin(0, 0);
        points.anims.play(p);             // play explode animation
        points.on('animationcomplete', () => {    // callback after anim completes                     // make ship visible again
            points.destroy();                       // remove explosion sprite
        });
        if(arrow.player.player == 1) {
            this.p1Score += target.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        } else if (arrow.player.player == 2) {
            this.p2Score += target.points;
            this.scoreRight.text = this.p2Score;
            this.sound.play('sfx_explosion');
        }
    }
}