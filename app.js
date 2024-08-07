const socket = io("https://wallatext.serveo.net");
let username = null;
const input = document.querySelector("input");

// Let user know they've connected to the server
socket.on("connect", () => console.log("Connected"));
/*
socket.on("grab-username", () => {
    username = grabUsername();
    socket.emit("grabbed-username", username);
    console.log(username);
});
*/
// Send a message when user presses Enter in the text box
input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        socket.emit("message", input.value);
        
        input.value = "";
    }
});

// Handle displaying received messages from the server
socket.on("message", (str) => {
    chatPerspective("me", str);
});

socket.on("disconnect", () => console.log("Disconnected"));

function grabUsername() {
    return prompt("What's your name?");
}

// Places "You" in the username area of messages the user has sent
function chatPerspective(origin, str) {
    console.log(str);
    const msg = document.createElement("li");
    msg.innerHTML = str;
    document.querySelector("ul").appendChild(msg);
}