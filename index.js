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
    //io.emit('chat message', msg, sig, rec);
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'messages.php');
    xhr.addEventListener('load', function() {
      //response from PHP
      let response = JSON.parse(this.responseText);
      io.emit('messages', response);
    });

    let data = new FormData();
    data.append('signature', sig);
    data.append('recipient', rec);
    data.append('message', msg);
    xhr.send(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected (' + socket.id + ')');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});