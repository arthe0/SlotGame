import SlotContainer from '../objects/slotContainer.js'

export default class SlotMachine extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y),
            (this.isSpinning = false),
            (this.isStopRequested = false),
            (this.isAbleToStop = false),
            (this.slotsNum = 5),
            (this.slots = [])

        for (let i = 0; i < this.slotsNum - 1; i++) {
            this.slots.push(new SlotContainer(scene, x + 147 * i, y))
        }
        this.slots.push(
            new SlotContainer(
                scene,
                x + 147 * (this.slotsNum - 1),
                y,
                this.onLastContainerStoped,
                this.onLastContainerStarted,
                this,
            ),
        )
    }

    startMachine() {
        if (this.isSpinning) return

        this.isAbleToStop = false
        this.isSpinning = true
        this.slotCounter = 0

        this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                if (!this.slots[this.slotCounter]) return
                this.slots[this.slotCounter].startSpinning()
                this.slotCounter++
            },
            callbackScope: this,
            repeat: this.slotsNum - 1,
        })
    }

    stopMachine() {
        if (!this.isSpinning || this.isStopRequested || !this.isAbleToStop) return
        this.isStopRequested = true

        this.slotCounter = 0

        this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.slots[this.slotCounter].stopSpinning()
                this.slotCounter++
            },
            callbackScope: this,
            repeat: this.slotsNum - 1,
        })
    }

    onLastContainerStarted(context) {
        context.isAbleToStop = true
    }

    onLastContainerStoped(context) {
        context.isSpinning = false
        context.isStopRequested = false
    }
}
