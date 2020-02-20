const socket = io();//zainicjuj nowego klienta socketowego i zachowaj referencje do niego pod stałą socket
//socket.on('message', (event) => addMessage(event.author, event.content))
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser',(user) => addMessage( 'ChatBot', `<i><b>${user}</b> has joined the converstaion!</i>`));
socket.on('removeUser',(user) => addMessage('ChatBot', `<i><b>${user}</b> has left the conversation!</i>`));

const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMesssageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput =document.getElementById('message-content');

let userName ='';


function login(event) {
  event.preventDefault();
  if (!userNameInput.value) {
    alert('You need to type your name!');
    return;
  }else {
    userName = userNameInput.value;
    socket.emit('join', userName);
    loginForm.classList.remove('show');
    messageSection.classList.add('show');
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
  <h3 class="message__author">${userName === author ? 'You' : author}</h3>
  <div class="message__content">
    ${content}
  </div>
`;
  messagesList.appendChild(message);

}
function sendMessage(event) {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('Yoy need to write your message!');
    return;
  }else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value='';  
  }
}



loginForm.addEventListener('submit', event => {
  login(event);
});

addMesssageForm.addEventListener('submit', event => {
  sendMessage(event);
});
