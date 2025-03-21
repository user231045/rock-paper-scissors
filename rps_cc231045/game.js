document.addEventListener('DOMContentLoaded', function () {    //DOM manipulation

    //references to the game audios
    const computerWinSound = document.getElementById('computerWinSound');
    const playerLoseSound = document.getElementById('playerLoseSound');
    const playerWinSound = document.getElementById('playerWinSound');
    const tieSound = document.getElementById('tieSound');

    //function of game logic
    const game = () => {
        //initializing the score & moves
        let playerScore = 0;
        let computerScore = 0;
        let moves = 0;

        //function to handle the game play
        const playGame = () => {
            //referencing the buttons
            const rockBtn = document.querySelector('.rock');
            const paperBtn = document.querySelector('.paper');
            const scissorBtn = document.querySelector('.scissor');
            const playerOptions = [rockBtn, paperBtn, scissorBtn];
            const computerOptions = ['rock', 'paper', 'scissors'];

            //updating how many moves are left
            const updateMovesLeft = () => {
                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Moves Left: ${10 - moves}`;
            };

            //when the player clicks one button, the function inside the event listener will be executed
            playerOptions.forEach(playerOptionButton => {
                playerOptionButton.addEventListener('click', function () {
                    updateMovesLeft(); //updates the count of moves left

                    //updating the nr of moves and give the computer's choice
                    const choiceNumber = Math.floor(Math.random() * 3);
                    const computerChoice = computerOptions[choiceNumber];

                    //determining the game winner in game over
                    winner(this.innerText.toLowerCase(), computerChoice);
                    if (moves === 10) {
                        gameOver(playerOptions);
                    }
                });
            });
        };

        //determining the winner
        const winner = (player, computer) => {
            const result = document.querySelector('.result');
            const playerScoreBoard = document.querySelector('.p-count');
            const computerScoreBoard = document.querySelector('.c-count');
            const playerwinSound = document.getElementById('winSound'); // Get the audio element

            // checking for tie
            if (player === computer) {
                result.textContent = 'It\'s a Tie!';
            } else {
                // checking for player win and score update
                const playerWinsFlag = playerWins(player, computer);
                result.textContent = playerWinsFlag ? 'You Won!' : 'Computer Won!';
                updateScore(playerWinsFlag, playerScoreBoard, computerScoreBoard);
                //get a sound effect each time the computer wins during the game
                if (!playerWinsFlag && moves < 10) {
                    computerWinSound.play()
                }
            }
        };

        //function checking if the player wins
        const playerWins = (player, computer) => {
            return (
                (player === 'rock' && computer === 'scissors') ||
                (player === 'paper' && computer === 'rock') ||
                (player === 'scissors' && computer === 'paper')
            );
        };

        //updating the score
        const updateScore = (playerWins, playerScoreBoard, computerScoreBoard) => {
            if (playerWins) {
                playerScore++;
            } else {
                computerScore++;
            }
            //updating the displayed scores
            playerScoreBoard.textContent = playerScore;
            computerScoreBoard.textContent = computerScore;
        };

        //game over function
        const gameOver = (playerOptions) => {
            const chooseMove = document.querySelector('.move');
            const result = document.querySelector('.result');
            const reloadBtn = document.querySelector('.reload');

            //hiding the player button from the UI
            playerOptions.forEach(playerOptionButton => {
                playerOptionButton.style.display = 'none';
            });

            //updating game UI
            chooseMove.innerText = 'Game Over!';
            document.querySelector('.movesleft').style.display = 'none';

            //displaying result messages depending on the situation
            if (playerScore > computerScore) {
                result.style.fontSize = '1.7rem';
                result.innerText = 'Congratulations! You actually beat the computer!';
                result.style.color = '#308D46';
                playerWinSound.play();
            } else if (playerScore < computerScore) {
                result.style.fontSize = '1.7rem';
                result.innerText = 'No way you lost against a robot....';
                result.style.color = 'red';
                playerLoseSound.play();
            } else {
                result.style.fontSize = '1.7rem';
                result.innerText = 'Did you really tie with a computer...?';
                result.style.color = 'grey';
                tieSound.play();
            }

            //display reload button
            reloadBtn.innerText = 'Restart';
            reloadBtn.style.display = 'flex';
            reloadBtn.addEventListener('click', () => {
                window.location.reload(); //reload game when the btn is clicked
            });
        };

        playGame(); // start the game
    };

    game(); //call game function when DOM is fully loaded
});