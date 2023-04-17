import SlotContainer from '../objects/slotContainer.js'

let slots = []

export default class SlotMachine extends Phaser.GameObjects.Container{
    
    isSpinning = false
    isStopRequested = false
    isAbleToStop = false

    slotsNum = 5

    constructor(scene, x, y){
        super(scene, x, y)

        for(let i = 0; i < this.slotsNum-1; i++){
            slots.push(new SlotContainer(scene, x + 147*i, y ));
        }
        slots.push(new SlotContainer(scene, x + 147*(this.slotsNum-1), y, this.onLastContainerStoped, this));
        
    }

    startMachine(){
        if(this.isSpinning) return

        this.isAbleToStop = false
        this.isSpinning = true
        this.slotCounter = 0

        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                if(!slots[this.slotCounter]) return
                slots[this.slotCounter].startSpinning()
                this.slotCounter++
            },
            callbackScope: this,
            repeat: this.slotsNum-1,            
        })

        this.scene.time.addEvent({
            delay: 100 * this.slotsNum,
            callback: ()=>{this.isAbleToStop = true},
            callbackScope: this
        })
    }

    stopMachine(){
        if(!this.isSpinning || this.isStopRequested || !this.isAbleToStop) return
        this.isStopRequested = true

        this.slotCounter = 0
        
        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                slots[this.slotCounter].stopSpinning()
                this.slotCounter++
            },
            callbackScope: this,
            repeat: this.slotsNum-1
        })
    }

    onLastContainerStoped(context){
        context.isSpinning = false
        context.isStopRequested = false
    }
}