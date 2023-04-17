export default class SlotSymbol extends Phaser.GameObjects.Sprite{
    constructor(scene, options){
        super(scene, options.x, options.y, options.key)

        scene.add.existing(this)

        if(!options.symbolValue)
        {
            options.symbolValue = 0
        }
        this.symbolValue = options.symbolValue
    }
}