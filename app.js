const socket = io("https://wallatext.serveo.net");

const inputBox = document.getElementById("input-box");
let username = null;

// Let user know they've connected to the server
socket.on("connection-status", (notice) => console.log(notice));

socket.on("grab-username", () => {
    username = grabUsername();
    socket.emit("grabbed-username", username);
    console.log(username);
});
// Send a message when user presses Enter in the text box
inputBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        socket.emit("message", inputBox.value);
        inputBox.value = null;
    }
});

// Handle displaying received messages from the server
socket.on("message", (text) => {
    console.log(text);
    const msg = document.createElement("li");
    msg.innerHTML = text;
    document.querySelector("ul").appendChild(msg);
});

function grabUsername() {
    return prompt("What's your name?");
}


// Places "You" in the username area of messages the user has sent
async function chatPerspective() {

}