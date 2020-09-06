var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;


var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

var pause = false;

document.addEventListener("keydown", eventKeyCode);
// document.addEventListener("keydown", moveUp);

function eventKeyCode(e){
    var keyCode = e.keyCode;
    switch(keyCode){
        case 38: /// arrow up
            moveUp();
            break;
        case 80: /// p
            pauseGame();
            break;
    }
}

function moveUp() {
    bY -= 25;
    fly.play();
}

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}


function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.font = "40pt Calibri";
    
    for (var i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (bX + bird.width >= pipe[i].x &&
            bX <= pipe[i].x + pipeNorth.width &&
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant || bY + bird.height >= cvs.height - fg.height)) {
            // location.reload();
            this.pauseGame();
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    if(pipe.length > 2){
        pipe.splice(0,1);
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);
    ctx.fillText(score,cvs.width - 45,36);
    bY += gravity;

    if(!pause){
        requestAnimationFrame(draw);
    }
}

function pauseGame(){
    pause = !pause;
    draw();
}



draw();