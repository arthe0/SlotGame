export default class Button extends Phaser.GameObjects.Sprite {
    constructor(config) {

        if (!config.scene) {
            console.log('missing scene');
            return;
        }

        if (!config.key) {
            console.log("missing key!");
            return;
        }

        if (!config.up) {
            config.up = 0;
        }

        if (!config.down) {
            config.down = config.up;
        }

        if (!config.over) {
            config.over = config.up;
        }

        super(config.scene, 0, 0, config.key, config.up);

        this.config = config;
        this.BindAction = config.BindAction
       
        if (config.x) {
            this.x = config.x;
        }

        if (config.y) {
            this.y = config.y;
        }

        config.scene.add.existing(this);

        this.setInteractive();
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onDown, this);
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,this.onUp,this);
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,this.onOver,this);
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,this.onUp,this);
    }
    onDown()
    {
    	this.setFrame(this.config.down)
        this.config.BindAction()
    }
    onOver()
    {
    	this.setFrame(this.config.over);
    }
    onUp()
    {
    	this.setFrame(this.config.up);
    }
}