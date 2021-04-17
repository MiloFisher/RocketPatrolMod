class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL: ARCHERY MOD', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.backgroundColor = '#B72426';
        this.add.text(game.config.width / 2, game.config.height / 2, 'Player 1: Use A & D to move & W to fire    ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#344CA0';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Player 2: Use ←→ arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#9b8e59';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding) * 2, 'Press ← for Short Game or → for Long Game', menuConfig).setOrigin(0.5);
   
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // short mode
            game.settings = {
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // long mode
            game.settings = {
                gameTimer: 120000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}