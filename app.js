const socket = io("http://108.237.28.44:3000");
const inputBox = document.getElementById("input-box");
let username;

// Let user know they've connected to the server
socket.on("user-connected", (notice) => console.log(notice));

// Send a message when user presses Enter in the text box
inputBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        socket.emit("message", inputBox.value);
        inputBox.value = null;
    }
});

socket.on("grab-username", grabUsername);

// Handle displaying received messages from the server
socket.on("message", (text) => {
    console.log(text);
    const msg = document.createElement("li");
    msg.innerHTML = text;
    document.querySelector("ul").appendChild(msg);
});

function grabUsername() {
    username = prompt("What's your name?");
    while (true) {
        if (username && isNaN(username)) {
            username = username.trim();
            console.log("username acquired");
            socket.emit("grabbed-username", username);
            break;
        } else {
            console.log("invalid username");
            username = prompt("Valid username required before entering!");
            continue;
        }
    }
}

// Places "You" in the username area of messages the user has sent
async function chatPerspective() {

}