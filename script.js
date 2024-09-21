let rod1 = document.getElementById('rod1');
let rod2 = document.getElementById('rod2');
let ball = document.getElementById('ball');

const storeName = "PlayerName";
const storeScore = "PlayerMaxScore";
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

let score, maxScore, move, rod, ballSpeedX = 2, ballSpeedY = 2;

let gameOn = false;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Local Storage Initialization
(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === null || maxScore === null) {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1";
    } else {
        alert(rod + " has a maximum score of " + maxScore * 100);
    }

    resetBoard(rod);
})();

// Resetting Game
function resetBoard(rodName) {
    // Reset the positions of rods and the ball
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + "px";
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + "px";
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
    ball.style.top = (window.innerHeight - ball.offsetHeight) / 2 + "px";
    score = 0;
    gameOn = false;
}

// Moving Rods And Ball Code
window.addEventListener('keydown', function (event) {
    let rodSpeed = 20;
    let rodRect = rod1.getBoundingClientRect();

    if (event.code === "KeyD" && rodRect.x + rodRect.width < windowWidth) {
        rod1.style.left = rodRect.x + rodSpeed + "px";
        rod2.style.left = rod1.style.left;
    } else if (event.code === "KeyA" && rodRect.x > 0) {
        rod1.style.left = rodRect.x - rodSpeed + "px";
        rod2.style.left = rod1.style.left;
    }

    if (event.code === "Enter") {
        if (!gameOn) {
            // Prevent the game from starting automatically
            gameOn = true;

            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDiameter = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;

            move = setInterval(function () {
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + "px";
                ball.style.top = ballY + "px";

                if (ballX + ballDiameter > windowWidth || ballX < 0) {
                    ballSpeedX = -ballSpeedX;
                }

                let ballPos = ballX + ballDiameter / 2;

                if (ballY <= rod1Height) {
                    ballSpeedY = -ballSpeedY;
                    score++;

                    if (ballPos < rod1X || ballPos > rod1X + rod1Width) {
                        storeWin(rod2Name, score);
                    }
                } else if (ballY + ballDiameter >= windowHeight - rod2Height) {
                    ballSpeedY = -ballSpeedY;
                    score++;

                    if (ballPos < rod2X || ballPos > rod2X + rod2Width) {
                        storeWin(rod1Name, score);
                    }
                }
            }, 10);
        }
    }
});

// Function to store the player's maximum score
function storeWin(playerName, playerScore) {
    if (playerScore > maxScore) {
        maxScore = playerScore;
        localStorage.setItem(storeName, playerName);
        localStorage.setItem(storeScore, maxScore);
        alert(playerName + " has a new maximum score of " + maxScore * 100);
    } else {
        alert("Game over. " + playerName + " wins with a score of " + playerScore * 100);
    }
    
    resetBoard(playerName);
}

// Function to reset the game board
// function resetBoard(rodName) {
//     alert("Get ready for the next round!");
//     rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + "px";
//     rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + "px";
//     ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
//     ball.style.top = (window.innerHeight - ball.offsetHeight) / 2 + "px";
//     score = 0;
//     gameOn = false;
// }

