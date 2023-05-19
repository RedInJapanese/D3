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
    }
    create(){
    }
    update(){}
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
    scene: [
        Logo
    ]
}

let game = new Phaser.Game(config)



