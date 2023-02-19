let peerConnection = new RTCPeerConnection();
let udpDataChannel = peerConnection.createDataChannel("udpChannel", { ordered: false });
let tcpDataChannel = peerConnection.createDataChannel("tcpChannel");

var udp;
var tcp;

udpDataChannel.onopen = e => udp = true;
tcpDataChannel.onopen = e => tcp = true;

peerConnection.oniceconnectionstatechange = e => {
    if (peerConnection.iceConnectionState == "connected"){
        console.log(peerConnection.iceConnectionState)
    }
  }

let createOffer = () => {
    peerConnection.onicecandidate = e => {if (e.candidate === null) document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)};
    udpDataChannel.onmessage = e => alert(e.data);
    tcpDataChannel.onmessage = e => alert(e.data);
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
}

let createAnswer = () => {
    let offer = JSON.parse(document.getElementById('offer-sdp').value);
    peerConnection.onicecandidate = e => {if (e.candidate === null) {document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)}};
    peerConnection.ondatachannel = e => {
        if (e.channel.label === "udpChannel") {
            udpDataChannel = e.channel;
            udpDataChannel.onmessage = e => alert(e.data);
        } else if (e.channel.label === "tcpChannel") {
            tcpDataChannel = e.channel;
            udpDataChannel.onmessage = e => alert(e.data);
        }
    };
    peerConnection.setRemoteDescription(offer);
    peerConnection.createAnswer().then(answer => peerConnection.setLocalDescription(answer));
}

let addAnswer = async () => {
    let answer = JSON.parse(document.getElementById('answer-sdp').value);
    if (!peerConnection.currentRemoteDescription) {peerConnection.setRemoteDescription(answer);}
    if (udp && tcp) { window.location.href = "menu.html" } 
}

document.getElementById('create-offer').addEventListener('click', createOffer);
document.getElementById('create-answer').addEventListener('click', createAnswer);
document.getElementById('add-answer').addEventListener('click', addAnswer);
