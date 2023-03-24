const board = document.getElementById("game");
const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 400;
board.style.width = BOARD_WIDTH + "px";
board.style.height = BOARD_HEIGHT + "px";

let shouldRun = true;

function Snake()
{
    let snake = [{x:BOARD_WIDTH/2, y:BOARD_HEIGHT/2}];
    let direction = "right";

    const food = new Food();
    food.createFood();
    this.setDirection = function(Direction)
    {
        direction = Direction;
    }
    this.getDirection = function()
    {
        return direction;
    }
    this.update = function()
    {
        const head = snake[0];
        let newHead;
        switch(direction)
        {
            case "right":
                 newHead = {x: head.x +10, y:head.y};
                break;
            case "left":
                 newHead = {x: head.x -10, y:head.y};
                break;
            case "up":
                newHead = {x: head.x, y:head.y-10};
                break;
            case "down":
                newHead = {x: head.x, y:head.y+10};
                break;
        }

        if (newHead.x < 0 || newHead.x > BOARD_WIDTH-10 || newHead.y < 0 || newHead.y > BOARD_HEIGHT-10) {
            shouldRun = false;
            alert("Game Over!");
            restartGame();
            return;
        }
        for (var i = 1; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                shouldRun = false;
                alert('Game Over!');
                restartGame();
                return;
            }
        }
        if (Math.abs(newHead.x - food.position.x) < 10 && Math.abs(newHead.y - food.position.y) < 10) {
            food.createFood();
            snake.unshift(newHead);
        }
        else
        {
            snake.pop();
            snake.unshift(newHead);
        }
          for (var i = 0; i < snake.length; i++) {
            var segment = document.createElement("div");
            segment.setAttribute("class", "snake");
            segment.style.left = snake[i].x + "px";
            segment.style.top = snake[i].y + "px";
            board.appendChild(segment);
          }
    }
    this.reset = function()
    {
        snake = [{x:BOARD_WIDTH/2, y:BOARD_HEIGHT/2}];
        food.createFood();
    }
}

function Food()
{
    this.position;
    this.createFood = function()
    {
        const currentFood = document.getElementById("food");//get the current food item
        if(currentFood)//if the food exists
        {
            currentFood.remove();//remove the current food item || this is because we call createFood at the start of the game as well as after the food as been eaten and we want the Food() object to handle the destruction and creation of it's dom element
        }

        //generate the new food position
        const x = Math.floor(Math.random()*390);
        const y = Math.floor(Math.random()*390);

        const food = document.createElement('div');//create the new food element
        food.setAttribute("id", "food");//set the id 
        food.style.left = x+"px";//set the x position in the dom
        food.style.top = y+"px";//set the y position in the dom
        board.appendChild(food);//add the food to the dom
        this.position =  {x:x, y:y};//return the food position
    }   
}

function Game()
{
    const snake = new Snake();

    this.update = function()
    {
        if(shouldRun){
        document.addEventListener("keydown", function (event) {
            let direction = snake.getDirection();
            switch (event.keyCode) {
              case 37:
                if (direction !== "right") {
                  snake.setDirection("left");
                }
                break;
              case 38:
                if (direction !== "down") {
                    snake.setDirection("up");
                }
                break;
              case 39:
                if (direction !== "left") {
                    snake.setDirection("right");
                }
                break;
              case 40:
                if (direction !== "up") {
                    snake.setDirection("down");
                }
                break;
            }
          });
        clearBoard();
        snake.update();
        }
    }

    this.reset = function()
    {
        snake.reset();
    }

    function clearBoard()
    {
        var segments = document.querySelectorAll(".snake");
        for (var i = 0; i < segments.length; i++) {
          board.removeChild(segments[i]);
        }
    }
}
let game = new Game();
setInterval(()=>game.update(), 100);

function restartGame()
{
  game.reset();
  shouldRun = true;
}
