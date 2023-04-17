import gameScene from './SlotGame/scenes/gameScene'
import preloadScene from './SlotGame/scenes/preloadScene'

export default {
    type: Phaser.WEBGL,
    backgroundColor: '#000000',
    parent: 'gameWrapper',
    width: 800,
    height: 600,
    render: {
        powerPreference: 'high-performance',
        mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    },
    scale: {
        mode: Phaser.Scale.NONE,
    },
    scene: [preloadScene, gameScene],
}