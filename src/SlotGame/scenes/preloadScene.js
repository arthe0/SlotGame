import GameConfig from '../../config.js'
import gameParams from '../gameParams.js';

export default class preloadScene extends Phaser.Scene {
    constructor() {
        super('preloadScene');
    }

    preload(){
        //Making proress bar
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(GameConfig.width / 2 - 460, GameConfig.height / 2 - 90, 900, 50);

        this.loadingText = this.make.text({
            x: GameConfig.width / 2,
            y: GameConfig.height / 2 - 5,
            text: '0%',
            style: {
                font: '30px PT Serif',
                fill: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xff00ff, 1);
            this.progressBar.fillRect(GameConfig.width / 2 - 450, GameConfig.height / 2 - 80, 880 * value, 30);
            this.loadingText.setText(parseInt(value * 100) + '%');
        });

        //Loading resources
        for(let i = 0; i < gameParams.symbolsNum; i++){
            this.load.image('symbol'+ i, 'assets/symbols/'+ (i+1) + '.png')
            this.load.image('symbolBlurred'+ i, 'assets/symbols_blur/'+ (i+1) + '.png')
        }

        this.load.image("background", "assets/machine/bg.png")
        this.load.image("machine", "assets/machine/machine.png")

        this.load.spritesheet('playButton', 'assets/interface/playSprite.png', {frameWidth: 128, frameHeight: 128})
        this.load.spritesheet('stopButton', 'assets/interface/stopSprite.png', {frameWidth: 128, frameHeight: 128})
    }

    create(){
        this.scene.start('gameScene')
    }

    onComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
    }
}