export default class Player {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };

        this.playerIdleRight = this.createImageArray([
            '/sprites/characters/player/playerIdleRight-1.png.png',
            '/sprites/characters/player/playerIdleRight-2.png.png',
            '/sprites/characters/player/playerIdleRight-3.png.png',
            '/sprites/characters/player/playerIdleRight-4.png.png',
            '/sprites/characters/player/playerIdleRight-5.png.png',
            '/sprites/characters/player/playerIdleRight-6.png.png',
        ]);
        this.playerIdleLeft = this.createImageArray([
            '/sprites/characters/player/playerIdleLeft-1.png.png',
            '/sprites/characters/player/playerIdleLeft-2.png.png',
            '/sprites/characters/player/playerIdleLeft-3.png.png',
            '/sprites/characters/player/playerIdleLeft-4.png.png',
            '/sprites/characters/player/playerIdleLeft-5.png.png',
            '/sprites/characters/player/playerIdleLeft-6.png.png',
        ]);
        this.playerIdleBack = this.createImageArray([
            '/sprites/characters/player/playerIdleUp-1.png.png',
            '/sprites/characters/player/playerIdleUp-2.png.png',
            '/sprites/characters/player/playerIdleUp-3.png.png',
            '/sprites/characters/player/playerIdleUp-4.png.png',
            '/sprites/characters/player/playerIdleUp-5.png.png',
            '/sprites/characters/player/playerIdleUp-6.png.png',
        ]);
        this.playerIdleFront = this.createImageArray([
            '/sprites/characters/player/playerIdleDown-1.png.png',
            '/sprites/characters/player/playerIdleDown-2.png.png',
            '/sprites/characters/player/playerIdleDown-3.png.png',
            '/sprites/characters/player/playerIdleDown-4.png.png',
            '/sprites/characters/player/playerIdleDown-5.png.png',
            '/sprites/characters/player/playerIdleDown-6.png.png',
        ]);
        this.playerMovingRight = this.createImageArray([
            '/sprites/characters/player/playerMovingRight-1.png.png',
            '/sprites/characters/player/playerMovingRight-2.png.png',
            '/sprites/characters/player/playerMovingRight-3.png.png',
            '/sprites/characters/player/playerMovingRight-4.png.png',
            '/sprites/characters/player/playerMovingRight-5.png.png',
            '/sprites/characters/player/playerMovingRight-6.png.png',
        ]);
        this.playerMovingLeft = this.createImageArray([
            '/sprites/characters/player/playerMovingLeft-1.png.png',
            '/sprites/characters/player/playerMovingLeft-2.png.png',
            '/sprites/characters/player/playerMovingLeft-3.png.png',
            '/sprites/characters/player/playerMovingLeft-4.png.png',
            '/sprites/characters/player/playerMovingLeft-5.png.png',
            '/sprites/characters/player/playerMovingLeft-6.png.png',
        ]);
        this.playerMovingBack = this.createImageArray([
            '/sprites/characters/player/playerMovingUp-1.png.png',
            '/sprites/characters/player/playerMovingUp-2.png.png',
            '/sprites/characters/player/playerMovingUp-3.png.png',
            '/sprites/characters/player/playerMovingUp-4.png.png',
            '/sprites/characters/player/playerMovingUp-5.png.png',
            '/sprites/characters/player/playerMovingUp-6.png.png',
        ]);
        this.playerMovingFront = this.createImageArray([
            '/sprites/characters/player/playerMovingDown-1.png.png',
            '/sprites/characters/player/playerMovingDown-2.png.png',
            '/sprites/characters/player/playerMovingDown-3.png.png',
            '/sprites/characters/player/playerMovingDown-4.png.png',
            '/sprites/characters/player/playerMovingDown-5.png.png',
            '/sprites/characters/player/playerMovingDown-6.png.png',
        ]);
        this.spriteArray = this.playerIdleFront;
    }

    // Create an array of Image objects from the given URLs
    createImageArray(urls) {
        return urls.map(url => {
            const image = new Image();
            image.src = url;
            return image;
        });
    }
}
