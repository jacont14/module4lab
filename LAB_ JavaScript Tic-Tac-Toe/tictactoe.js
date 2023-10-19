let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
	// TODO: Complete the function
	// 
	
	// Use clearTimeout() to clear the computer's move timeout and then set computerMoveTimeout back to 0.
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;

	// Loop through all game board buttons and set the inner HTML of each to an empty string. Also remove the class name and disabled attribute. The disabled attribute prevents the user from clicking the button, but all the buttons should be clickable when starting a new game.
	const buttons = getGameBoardButtons ();
	for(let button of buttons){
		button.innerHTML = "";
		button.removeAttribute("class");
		button.disabled = false;
	}

	// Allow the player to take a turn by setting playerTurn to true.
	playerTurn = true;
	

	// Set the text of the turn information paragraph to "Your turn".
	document.getElementById("turnInfo").innerText = "Your turn";
}

function boardButtonClicked(button) {
	// TODO: Complete the function

	// If playerTurn is true:
	if(playerTurn){
		button.innerHTML = "X"
		button.classList.add("x");
		button.disabled = true
		switchTurn();
	}

	// Set the button's inner HTML to "X".

	// Add the "x" class to the button.

	// Set the button's disabled attribute to true so the button cannot be clicked again.

	// Call switchTurn() so the computer can take a turn.
}

function switchTurn() {
	// TODO: Complete the function
	// Call checkForWinner() to determine the game's status.
	let status = checkForWinner();
	// If more moves are left, do the following:
	// you can use this comparison to tell you whether or not there are moves left:
	 if(status == gameStatus.MORE_MOVES_LEFT){
		if(playerTurn){
			computerMoveTimeout = setTimeout(()=>{
				makeComputerMove();
			},1000);
		}
		playerTurn = !playerTurn;
		if(playerTurn){
			document.getElementById("turnInfo").innerHTML = "Your turn";
		}else{
			document.getElementById("turnInfo").innerHTML = "Computer's turn";
		}
	 }

	// If switching from the player's turn to the computer's turn, use setTimeout() to call makeComputerMove() after 1 second (1000 milliseconds). Assign the return value of setTimeout() to computerMoveTimeout. The timeout simulates the computer "thinking", and prevents the nearly-instant response to each player move that would occur from a direct call to makeComputerMove().
	// Toggle playerTurn's value from false to true or from true to false.
	// Set the turn information paragraph's text content to "Your turn" if playerTurn is true, or "Computer's turn" if playerTurn is false.
	

	// In the case of a winner or a draw game, do the following:
else {
	playerTurn = false
	if(status == gameStatus.HUMAN_WINS){
	document.getElementById("turnInfo").innerHTML = "You win!";
	}else if(status == gameStatus.COMPUTER_WINS){
	document.getElementById("turnInfo").innerHTML = "Computer wins!";
	}else if(status == gameStatus.DRAW_GAME){
		document.getElementById("turnInfo").innerHTML = "Draw game";
	}
}
	// Set playerTurn to false to prevent the user from being able to place an X after the game is over.
	// If the human has won, display the text "You win!" in the turn info paragraph.
	// you can use this comparison to tell that the human won:
	// status == gameStatus.HUMAN_WINS
	
	// If the computer has won, display the text "Computer wins!" in the turn info paragraph.
	// you can use this comparison to tell that the computer won:
	// status == gameStatus.COMPUTER_WINS


	// If the game is a draw, display the text "Draw game" in the turn info paragraph.
	// you can use this comparison to tell that there is a draw:
	// status == gameStatus.DRAW_GAME
}

// I have included the code for this function for you as some of these concepts are not covered until later in the course
function makeComputerMove() {
	// Find indices of available buttons
	const buttons = getGameBoardButtons();
	let indices = [];
	buttons.forEach((button, i) => {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			indices.push(i);
		}
	});

	// If an index is available, pick randomly
	if (indices.length > 0) {
		const index = indices[Math.floor(Math.random() * indices.length)];
		buttons[index].innerHTML = "O";
		buttons[index].classList.add("o");

		// Don't allow user to click this button
		buttons[index].disabled = true;

		// Switch turn back to player
		switchTurn();
	}
}