const ws = new WebSocket('ws://text-board.duckdns.org');
const inputBox = document.getElementById("input-box");
let username = null;

ws.onopen = () => {
    console.log('Connected to the WebSocket server');
    ws.send(JSON.stringify({ type: 'connection-status', content: 'Connection successful' }));
};

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'connection-status') {
        console.log(message.content);
    } else if (message.type === 'grab-username') {
        username = grabUsername();
        ws.send(JSON.stringify({ type: 'grabbed-username', content: username }));
        console.log(username);
    } else if (message.type === 'message') {
        console.log(message.content);
        const msg = document.createElement("li");
        msg.innerHTML = message.content;
        document.querySelector("ul").appendChild(msg);
    } else if (message.type === 'reset') {
        document.querySelector("ul").innerHTML = '';
    }
};

inputBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        ws.send(JSON.stringify({ type: 'message', content: inputBox.value }));
        inputBox.value = '';
    }
});

function grabUsername() {
    return prompt("What's your name?");
}