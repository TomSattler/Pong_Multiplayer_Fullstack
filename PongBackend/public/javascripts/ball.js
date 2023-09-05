class ball{
    constructor(){
        this.ballSize = 10;
        this.ballX = canvas.width / 2;
        this.ballY = canvas.height / 2;
        this.ballSpeedX = 2;
        this.ballSpeedY = 2;
    }
    moveBall(){
        if(this.ballY+this.ballSpeedY>canvas.height||this.ballY+this.ballSpeedY<0){
            this.changeYDirection();
        }
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
    }
    changeYDirection(){
        this.ballSpeedY = -this.ballSpeedY;
    }
    changeXDirection(){
        this.ballSpeedX = -this.ballSpeedX;
    }
    checkPaddleCollision(paddleY, paddleHeight){
        if(this.ballX<10||this.ballX>canvas.width-10){
            if(this.ballY<paddleY+paddleHeight&&this.ballY>paddleY)
            {
                this.changeXDirection();
            }else{
                this.ballX = canvas.width/2;
                this.ballY = canvas.height/2;
            }
        }
    }
};