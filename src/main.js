import Phaser from 'phaser'
import GameConfig from './config'

function startGame() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    GameConfig.audio = {context: audioContext}
    new Phaser.Game(GameConfig)
}

window.startGame = startGame
