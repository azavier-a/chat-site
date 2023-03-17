/*    SERVER SIDE CODE    */

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected (' + socket.id + ')');

  socket.on('chat message', (msg, sig, rec) => {
    console.log(sig + ' sent message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected (' + socket.id + ')');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});