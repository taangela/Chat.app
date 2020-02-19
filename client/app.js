'use strict';
{
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
      window.alert('You need to type your name!');
      return;
    }else {
      userName = userNameInput.value;
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
    if (!messageContentInput.value) {
      alert('Yoy need write your message!');
      return;
    }else {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value='';  
    }
  }



  loginForm.addEventListener('submit', event => {
    login(event);
  });

  addMesssageForm.addEventListener('submit', event => {
    sendMessage(event);
  });
}