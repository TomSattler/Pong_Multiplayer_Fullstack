class paddle{
    constructor(){
        this.paddleWidth = 10;
        this.paddleHeight = 100;
        this.paddleSpeed = 5;
        this.paddleY = (canvas.height - this.paddleHeight) / 2;
    };
    movePaddleUp(){
        this.changePaddleY(-this.paddleSpeed);
    }
    movePaddleDown(){
        this.changePaddleY(this.paddleSpeed);
    }
    changePaddleY(velocity){
        if(this.paddleY+velocity>=0&&this.paddleY+velocity<=canvas.height-this.paddleHeight){
            this.paddleY+=velocity;
        }
    }
};