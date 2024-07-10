function GameBoard() {
    let board = [
        '0',
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'
    ];

    function getBoard() { // create a function to get the most current version of the array
        return board;
    }

    function dropToken(chosenCell, activePlayerToken) {
        board = board.map(ele => (ele === chosenCell) ? activePlayerToken : ele);
    }

    function printBoard() {
        console.log(board[1], '·', board[2], '·', board[3]);
        console.log(board[4], '·', board[5], '·', board[6]);
        console.log(board[7], '·', board[8], '·', board[9]);
    }

    return { getBoard, dropToken, printBoard };
}



function GameController() {
    const board = GameBoard();

    const players = [
        { name: 'Player X', token: 'X' },
        { name: 'Player O', token: 'O' }
    ];

    let activePlayer = players[0];

    function switchPlayer() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    function getActivePlayer() { // create a function to get the most current active player
        return activePlayer;
    }

    function getWinner() {
        if (
            ((board.getBoard()[1] === activePlayer.token) &&
                (board.getBoard()[2] === activePlayer.token) &&
                (board.getBoard()[3] === activePlayer.token)) ||

            ((board.getBoard()[4] === activePlayer.token) &&
                (board.getBoard()[5] === activePlayer.token) &&
                (board.getBoard()[6] === activePlayer.token)) ||

            ((board.getBoard()[7] === activePlayer.token) &&
                (board.getBoard()[8] === activePlayer.token) &&
                (board.getBoard()[9] === activePlayer.token)) ||

            ((board.getBoard()[1] === activePlayer.token) &&
                (board.getBoard()[4] === activePlayer.token) &&
                (board.getBoard()[7] === activePlayer.token)) ||

            ((board.getBoard()[2] === activePlayer.token) &&
                (board.getBoard()[5] === activePlayer.token) &&
                (board.getBoard()[8] === activePlayer.token)) ||

            ((board.getBoard()[3] === activePlayer.token) &&
                (board.getBoard()[6] === activePlayer.token) &&
                (board.getBoard()[9] === activePlayer.token)) ||

            ((board.getBoard()[1] === activePlayer.token) &&
                (board.getBoard()[5] === activePlayer.token) &&
                (board.getBoard()[9] === activePlayer.token)) ||

            ((board.getBoard()[3] === activePlayer.token) &&
                (board.getBoard()[5] === activePlayer.token) &&
                (board.getBoard()[7] === activePlayer.token))
        ) { return true; }
        return false;
    }

    function isBoardFilled() {
        if (
            board.getBoard().includes('1') ||
            board.getBoard().includes('2') ||
            board.getBoard().includes('3') ||
            board.getBoard().includes('4') ||
            board.getBoard().includes('5') ||
            board.getBoard().includes('6') ||
            board.getBoard().includes('7') ||
            board.getBoard().includes('8') ||
            board.getBoard().includes('9')
        ) { return false; }
        return true;
    }

    function playRound(chosenCell) {
        board.dropToken(chosenCell, activePlayer.token);
        board.printBoard();
        if (getWinner()) {
            console.log(activePlayer.name + ' is the Winner!');
        } else {
            if (isBoardFilled()) {
                console.log('There is No Winner');
            } else {
                switchPlayer();
                console.log(activePlayer.name + "'s Turn");
            }
        }
    }

    // first time, print board to the console with a message
    board.printBoard();
    console.log(activePlayer.name + "'s Turn");

    return { getBoardNow: board.getBoard, getActivePlayer, playRound, getWinner, isBoardFilled };
}



function screenController() {
    const game = GameController();

    function getUserInput() {
        const chosenCell = prompt(game.getActivePlayer().name + "'s Turn");
        if (!chosenCell) { // escape or cancel to end the prompt
            return chosenCell;
        }
        if ((chosenCell >= 1) && (chosenCell <= 9)) { // if player's choice is between 1 and 9
            if (game.getBoardNow().includes(chosenCell)) { // if player's choice is available on the board
                game.playRound(chosenCell); // play the round, drop the token, print the latest board to the console with a message
                if (game.getWinner()) { // if there's a winner, confirm to restart the game
                    const confirmation = confirm('Restart the Game?');
                    if (confirmation) {
                        screenController();
                    }
                } else { // if there's no winner
                    if (game.isBoardFilled()) { // if the board filled, confirm to restart the game
                        const confirmation = confirm('There is No Winner. Restart the Game?');
                        if (confirmation) {
                            screenController();
                        }
                    } else { // if the board is not filled, start the next round
                        getUserInput();
                    }
                }
            } else { // invalid input, ask again
                getUserInput();
            }
        } else { // invalid input, ask again
            getUserInput();
        }
    }

    getUserInput();
};



screenController();