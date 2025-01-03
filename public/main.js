const socket = io();

// WebRTC setup
const peer = new Peer(); // Create a new PeerJS instance

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
});

peer.on('call', (call) => {
    call.answer(window.localStream); // Answer the call with the local stream
    call.on('stream', (remoteStream) => {
        // Display remote video stream
        const video = document.createElement('video');
        video.srcObject = remoteStream;
        video.play();
        document.getElementById('remoteVideos').appendChild(video);
    });
});

// Handle sending messages via WebSocket
function sendMessage() {
    const message = document.getElementById('chatMessage').value;
    socket.emit('chat-message', message); // Emit the message
    document.getElementById('chatMessage').value = ''; // Clear the input field
}

// Display incoming chat messages
socket.on('chat-message', (msg) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = msg;
    document.getElementById('messages').appendChild(messageElement);
});

// Set up the video stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
        const myVideo = document.getElementById('myVideo');
        myVideo.srcObject = stream;
        window.localStream = stream;
        
        // Example: Initiating a call to another peer (you'll need peer IDs)
        // peer.call(remotePeerId, stream); // Replace `remotePeerId` with an actual ID
    })
    .catch((err) => {
        console.log('Failed to get media: ', err);
    });
