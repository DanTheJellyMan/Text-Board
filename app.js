const socket = io("https://wallatext.serveo.net");
let username = null;
const input = document.querySelector("input");

// Let user know they've connected to the server
socket.on("connect", () => console.log("Connected"));

socket.on("grab-username", () => {
    username = grabUsername();
    socket.emit("grabbed-username", username);
    console.log(username);
});

// Send a message when user presses Enter in the text box
input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        socket.emit("message", input.value);
        chatPerspective("local", {
            "msg": input.value,
            "user": "You",
            "color": null
        });
        input.value = "";
    }
});

// Handle displaying received messages from the server
socket.on("message", (info) => {
    chatPerspective("remote", info);
});

socket.on("disconnect", () => console.log("Disconnected"));

function grabUsername() {
    return prompt("What's your name?");
}

// Places "You" in the username area of messages the user has sent
function chatPerspective(origin, info) {
    console.log(info);
    const msgContainer = document.createElement("div");
    const user = document.createElement("p");
    const msg = document.createElement("p");
    const color = info.color ? info.color : null;

    msgContainer.className = `msg-container ${origin}`;
    user.className = "user";
    msg.className = "msg";

    user.innerHTML = info.user;
    msg.innerHTML = info.msg;

    msgContainer.append(user, msg);
    document.querySelector(".chat.wall").appendChild(msgContainer);
}