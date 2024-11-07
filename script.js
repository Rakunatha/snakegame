let canvas = document.getElementById("board");
let context = canvas.getContext("2d");

let box = 20; // Size of each box
let snake = [{ x: 9 * box, y: 9 * box }]; // Initial position of the snake
let direction; // Direction of the snake
let food = { x: Math.floor(Math.random() * 17 + 1) * box, y: Math.floor(Math.random() * 15 + 3) * box }; // Random food position

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    context.fillStyle = "#f0f0f0"; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "green" : "white"; // Snake color
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = "black"; // Snake border
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "red"; // Food color
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 17 + 1) * box, y: Math.floor(Math.random() * 15 + 3) * box };
    } else {
        snake.pop(); // Remove last part of snake
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over!");
        return;
    }

    snake.unshift(newHead); // Add new head to the snake
}

canvas.width = 400; // Set canvas width
canvas.height = 400; // Set canvas height

let game = setInterval(draw, 100); // Game loop