let newPlayer = (symbol, name, computer) => {

    let getSymbol = () => symbol;
    let getName = () => name;
    let getIfComputer = () => computer;

    return {
        getSymbol,
        getName,
        getIfComputer
    }

};

const gameboard = (() => {

    let board = [];
    let gridContainer = document.querySelector(".gameboard");

    let playerO = newPlayer("O", "Benjamin", false);
    let playerX = newPlayer("X", "AI", true);
    let currentPlayer = playerO;

    let initializeArray = () => {

        for(let i=0; i<9; i++){
            board[i] = undefined;
        }

    }

    let initializeBoard = () => {

        for(let i=0; i<9; i++){
            let block = document.createElement("div");

            block.classList.add("block");
            block.setAttribute("position", i);

            block.addEventListener("click", () => {

                if(block.textContent == ""){
                    gameLogic.appendSymbol(i, board, currentPlayer);
                    changeTurn();                   
                }
            });
            gridContainer.appendChild(block);
        }

        let resetButton = document.querySelector("#reset");
        resetButton.addEventListener("click", clearBoard);

    }
    

    let changeTurn = () => {
        if(currentPlayer == playerO){
            currentPlayer = playerX;
        }else if(currentPlayer == playerX){
            currentPlayer = playerO;
        }
    }

    let drawSymbol = (position, currentPlayer) => {
        let currentBlock = gridContainer.querySelector(`[position='${position}']`);
        currentBlock.textContent = currentPlayer.getSymbol();
    }

    let clearBoard = () => {
        let blocks = gridContainer.querySelectorAll(".block");

        blocks.forEach( block => {
            block.textContent = undefined;
        })

        initializeArray();
        gameLogic.setRoundEnded(false);
    }

    return {
        initializeArray,
        initializeBoard,
        drawSymbol,
        clearBoard,
        changeTurn
    }

})();

const gameLogic = (() => {

    let roundEnded = false;

    const appendSymbol = (position, board, currentPlayer) => {
        if(!roundEnded) {
            if(currentPlayer.getIfComputer() === true){
                let pos = board.indexOf(undefined);
                console.log(pos);
                board[pos] = currentPlayer.getSymbol;
                gameStatusAndDrawSymbol(board, currentPlayer, pos);
            }else{
                board[position] = currentPlayer.getSymbol();
                gameStatusAndDrawSymbol(board, currentPlayer, position);
            }
        }
    }

    const checkIfDraw = (board) => {
        if(board.includes(undefined)){
            
        }else{
            roundEnded = true;
            console.log("Tie!");
            return true;
        }
    };

    const checkForWinner = (board, currentPlayer) => {

        if((board[0] === currentPlayer.getSymbol()) &&
           (board[1] === currentPlayer.getSymbol()) && 
           (board[2] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[3] === currentPlayer.getSymbol()) &&
           (board[4] === currentPlayer.getSymbol()) && 
           (board[5] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[6] === currentPlayer.getSymbol()) &&
           (board[7] === currentPlayer.getSymbol()) && 
           (board[8] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[0] === currentPlayer.getSymbol()) &&
           (board[4] === currentPlayer.getSymbol()) && 
           (board[8] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[2] === currentPlayer.getSymbol()) &&
           (board[4] === currentPlayer.getSymbol()) && 
           (board[6] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[0] === currentPlayer.getSymbol()) &&
           (board[3] === currentPlayer.getSymbol()) && 
           (board[6] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[1] === currentPlayer.getSymbol()) &&
           (board[4] === currentPlayer.getSymbol()) && 
           (board[7] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

        if((board[2] === currentPlayer.getSymbol()) &&
           (board[5] === currentPlayer.getSymbol()) && 
           (board[8] === currentPlayer.getSymbol())){
            console.log(currentPlayer.getSymbol() + " wins!");
            roundEnded = true;
        }

    };

    const setRoundEnded = (value) => roundEnded = value;

    const gameStatusAndDrawSymbol = (board, currentPlayer, position) =>{
        checkForWinner(board, currentPlayer);
        checkIfDraw(board);
        gameboard.drawSymbol(position, currentPlayer);
    };

   
    return {
        appendSymbol,
        setRoundEnded
    }
    

})();


gameboard.initializeArray();
gameboard.initializeBoard();