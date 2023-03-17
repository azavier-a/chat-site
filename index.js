/*    SERVER SIDE CODE    */

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let users = 0;
const user = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected (' + socket.id + ')');
  users++;
  if(!user[socket.id])
    user[socket.id] = users;
  
  io.emit('guest number', socket.id, user[socket.id]);

  socket.on('chat message', (msg, sig) => {
    console.log(sig + ' sent message: ' + msg);
    io.emit('chat message', msg, sig);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});