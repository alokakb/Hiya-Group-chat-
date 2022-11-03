const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

let audio = new Audio('ting.mp3');
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const name = prompt('Enter your name');
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    if(name!=null){
        append(`${name} joined the chat`, 'left');
    }
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name =>{
    if(name!=null){
        append(`${name} left the chat`, 'left');
    } 
})