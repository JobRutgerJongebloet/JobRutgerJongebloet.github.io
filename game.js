import Player from './models/player.js';
import Shop from './models/shop.js';

//const peerConnection = new RTCPeerConnection();
// let udpDataChannel = peerConnection.createDataChannel("udpChannel", { ordered: false });
// let tcpDataChannel = peerConnection.createDataChannel("tcpChannel");

const localPlayer = new Player();
const partnerPlayer = new Player();
const shop = new Shop();

var width = window.innerWidth;
var height = window.innerHeight;

// let createOffer = () => {
//     peerConnection.onicecandidate = e => {if (e.candidate === null) document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)};
//     udpDataChannel.onmessage = e => {
//         let udpDataReceived = JSON.parse(e.data);
//         partnerPlayer.position = udpDataReceived.position;
//         switch (udpDataReceived.key) {
//             case 'w':
//                 partnerPlayer.spriteArray = partnerPlayer.playerMovingBack;
//                 break;
//             case 's':
//                 partnerPlayer.spriteArray = partnerPlayer.playerMovingFront;
//                 break;
//             case 'a':
//                 partnerPlayer.spriteArray = partnerPlayer.playerMovingLeft;
//                 break;
//             case 'd':
//                 partnerPlayer.spriteArray = partnerPlayer.playerMovingRight;
//                 break;
//         }
//     };
//     udpDataChannel.onopen = e => {
//         alert("UDP data channel opened!");
//         document.addEventListener('keydown', d); document.addEventListener('keyup', u);
//         mainAnimation();
//     };

//     tcpDataChannel.onmessage = e => {
//         let tcpDataReceived = JSON.parse(e.data);
//         if (tcpDataReceived.keyIsDown) {
//             if (partnerPlayer.spriteArray === partnerPlayer.playerMovingBack) partnerPlayer.spriteArray = partnerPlayer.playerIdleBack;
//             else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingFront) partnerPlayer.spriteArray = partnerPlayer.playerIdleFront;
//             else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingRight) partnerPlayer.spriteArray = partnerPlayer.playerIdleRight;
//             else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingLeft) partnerPlayer.spriteArray = partnerPlayer.playerIdleLeft;
//         }
//     }
//     peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
// }

// let createAnswer = () => {
//     let offer = JSON.parse(document.getElementById('offer-sdp').value);
//     peerConnection.onicecandidate = e => {if (e.candidate === null) {document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)}};
//     peerConnection.ondatachannel = e => {
//         if (e.channel.label === "udpChannel") {
//             udpDataChannel = e.channel;
//             udpDataChannel.onmessage = e => {
//                 let udpDataReceived = JSON.parse(e.data);
//                 partnerPlayer.position = udpDataReceived.position;
//                 switch (udpDataReceived.key) {
//                     case 'w':
//                         partnerPlayer.spriteArray = partnerPlayer.playerMovingBack;
//                         break;
//                     case 's':
//                         partnerPlayer.spriteArray = partnerPlayer.playerMovingFront;
//                         break;
//                     case 'a':
//                         partnerPlayer.spriteArray = partnerPlayer.playerMovingLeft;
//                         break;
//                     case 'd':
//                         partnerPlayer.spriteArray = partnerPlayer.playerMovingRight;
//                         break;
//                 }
//             };
//             udpDataChannel.onopen = e => {
//                 alert("UDP data channel opened!");
//                 document.addEventListener('keydown', d); document.addEventListener('keyup', u);
//                 mainAnimation();
//             };
//         } else if (e.channel.label === "tcpChannel") {
//             tcpDataChannel = e.channel;
//             tcpDataChannel.onmessage = e => {
//                 let tcpDataReceived = JSON.parse(e.data);
//                 if (tcpDataReceived.keyIsDown) {
//                     if (partnerPlayer.spriteArray === partnerPlayer.playerMovingBack) partnerPlayer.spriteArray = partnerPlayer.playerIdleBack;
//                     else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingFront) partnerPlayer.spriteArray = partnerPlayer.playerIdleFront;
//                     else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingRight) partnerPlayer.spriteArray = partnerPlayer.playerIdleRight;
//                     else if (partnerPlayer.spriteArray === partnerPlayer.playerMovingLeft) partnerPlayer.spriteArray = partnerPlayer.playerIdleLeft;
//                 }
//             }
//         }
//     };
//     peerConnection.setRemoteDescription(offer);
//     peerConnection.createAnswer().then(answer => peerConnection.setLocalDescription(answer));
// }

// let addAnswer = async () => {
//     let answer = JSON.parse(document.getElementById('answer-sdp').value);
//     if (!peerConnection.currentRemoteDescription) { peerConnection.setRemoteDescription(answer); }
// }

// document.getElementById('create-offer').addEventListener('click', createOffer);
// document.getElementById('create-answer').addEventListener('click', createAnswer);
// document.getElementById('add-answer').addEventListener('click', addAnswer);
var inventoryOpen = false;

let keys = [];
const d = (e) => { playAudio(); !keys.includes(e.key) && keys.push(e.key); }
const u = (e) => {

    if (e.key === 'Enter' || e.key === ' ') {
        if (localPlayer.position.x > shop.position.x + (shop.spriteArray[0].width * 1.8) - (localPlayer.spriteArray[0].width * 2) || localPlayer.position.x > shop.position.x) {
            inventoryOpen = true;
            const audioPageTurn = new Audio('/music/mixkit-page-turn-chime-1106.wav');
            audioPageTurn.volume = 0.1;
            audioPageTurn.play();
            messageBox = "";
            clearInterval(displayInterval);
        }
    }
    const i = keys.indexOf(e.key); i !== -1 && keys.splice(i, 1)
    //tcpDataChannel.send(JSON.stringify({ keyIsDown: true }));
};

var maxY = height - 20;
var maxX = width - 10;
var minX = 10;
var minY = (height - localPlayer.spriteArray[0].height * 4.45);
var speed = 2;

var displayOnce = true;
var displayOnce2 = true;
var displayInterval;
var messageBox = '';

const createInterval = (message) => {
    var i = 0;
    clearInterval(displayInterval);
    displayInterval = setInterval(() => {
        messageBox = message.slice(0, i + 1);
        i++;
        const textSound = new Audio('/music/Retro_Single_v1_wav.wav');
        textSound.volume = 0.05;
        if (messageBox[messageBox.length - 1] === " ") {
        } else {
            textSound.play();
        }
        if (i >= message.length) {
            clearInterval(displayInterval);
        }
    }, 100);
};

const keyPress = () => {
    if (keys.length > 0) {
        if (localPlayer.position.x > 80 && displayOnce) {
            createInterval("Praat  met  de  trol")
            displayOnce = false;
        }
        if (localPlayer.position.x > shop.position.x + (shop.spriteArray[0].width * 1.8) - (localPlayer.spriteArray[0].width * 2) || localPlayer.position.x > shop.position.x && displayOnce2) {
            createInterval("Druk   op     ENTER     om    te   praten");
            displayOnce2 = false;
        }
        switch (keys[0]) {
            case 'w':
                if (localPlayer.position.y > minY) {
                    localPlayer.spriteArray = localPlayer.playerMovingBack;
                    localPlayer.position.y -= speed;
                } else {
                    localPlayer.spriteArray = localPlayer.playerIdleBack;
                }
                break;
            case 's':
                if (localPlayer.position.y < maxY) {
                    localPlayer.spriteArray = localPlayer.playerMovingFront;
                    localPlayer.position.y += speed;
                }
                break;
            case 'a':
                if (localPlayer.position.x > minX) {
                    localPlayer.spriteArray = localPlayer.playerMovingLeft;
                    localPlayer.position.x -= speed;
                }
                break;
            case 'd':
                if (localPlayer.position.x < maxX) {
                    localPlayer.spriteArray = localPlayer.playerMovingRight;
                    localPlayer.position.x += speed;
                } 
                break;
            case 'i':
                inventoryOpen = false;
                break;
        }
        //udpDataChannel.send(JSON.stringify({ position: localPlayer.position, key: k[0] }));
    }
    else {
        if (localPlayer.spriteArray === localPlayer.playerMovingBack) localPlayer.spriteArray = localPlayer.playerIdleBack;
        else if (localPlayer.spriteArray === localPlayer.playerMovingFront) localPlayer.spriteArray = localPlayer.playerIdleFront;
        else if (localPlayer.spriteArray === localPlayer.playerMovingRight) localPlayer.spriteArray = localPlayer.playerIdleRight;
        else if (localPlayer.spriteArray === localPlayer.playerMovingLeft) localPlayer.spriteArray = localPlayer.playerIdleLeft;
    }
};

let localPlayerFrameIndex = 0;
let localPlayerLastFrameTime = 0;
let partnerPlayerFrameIndex = 0;
let partnerPlayerLastFrameTime = 0;

const mainAnimation = (currentTime) => {
    if (currentTime - localPlayerLastFrameTime > 300) {
        localPlayerFrameIndex = (localPlayerFrameIndex + 1) % localPlayer.spriteArray.length;
        localPlayerLastFrameTime = currentTime;
    }
    if (currentTime - partnerPlayerLastFrameTime > 310) {
        partnerPlayerFrameIndex = (partnerPlayerFrameIndex + 1) % partnerPlayer.spriteArray.length;
        partnerPlayerLastFrameTime = currentTime;
    }
    keyPress();
    render();
    requestAnimationFrame(mainAnimation);
};

const render = () => {
    context.clearRect(0, 0, width, height - 48);

    // Draw the three background layers with parallax effect
    for (let i = 0; i < 3; i++) {
        // Define the parallax ratio for each layer
        const parallaxRatio = 0.1 * (i + 1);
        let layerX = 0;

        if (i < 2) {
            // Apply parallax effect to layers other than the first one
            layerX = -(localPlayer.position.x * parallaxRatio);
        }

        context.drawImage(bgImages[i], layerX, 0, width, height - 48);
        context.drawImage(bgImages[i], layerX + width, 0, width, height - 48);
    }
    for (let i = 0; i < width / 24; i++) {
        context.drawImage(ground, 24 * i, height - 24, 24, 24);
        context.drawImage(ground, 24 * i, height - 24 * 2, 24, 24);
    }

    // for (let i = 0; i < width / 24; i++) {
    //     context.drawImage(down, 24 * i, height - 24, 24, 24);
    //     if (randomTileArray[i] === 0) {
    //         context.drawImage(up1, 24 * i, height - 48, 24, 24);
    //     } else {
    //         context.drawImage(up2, 24 * i, height - 48, 24, 24);
    //     }
    // }

    context.drawImage(shop.spriteArray[localPlayerFrameIndex], shop.position.x, shop.position.y, shop.spriteArray[localPlayerFrameIndex].width * 1.8, shop.spriteArray[localPlayerFrameIndex].height * 1.8);

    if (localPlayer.position.y > height - 24 * 3.2) {
        context.drawImage(bush, 24 * 4, height - 24 * 3.2, 50, 50);
    }
    if (localPlayer.position.y > height - 24 * 2.6) {
        context.drawImage(bush, 24 * 10, height - 24 * 2.6, 75, 50);
    }

    //context.drawImage(partnerPlayer.spriteArray[partnerPlayerFrameIndex], partnerPlayer.position.x, partnerPlayer.position.y, partnerPlayer.spriteArray[partnerPlayerFrameIndex].width * 3, partnerPlayer.spriteArray[partnerPlayerFrameIndex].height * 3);
    context.drawImage(localPlayer.spriteArray[localPlayerFrameIndex], localPlayer.position.x, localPlayer.position.y, localPlayer.spriteArray[localPlayerFrameIndex].width * 2, localPlayer.spriteArray[localPlayerFrameIndex].height * 2);

    context.fillText("Welkom   bij   mijn   interactieve   cv!", width / 4, height / 4.8);

    context.drawImage(keyW, width / 6 - keyA.width * 1.5, height / 1.63, 40, 40);
    context.drawImage(keyA, width / 6 - keyA.width * 3.5, height / 1.5, 40, 40);
    context.drawImage(keyS, width / 6 - keyA.width * 1.5, height / 1.5, 40, 40);
    context.drawImage(keyD, width / 6 + keyA.width * 0.5, height / 1.5, 40, 40);

    context.fillText("bewegen!", width / 6 - keyA.width * 3.5, height / 1.7);

    if (localPlayer.position.y < height - 24 * 3.2) {
        context.drawImage(bush, 24 * 4, height - 24 * 3.2, 50, 50);
    }
    if (localPlayer.position.y < height - 24 * 2.6) {
        context.drawImage(bush, 24 * 10, height - 24 * 2.6, 75, 50);
    }

    context.drawImage(bush, 60, height - 24 * 2, 100, 100);
    context.drawImage(bush, 520, height - 24 * 2, 190, 100);

    context.strokeText(messageBox, width / 2.2, height / 2.3);
    context.fillText(messageBox, width / 2.2, height / 2.3);

    if (inventoryOpen) {
        const inventoryX = window.innerWidth / 7;
        const inventoryY = window.innerHeight / 12;
        const inventoryWidth = window.innerWidth / 1.4;
        const inventoryHeight = window.innerHeight / 1.2;

        context.drawImage(inventory, inventoryX, inventoryY, inventoryWidth, inventoryHeight);

        const lineHeight = 30;
        let y = window.innerHeight / lineHeight / 10;
        console.log(y);

        context.fillStyle = '#000000';
        context.font = `${Math.min(window.innerWidth / 55)}px Pixel Art`;


        var b = 3;
        let i = 18.8

        context.fillText("Favoriete Taal:   Javascript", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("Goed met: C#, Java, HTML/CSS, Python", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        i--

        context.fillText("Passie voor coden", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("Passie voor games maken", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        i--
        context.fillText("Email: jobjongebloet@gmail.com", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("Ik ben leergierig, perfectionistisch", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("en gezellig/leuk in teamverband", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        i--
        context.fillText("Performance applicatie verbetern:", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("Wil alles weten over cyber-security", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("Cloud service kennis zoals Azure", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        i--
        context.fillText("Ik vind belangrijk: Performance applicatie verbetern:", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("identificeren bottlenecks, optimaliseren van algoritmen", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("gegevenstoegang, optimaliseer I/O, gebruik van datatypes", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        context.fillText("geheugengebruik (memory pooling, garbage collection, pipelines)", inventoryX + inventoryWidth / 8.5, inventoryY + inventoryHeight - lineHeight * (y + y / b * i));
        i--
        i--
        i--
        context.fillText("Press 'I' to close", inventoryX + inventoryWidth / 2.5, inventoryY + inventoryHeight - lineHeight * (y + y / 5 * i));

        context.fillStyle = '#ffffff';
        var fontSize = 32;
        var fontFamily = 'Pixel Art';
        context.font = `${fontSize}px ${fontFamily}`;
    }



};
const audioWInd = new Audio('/music/wind-3.mp3');
audioWInd.volume = 0.05;

const bgImages = [];
const numLayers = 3;
let numImagesLoaded = 0;
for (let i = 1; i <= numLayers; i++) {
    const bgImage = new Image();
    bgImage.src = `/sprites/backgrounds/layers/background_layer_${i}.png`;

    bgImage.onload = function () {
        numImagesLoaded++;
        if (numImagesLoaded === numLayers) {
            // Start the animation loop when all images are loaded

        }
    };
    bgImages.push(bgImage);
}

document.addEventListener('keydown', d);
document.addEventListener('keyup', u);

const up1 = new Image();
up1.src = '/sprites/backgrounds/tiles/oak_woods_tileset-2.png.png';

const up2 = new Image();
up2.src = '/sprites/backgrounds/tiles/oak_woods_tileset-3.png.png';

const down = new Image();
down.src = '/sprites/backgrounds/tiles/oak_woods_tileset-9.png.png';

const shopTileCornerLeft = new Image();
shopTileCornerLeft.src = '/sprites/backgrounds/tiles/oak_woods_tileset-60.png.png';

const shopTileCornerRight = new Image();
shopTileCornerRight.src = '/sprites/backgrounds/tiles/oak_woods_tileset-59.png.png';

const shopTileDown = new Image();
shopTileDown.src = '/sprites/backgrounds/tiles/oak_woods_tileset-7.png.png';

const ground = new Image();
ground.src = '/sprites/backgrounds/tiles/groundPurple-1.png.png';

const keyW = new Image();
keyW.src = '/sprites/keyboardKeys/W.png';

const keyA = new Image();
keyA.src = '/sprites/keyboardKeys/A.png';

const keyS = new Image();
keyS.src = '/sprites/keyboardKeys/S.png';

const keyD = new Image();
keyD.src = '/sprites/keyboardKeys/D.png';

const bush = new Image();
bush.src = '/sprites/backgrounds/layers/bushes.png';

const inventory = new Image();
inventory.src = '/sprites/inventory/inventory-2.png';

// var randomTileArray = [];
//
// for (let i = 0; i < width / 24; i++) {
//     if (Math.floor(Math.random() * 2) === 0) {
//         randomTileArray[i] = 0;
//     } else {
//         randomTileArray[i] = 1;
//     }
// }

var audioStarted = false;

const playAudio = () => {
    if (audioStarted) {
        document.removeEventListener('click', playAudio);
    } else {
        audioWInd.play();
        audioStarted = true;
    }
}
document.addEventListener('click', playAudio);

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    localPlayer.position.x = width - width + localPlayer.spriteArray[localPlayerFrameIndex].width * 4;
    localPlayer.position.y = height - localPlayer.spriteArray[localPlayerFrameIndex].height * 3;
    shop.position.x = width / 2;
    shop.position.y = height - 290;
    maxY = height - 20;
    maxX = width - 10;
    minX = 10;
    minY = (height - localPlayer.spriteArray[0].height * 5);
    var fontSize = 32;
    var fontFamily = 'Pixel Art';
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#000000';
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
document.body.style.overflow = "hidden";


var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var fontSize = 32;
var fontFamily = 'Pixel Art';
context.font = `${fontSize}px ${fontFamily}`;
context.fillStyle = '#ffffff';
context.strokeStyle = '#000000';
context.lineWidth = 4;
context.textAlign = "left";

document.body.insertBefore(canvas, document.body.firstChild);

localPlayer.position.x = width - width + localPlayer.spriteArray[localPlayerFrameIndex].width * 4;
localPlayer.position.y = height - localPlayer.spriteArray[localPlayerFrameIndex].height * 3;

shop.position.x = width / 2;
shop.position.y = height - 290;

function renderPlayerWhenLoaded(player) {
    const firstImage = player.spriteArray[0];
    console.log("hoi");
    if (firstImage.complete) {
        console.log("hoii");
        context.drawImage(firstImage, player.position.x, player.position.y, firstImage.width * 2, firstImage.height * 2);
    } else {
        firstImage.addEventListener('load', () => {
            mainAnimation();
        });
    }
}

renderPlayerWhenLoaded(localPlayer);



