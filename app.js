const socket = io('ws://localhost:3000');

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
});

document.querySelector("input").onkeydown = (event) => {
    if (event.key == "Enter") {
        const text = document.querySelector('input').value;
        document.querySelector("input").value = "";
        socket.emit('message', text);
    }
}

/* Code for button input:
document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text)
}
*/