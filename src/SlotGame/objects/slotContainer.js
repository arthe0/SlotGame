import GameParams from '../gameParams'
import SlotSymbol from './symbol.js'

export default class SlotContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, endCallback, startSpinningCallback, callbackContext) {
        super(scene, x, y),
            scene.add.existing(this),
            (this.symbols = []),
            (this.endCallback = endCallback),
            (this.startSpinningCallback = startSpinningCallback),
            (this.callbackContext = callbackContext),
            (this.isStopRequested = false),
            (this.isSpinning = false)

        this.init()
    }

    init() {
        for (let i = 0; i < 5; i++) {
            this.rnd = Phaser.Math.Between(0, GameParams.symbolsNum - 1)
            this.symbols[i] = new SlotSymbol(this.scene, {
                x: 0,
                y: i * GameParams.symbolHeight,
                key: 'symbol' + this.rnd,
                symbolValue: this.rnd,
            })
        }

        this.add(this.symbols)
    }

    startSpinning() {
        if (this.isSpinning) return

        this.isSpinning = true
        this.rollTween = this.scene.tweens.add({
            targets: this,
            duration: GameParams.spinInOutDuration,
            y: this.y + GameParams.symbolHeight,
            ease: Phaser.Math.Easing.Quadratic.In,
            repeat: 0,
            onRepeat: () => {
                this.moveSymbols(false)
            },
            onComplete: () => {
                this.moveSymbols(false)
                if (this.startSpinningCallback) {
                    this.startSpinningCallback(this.callbackContext)
                }
                this.spinning()
            },
        })
    }

    spinning() {
        for (let i = 0; i < 4; i++) {
            this.getAt(i).setTexture('symbolBlurred' + this.getAt(i).symbolValue)
        }

        this.spinTween = this.scene.tweens.add({
            targets: this,
            props: {
                y: {
                    value: '+=' + GameParams.symbolHeight,
                    duration: GameParams.spinDuration,
                },
            },
            repeat: GameParams.spinRepeats,
            onRepeat: () => {
                this.moveSymbols(true)
                this.spinTween.updateTo('y', this.y + GameParams.symbolHeight, true)
                if (this.isStopRequested) {
                    this.spinTween.complete()
                }
            },
            onComplete: () => {
                if (!this.isStopRequested) {
                    this.moveSymbols(true)
                    this.spinTween.updateTo('y', this.y + GameParams.symbolHeight, true)
                }

                this.endSpinning()
            },
        })
    }

    endSpinning() {
        for (let i = 0; i < 5; i++) {
            this.getAt(i).setTexture('symbol' + this.getAt(i).symbolValue)
        }

        this.rollTween = this.scene.tweens.add({
            targets: this,
            duration: GameParams.spinInOutDuration,
            y: this.y + GameParams.symbolHeight,
            ease: Phaser.Math.Easing.Quadratic.Out,
            repeat: 0,
            yoyo: true,
            onRepeat: () => {
                this.moveSymbols(false)
            },
            onComplete: () => {
                if (this.endCallback) {
                    this.endCallback(this.callbackContext)
                }

                this.isSpinning = false
                this.isStopRequested = false
            },
        })
    }

    stopSpinning() {
        this.isStopRequested = true
    }

    moveSymbols(isBlurred) {
        let symbol = this.last
        symbol.y = this.first.y - GameParams.symbolHeight
        this.moveTo(symbol, 0)

        const rndNum = Phaser.Math.Between(0, GameParams.symbolsNum - 1)

        if (isBlurred) {
            symbol.setTexture('symbolBlurred' + rndNum)
        } else {
            symbol.setTexture('symbol' + rndNum)
        }
        symbol.symbolValue = rndNum
    }
}
