

function GameBoard() {
    let board = [
        '0',
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'
    ];

    function getBoard() {
        // create a function to get the most current version of the array
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

    function getActivePlayer() {
        // create a function to get the most current active player
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

    function playRound(chosenCell) {
        board.dropToken(chosenCell, activePlayer.token);
        if (getWinner()) {
            board.printBoard();
            console.log(activePlayer.name + ' is the Winner!');
        } else {
            console.log('I\'m here');
            switchPlayer();
            printNewRound();
        }
    }

    function printNewRound() {
        board.printBoard();
        console.log(activePlayer.name + "'s Turn");
    }

    printNewRound();

    const hello = 'huh';

    return { hello, getBoardNow: board.getBoard, getActivePlayer, playRound, getWinner };
}



function screenController() {
    const game = GameController();
    console.log(game.hello);


    function askForInput() {
        const chosenCell = prompt(game.getActivePlayer().name + "'s Turn");

        // escape or cancel to end the prompt
        if (!chosenCell) {
            return chosenCell;
        }

        // player's choice is between 1 and 9
        if ((chosenCell >= 1) && (chosenCell <= 9)) {
            // game board contains user's choice
            if (game.getBoardNow().includes(chosenCell)) {
                // play round
                game.playRound(chosenCell);
                // there's a winner
                if (game.getWinner()) {
                    const confirmation = confirm('Restart the Game?');
                    if (confirmation) {
                        screenController();
                    }
                } else {
                    // no winner, start next round
                    askForInput();
                }
            } else {
                // invalid input, ask again
                askForInput();
            }
        } else {
            // invalid input, ask again
            askForInput();
        }
    }

    askForInput();
};

screenController();

