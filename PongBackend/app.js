const { log } = require('console');
const express = require('express');
const app = express();
const port = 3001;

const http = require('http');
const server = http.createServer(app)
const {Server} = require('socket.io');
const io = new Server(server)

app.use(express.static('public'));

app.get('/',(req, res) => {
  res.sendFile(__dirname + '/public/Pong.html');
})
const players = {}

io.on('connection', (socket) => {
  console.log('A user has connected.');
  players[socket.id] = {
    name: '',
    score: 0,
    playerLeft: false,
    playerRight: false,
    keyDownPressed: false,
    keyUpPressed: false,
    paddleY: 0
  }
  io.emit('updatePlayers', players);

  leftPlayer = false;
  rightPlayer = false;
  leftPlayerSocketId = 0;
  rightPlayerSocketId = 0;


  gamestate = {
    leftPlayerSocketId,
    leftPlayer,
    rightPlayerSocketId,
    rightPlayer
  }
  socket.on('keydown', (keycode) => {
    switch(keycode){
      case 'ArrowUp':
        players[socket.id].keyUpPressed = true;
      case 'ArrowDown':
        players[socket.id].keyDownPressed = true;
    }
  })
  socket.on('keyup', (keycode) => {
    switch(keycode){
      case 'ArrowUp':
        players[socket.id].keyUpPressed = false;
      case 'ArrowDown':
        players[socket.id].keyDownPressed = false;
    }
  })
  socket.on('leftPlayerLocked', (playerSide) => {
        players[socket.id].playerLeft = true;
        gamestate.leftPlayerSocketId = socket.id;
        gamestate.leftPlayer = true;
        if(gamestate.rightPlayer){
          io.emit('readyToPlay', gamestate);
          console.log(players);
        }
    })
  socket.on('rightPlayerLocked', (playerSide) => {
        players[socket.id].playerRight = true;
        gamestate.rightPlayerSocketId = socket.id;
        gamestate.rightPlayer = true;
        if(gamestate.leftPlayer){
          io.emit('readyToPlay', gamestate);
          console.log(players);
        }
  })
  setInterval(() => {
    io.emit('updatePlayers', players);
  }, 15)
})
server.listen(port, () =>{
  console.log('Example app listening in port ${port}');
})
module.exports = app;
