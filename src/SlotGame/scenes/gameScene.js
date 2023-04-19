import GameConfig from '../../config.js'
import Button from '../objects/button.js'
import SlotMachine from '../objects/slotMachine.js'

//Очень не хотел выносить переменные в глобальную видимость, но почему-то не могу обратиться к ним из
//методов класса, когда объявляю их в конструкторе или перед ним
let slotMachine

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background')
        this.background.setOrigin(0, 0)

        slotMachine = new SlotMachine(this, 105, 35)

        this.slotMachineImage = this.add.image(0, 0, 'machine')
        this.slotMachineImage.setOrigin(0, 0)

        this.testButton = new Button({
            BindAction: this.onStartClick,
            scene: this,
            up: 0,
            down: 1,
            over: 0,
            x: GameConfig.width - GameConfig.width / 6,
            y: GameConfig.height - GameConfig.height / 12,
            key: 'playButton',
        }).setScale(0.5)

        this.testButton = new Button({
            BindAction: this.onStopClick,
            scene: this,
            up: 0,
            down: 1,
            over: 0,
            x: GameConfig.width / 6,
            y: GameConfig.height - GameConfig.height / 12,
            key: 'stopButton',
        }).setScale(0.5)
    }

    onStartClick() {
        slotMachine.startMachine()
    }

    onStopClick() {
        slotMachine.stopMachine()
    }
}
