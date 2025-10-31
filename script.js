let canvas;
let ctx;
let blockSize = 25;
let cols;
let rows;
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let score = 0;
let highScore;
let speed = 200;
let gameLoop;

let up = document.getElementById("up");
let down = document.getElementById("down");
let left = document.getElementById("left");
let right = document.getElementById("right");


// snake-food
let snake = [[5 * blockSize, 5 * blockSize]];
let foodX = 10 * blockSize;
let foodY = 10 * blockSize;




window.onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    up.addEventListener("click", () => move({key: "w"}));
    down.addEventListener("click", () => move({key: "s"}));
    left.addEventListener("click", () => move({key: "a"}));
    right.addEventListener("click", () => move({key: "d"}));

    const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        cols = Math.floor(canvas.width / blockSize);
        rows = Math.floor(canvas.height / blockSize);
    };

    resize();


    window.addEventListener("resize", resize);
    window.addEventListener("keydown", move);
    gameLoop = setInterval(update,speed);
};


function update () {
    if (gameOver){
        return;
    };
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let headX = snake[snake.length -1][0] + velocityX * blockSize;
    let headY = snake[snake.length -1][1] + velocityY * blockSize;


    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height);

    detectFood(headX,headY);


    ctx.fillStyle = "red";
    ctx.fillRect(foodX,foodY,blockSize,blockSize);
    
    
    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(snake[i][0],snake[i][1],blockSize,blockSize);
    }


    if(headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height){
        endGame();
    }

    for (let i = 0; i < snake.length -1; i++){
        if(headX === snake[i][0] && headY === snake[i][1]){
            endGame();
        };
    };


    highScore = localStorage.getItem("highScore");
    if(highScore === null){
        highScore = 0;
    } else {
        highScore = parseFloat(highScore);
    };

    if (score > highScore){
       highScore = score;
       localStorage.setItem("highScore",highScore);
    };


    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText("Score: " + score, 5, 40);

    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText("highScore: " + highScore, 5, 70);
};


function move(e) {
    if(e.key === "w" && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "s" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "a" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "d" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    };

};


function detectFood(headX,headY){
    if(headX === foodX && headY === foodY){
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
        score++;


    } else {
        snake.shift();
    }
    snake.push([headX,headY]);
};


function endGame() {
    gameOver = true;
    alert("game.over");
    location.reload("");

};
