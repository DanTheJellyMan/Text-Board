const socket = io('https://text-board.duckdns.org', {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false,
    transports: ['websocket', 'polling'],
    path: '/socket.io',
    reconnectionAttempts: 20,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    randomizationFactor: 0.5,
    timeout: 30000, // 30 seconds
    autoConnect: true,
    debug: true
});

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
    /* const strReq = (str) => {
        if (!str) return [false, "Username cannot be empty. Please enter a valid username."]

        for (const char of str) {
            // Checks every character of a string for letters or numbers. If not, return false, and explain user's error
            if (!/[A-Za-z0-9]/.test(char)) {
                let invalidChar = [];
                for (const iChar of str) {  // Gets every invalid character from the invalid username
                    if (!/[A-Za-z0-9]/.test(iChar)) {
                        if (iChar === " ") {
                            invalidChar.push(" space ");
                        } else {
                            invalidChar.push(iChar);
                        }
                    }
                }
                return [false, `Username may ONLY contain letters or numbers!\nNot allowed: (${invalidChar.join("   ")})`];
            }
        }
        return [true, ""];
    }
    
    while (true) {
        const strCheck = strReq(username);
        if (username && strCheck[0]) {
            console.log("Username acquired");
            socket.emit("grabbed-username", username.trim());
            document.getElementById("ui-message").innerHTML += ` ${username}?`;
            break;
        } else {
            console.log("Invalid username");
            username = prompt(strCheck[1]);
        }
    } */
}


// Places "You" in the username area of messages the user has sent
async function chatPerspective() {

}