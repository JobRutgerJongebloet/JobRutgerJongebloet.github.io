export default class Shop {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        
        this.spriteArray = this.createImageArray([
            '/sprites/objects/buildings/shop_anim-1.png.png',
            '/sprites/objects/buildings/shop_anim-2.png.png',
            '/sprites/objects/buildings/shop_anim-3.png.png',
            '/sprites/objects/buildings/shop_anim-4.png.png',
            '/sprites/objects/buildings/shop_anim-5.png.png',
            '/sprites/objects/buildings/shop_anim-6.png.png'
        ]);
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