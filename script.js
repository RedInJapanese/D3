class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload(){
        this.load.image('monke5', './assets/m4.jpg');
    }
    create() {
        this.add.text(10, 400, "Yay! You beat the game!").setFontSize(30);
        this.add.text(600, 500, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('Logo'));
        let sprite = this.add.image(910,-10,'monke5')
        sprite.setScale(.3)

        this.tweens.add({
            targets: sprite,
            y: 700,
            duration: 500,
            repeat: 0
        });
    }
}


class Scene6 extends Phaser.Scene {
    constructor() {
        super('Scene6');
    }
    preload(){
        this.load.image('monke3', './assets/m3.png');
    }
    create(){
        this.add.text(10, 400, "Congratulations! You finished the third level! Here's another monkey!").setFontSize(30);
        this.add.text(600, 500, "Click to continue").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('outro'));
        let sprite = this.add.image(910,-10,'monke3')
        sprite.setScale(.3)

        this.tweens.add({
            targets: sprite,
            y: 700,
            duration: 500,
            repeat: 0
        });
    }
    update(){}
}

class Scene5 extends Phaser.Scene {
    constructor() {
        super('Scene5');
    }
    preload(){
        this.load.image('ball', './assets/Ball.png');
        this.load.image('tile', './assets/block.jpg');
        this.load.image('wall', './assets/grey.jpg');
    }
    create(){
        this.VELOCITY = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 3000;

        // set bg color
        this.cameras.main.setBackgroundColor('#FFFFFF');

        // print Scene name
        this.add.text(game.config.width/2, 300, 'pogo: use left and right arrow keys to move', { font: '40px Futura', fill: '#000000' }).setOrigin(0.5);

        // make ground tiles
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5, 'tile').setScale(2).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*7; i < game.config.width-5*4; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*5, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*2; i < game.config.width-5*13; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*9, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.ball = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'ball').setScale(0.1);
        this.ball.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounceY(1);
        this.wall = this.physics.add.sprite(1000, game.config.width/2-5, 'wall').setScale(0.1);
        this.physics.add.collider(this.ball, this.ground);
        this.physics.add.collider(this.wall, this.ground);
        this.input.keyboard.on('keydown', (event) => {
            if(event.key == 'f'){
                    this.scene.start('Scene2')
            }
        })
    }
    update(){
        if(this.ball.body.position.x >= this.wall.body.position.x){
            this.scene.start('Scene6')
        }
        let cursors = this.input.keyboard.createCursorKeys();
        if(cursors.left.isDown) {
            this.ball.body.setAccelerationX(-this.VELOCITY);
        } else if(cursors.right.isDown) {
            this.ball.body.setAccelerationX(this.VELOCITY);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.ball.body.setVelocityX(0);
        }
    }
}


class Scene4 extends Phaser.Scene {
    constructor() {
        super('Scene4');
    }
    preload(){
        this.load.image('monke2', './assets/m2.jpg');
    }
    create(){
        this.add.text(10, 400, "Congratulations! You finished the second level! Here's another monkey!").setFontSize(30);
        this.add.text(100, 300, "Click to continue").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('Scene5'));
        let sprite = this.add.image(910,-10,'monke2')
        sprite.setScale(.3)

        this.tweens.add({
            targets: sprite,
            y: 700,
            duration: 500,
            repeat: 0
        });
    }
    update(){}
}



class Scene3 extends Phaser.Scene {
    constructor() {
        super('Scene3');
    }
    preload(){
        this.load.image('ball', './assets/Ball.png');
        this.load.image('tile', './assets/block.jpg');
        this.load.image('wall', './assets/grey.jpg');

    }
    create(){
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 3000;

        // set bg color
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.add.text(game.config.width/2, 300, 'press up to jump', { font: '40px Futura', fill: '#000000' }).setOrigin(0.5);

        // draw grid lines for jump height reference
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5, 'tile').setScale(2).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*7; i < game.config.width-5*4; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*5, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*2; i < game.config.width-5*13; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*9, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.groundScroll = this.add.tileSprite(0, game.config.height-5, game.config.width, 5, 'tile').setOrigin(0);
        this.ball = this.physics.add.sprite(120, game.config.width/2-5, 'ball').setScale(0.1);
        this.wall = this.physics.add.sprite(1000, game.config.width/2-5, 'wall').setScale(0.1);

        this.physics.add.collider(this.ball, this.ground);
        this.physics.add.collider(this.wall, this.ground);
        this.input.keyboard.on('keydown', (event) => {
            if(event.key == 'f'){
                    this.scene.start('Scene2')
            }
        })

    }
    update(){
        this.wall.body.position.x-=10
        if(this.ball.body.position.x >= this.wall.body.position.x){
            this.scene.start('Scene4')
        }
        let cursors = this.input.keyboard.createCursorKeys();
        if(this.ball.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.ball.body.setVelocityY(this.JUMP_VELOCITY);
            this.ball.setFlip(true, false);        
        } 

    }
}


class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }
    preload(){
        this.load.image('monke', './assets/m1.jpg');
    }
    create(){
        this.add.text(10, 400, "Congratulations! You finished the first level! Here's a monkey!").setFontSize(30);
        this.add.text(600, 500, "Click to continue").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('Scene3'));
        let sprite = this.add.image(910,-10,'monke')
        sprite.setScale(.3)

        this.tweens.add({
            targets: sprite,
            y: 700,
            duration: 500,
            repeat: 0
        });
    }
    update(){}
}



class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }
    preload(){
        this.load.image('ball', './assets/Ball.png');
        this.load.image('tile', './assets/block.jpg');

    }
    create(){
        this.ACCELERATION = 400;
        this.MAX_X_VEL = 400;   
        this.MAX_Y_VEL = 5000;
        this.JUMP_VELOCITY = -1000;
        this.physics.world.gravity.y = 1000;

        // set bg color
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.add.text(game.config.width/2, 300, 'move left or right to go to next scene', { font: '40px Futura', fill: '#000000' }).setOrigin(0.5);

        // draw grid lines for jump height reference

        this.ball = this.physics.add.sprite(game.config.width/2, game.config.width/2, 'ball').setScale(0.1);
        this.ball.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*7; i < game.config.width-5*4; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*5, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*2; i < game.config.width-5*13; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*9, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for(let i = 5*9; i < game.config.width-5*33; i += 5) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 5*9, 'tile').setScale(10).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.physics.add.collider(this.ball, this.ground)

        this.input.keyboard.on('keydown', (event) => {
            if(event.key == 'f'){
                    this.scene.start('Scene2')
            }
        })

    }
    update(){
        console.log(this.ball.body.position.x)
        if(this.ball.body.position.x <= 0 || this.ball.body.position.x>=1200){
            this.scene.start('Scene2')
        }
        let cursors = this.input.keyboard.createCursorKeys();

        // check keyboard input
        if(cursors.left.isDown) {
            this.ball.body.setAccelerationX(-this.ACCELERATION);
            this.ball.setFlip(true, false);

        } else if(cursors.right.isDown) {
            this.ball.body.setAccelerationX(this.ACCELERATION);
            this.ball.setFlip(true, false);        
        }  else if(this.ball.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.ball.body.setVelocityY(this.JUMP_VELOCITY);
            this.ball.setFlip(true, false);        
        } 
        else {
            this.ball.body.setAccelerationX(0);
            this.ball.body.setDragX(this.DRAG);        
        }
        this.physics.world.wrap(this.ball, this.ball.width/2);
    }
}


class Logo extends Phaser.Scene {
    constructor() {
        super('Logo');
    }
    preload(){
        this.load.image('thing', './assets/logo.png');
        this.load.image('log', './assets/ltext.png');
    }
    create(){
        this.add.image(600,500,'thing')
        this.add.image(600,680,'log')

        this.graphics = this.add.graphics();

        this.textObject = this.add.text(
            510, //x
            730,//y
            "Games", //text
            {
                font: "40px Arial",
                color: "#ffffff",
            } //style
        );
        this.textObject = this.add.text(
            500, //x
            780,//y
            "Presents", //text
            {
                font: "40px Arial",
                color: "#ffffff",
            } //style
        );
        this.cameras.main.fadeIn(6000);
        this.time.addEvent({
            delay: 3000, 
            loop:false,
            callback: () => {
                this.scene.start("Scene1")
            }
        })
    }
    update(){

    }
}



let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Logo,
        Scene1,
        Scene2,
        Scene3,
        Scene4,
        Scene5,
        Scene6,
        Outro
    ]
}

let game = new Phaser.Game(config)



