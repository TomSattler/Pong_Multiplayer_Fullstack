class player{
    constructor(socketId){
        this.name = '';
        this.socketId = socketId;
        this.keyPressedUp = false;
        this.keyPressedDown = false;
        this.score = 0;
    }
    scored(){
        this.score++;
    }
    keyPressedUp(){
        this.keyPressedUp = !this.keyPressedUp;
    }
    keyPressedDown(){
        this.keyPressedDown = !this.keyPressedDown;
    }
}