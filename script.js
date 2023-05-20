class Scene5 extends Phaser.Scene {
    constructor() {
        super('Scene5');
    }
    preload(){
    }
    create(){
    }
    update(){}
}


class Scene4 extends Phaser.Scene {
    constructor() {
        super('Scene4');
    }
    preload(){
    }
    create(){
    }
    update(){}
}



class Scene3 extends Phaser.Scene {
    constructor() {
        super('Scene3');
    }
    preload(){
    }
    create(){
    }
    update(){}
}


class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }
    preload(){
    }
    create(){
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
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1000;
        this.physics.world.gravity.y = 3000;

        // set bg color
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.add.text(game.config.width/2, 300, 'Press f to switch scenes', { font: '40px Futura', fill: '#000000' }).setOrigin(0.5);

        // draw grid lines for jump height reference

        this.ball = this.physics.add.sprite(game.config.width/2, game.config.width/2, 'ball').setScale(0.1);

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
        this.ball.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounceY(1);

        this.input.keyboard.on('keydown', (event) => {
            if(event.key == 'f'){
                    this.scene.start('Scene2')
            }
        })

    }
    update(){
        let cursors = this.input.keyboard.createCursorKeys();

        // check keyboard input
        if(cursors.left.isDown) {
            this.ball.body.setAccelerationX(-this.ACCELERATION);
            this.ball.setFlip(true, false);

        } else if(cursors.right.isDown) {
            this.ball.body.setAccelerationX(this.ACCELERATION);
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
        Scene1
    ]
}

let game = new Phaser.Game(config)



