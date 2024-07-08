const socket = io("http://localhost:3000");
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
    username = prompt("What's your name?").trim();
    
    const strReq = (str) => {
        for (const char of str) {
            // Checks every character of a string for letters or numbers. If not, return false, and explain user's error
            if (!/[A-z]/.test(char) && !/[0-9]/.test(char)) {
                let invalidChar = [];
                for (const iChar of str) {  // Gets every invalid character from the invalid username
                    if (!/[A-z]/.test(iChar) || !/[0-9]/.test(iChar)) {
                        invalidChar.push(iChar);
                    }
                }
                return [false, `Username may ONLY contain letters or numbers!\n(not: ${invalidChar})`];
            }
        }
        return true;
    }
    
    while (true) {
        const strCheck = strReq(username);
        if (username && !username.includes(" ") && strCheck[0]) {
            console.log("username acquired");
            socket.emit("grabbed-username", username);
            break;
        } else {
            console.log(strCheck);
            console.log("invalid username");
            username = prompt(strCheck[1]);
            continue;
        }
    }
}

// Places "You" in the username area of messages the user has sent
async function chatPerspective() {

}