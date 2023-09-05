const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const socket = io();
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

backendPlayers = {};
playa1 = false;
playa2 = false;
ready2play = false;
player1Socketid = 0;
player2Socketid = 0;
leftUpArrowPressed = false;
leftDownArrowPressed = false;
rightUpArrowPressed = false;
rightDownArrowPressed = false;
leftPaddle = new paddle();
rightPaddle = new paddle();
ball = new ball();

// Funktion zum Zeichnen des Spiels
function drawGame() {
    if(ready2play){
    // Hintergrund löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Schläger zeichnen
    if(ball.ballX<50){
        ball.checkPaddleCollision(leftPaddle.paddleY, leftPaddle.paddleHeight);
    }else if(ball.ballX>canvas.width-50){
    ball.checkPaddleCollision(rightPaddle.paddleY, rightPaddle.paddleHeight);
    }
    ball.moveBall();
    ctx.fillStyle = "white";
    if(backendPlayers[player1Socketid].keyUpPressed){
        leftPaddle.movePaddleUp();
    }
    if(backendPlayers[player1Socketid].keyDownPressed){
        leftPaddle.movePaddleDown();
    }
    if(backendPlayers[player2Socketid].keyUpPressed){
        rightPaddle.movePaddleUp();
    }
    if(backendPlayers[player2Socketid].keyDownPressed){
        rightPaddle.movePaddleDown();
    }
    ctx.fillRect(0, leftPaddle.paddleY, leftPaddle.paddleWidth, leftPaddle.paddleHeight);
    ctx.fillRect(
        canvas.width - rightPaddle.paddleWidth,
        rightPaddle.paddleY,
        rightPaddle.paddleWidth,
        rightPaddle.paddleHeight
    );

    // Ball zeichnen
    ctx.beginPath();
    ctx.arc(ball.ballX, ball.ballY, ball.ballSize, 0, Math.PI * 2);
    ctx.fill();
    }
}

// Hauptspiel-Schleife
function gameLoop() {
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Steuerung festlegen
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        rightUpArrowPressed = true;
        backendPlayers[socket.id].keyUpPressed = true;
        socket.emit('keydown', 'ArrowUp');
    } else if (event.key === "ArrowDown") {
        rightDownArrowPressed = true;
        backendPlayers[socket.id].keyDownPressed = true;
        socket.emit('keydown', 'ArrowDown');
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") {
        rightUpArrowPressed = false;
        backendPlayers[socket.id].keyUpPressed = false;
        socket.emit('keyup', 'ArrowUp');
    } else if (event.key === "ArrowDown") {
        rightDownArrowPressed = false;
        backendPlayers[socket.id].keyDownPressed = false;
        socket.emit('keyup', 'ArrowDown');
    }
});
//--------------------------------------------------//
player1.addEventListener("click", function(event){
    if(!playa2){
        player1.style.backgroundColor = "white";
        playa1 = true;
        player1Socketid = socket.id;
        socket.emit('leftPlayerLocked', 'leftPlayer');
    }
});
player2.addEventListener("click", function(event){
    if(!playa1){
        player2.style.backgroundColor = "white";
        playa2 = true;
        player2Socketid = socket.id;
        socket.emit('rightPlayerLocked', 'rightPlayer');
    }
});
socket.on('updatePlayers', (players) =>{
    backendPlayers = players;
})
socket.on('readyToPlay', (otherPlayer)=>{
    if(socket.id!=player2Socketid){
        player2Socketid = otherPlayer.rightPlayerSocketId;
        ready2play= true;
        console.log(otherPlayer.rightPlayerSocketId);
    }else{
        player1Socketid = otherPlayer.leftPlayerSocketId;
        ready2play= true;
        console.log(otherPlayer.leftPlayerSocketId);
    }
})
gameLoop();
