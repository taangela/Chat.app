const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();


const messages = [];
let users =[];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join',(user) => {
    users.push({name: user, id: socket.id});
    socket.broadcast.emit('newUser', user);
    console.log(users);
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    user_to_remove = users.filter(el => el.id === socket.id)[0];
    users = users.filter(el => el.id !== socket.id);
     
    socket.broadcast.emit('removeUser', user_to_remove.name);
    console.log('Oh, socket ' + socket.id + ' has left') 
    console.log(users);

  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});