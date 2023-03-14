/*    SERVER SIDE CODE    */

const expr = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = expr();
const srvr = http.createServer(app);
const io = new Server(srvr);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //console.log('user connected');

  socket.on('chat message', (msg) => {
    //console.log('user sent message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });
});

srvr.listen(3000, () => {
  //console.log('listening on *:3000');
});