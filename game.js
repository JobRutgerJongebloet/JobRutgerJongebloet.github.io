const peerConnection = new RTCPeerConnection();
let udpDataChannel = peerConnection.createDataChannel("udpChannel", { ordered: false });
let tcpDataChannel = peerConnection.createDataChannel("tcpChannel");

let createOffer = () => {
    peerConnection.onicecandidate = e => {if (e.candidate === null) document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)};
    udpDataChannel.onmessage = e => {
        partnerPosition = JSON.parse(e.data);
    };
    udpDataChannel.onopen = e => mainAnimation();
    tcpDataChannel.onmessage = e => console.log(e.data);
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
}

let createAnswer = () => {
    let offer = JSON.parse(document.getElementById('offer-sdp').value);
    peerConnection.onicecandidate = e => {if (e.candidate === null) {document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)}};
    peerConnection.ondatachannel = e => {
        if (e.channel.label === "udpChannel") {
            udpDataChannel = e.channel;
            udpDataChannel.onmessage = e => {
                partnerPosition = JSON.parse(e.data);
            };
            udpDataChannel.onopen = e => mainAnimation();
        } else if (e.channel.label === "tcpChannel") {
            tcpDataChannel = e.channel;
            tcpDataChannel.onmessage = e => console.log(e.data);
        }
    };
    peerConnection.setRemoteDescription(offer);
    peerConnection.createAnswer().then(answer => peerConnection.setLocalDescription(answer));
}

let addAnswer = async () => {
    let answer = JSON.parse(document.getElementById('answer-sdp').value);
    if (!peerConnection.currentRemoteDescription) { peerConnection.setRemoteDescription(answer); }
}

document.getElementById('create-offer').addEventListener('click', createOffer);
document.getElementById('create-answer').addEventListener('click', createAnswer);
document.getElementById('add-answer').addEventListener('click', addAnswer);

var canvas = document.createElement("canvas");
var width = 800;
var height = 500;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var localPosition = {
    x: 0,
    y: 0
};

var partnerPosition = {
    x: 0,
    y: 0
};

let k = [];
const d = (e) => !k.includes(e.key) && k.push(e.key);
const u = (e) => {
    if (e.key === 'Enter') { // check if Enter is pressed
        console.log(player.mesh.position)
        console.log(pointer)
    }
    const i = k.indexOf(e.key); i !== -1 && k.splice(i, 1)
};

document.addEventListener('keydown', d); document.addEventListener('keyup', u);

const maxX = 800;
const maxY = 800;
const minX = 0;
const minY = 0;
const speed = 4;

var keyPress = function () {
    if (k.length > 0) {
        switch (k[0]) {
            case 'w':
                if (localPosition.y > minY) {
                    localPosition.y -= speed;
                }
                break;
            case 's':
                if (localPosition.y < maxY) {
                    localPosition.y += speed;
                }
                break;
            case 'a':
                if (localPosition.x > minX) {
                    localPosition.x -= speed;
                }
                break;
            case 'd':
                if (localPosition.x < maxX) {
                    localPosition.x += speed;
                }
                break;
        }
        udpDataChannel.send(JSON.stringify(localPosition));
    }
};

var render = function () {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#F7FF0F";
    context.fillRect(partnerPosition.x, partnerPosition.y, 50, 50);

    context.fillStyle = "#FF5733";
    context.fillRect(localPosition.x, localPosition.y, 50, 50);
};

const mainAnimation = () => {
    keyPress();
    render();
    requestAnimationFrame(mainAnimation);
};

context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);

context.fillStyle = "#F7FF0F";
context.fillRect(0, 0, 50, 50);

context.fillStyle = "#FF5733";
context.fillRect(localPosition.x, localPosition.y, 50, 50);

document.body.insertBefore(canvas, document.body.firstChild);