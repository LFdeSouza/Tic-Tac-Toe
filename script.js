const game = (() => {
  let currentTurn = "X";

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const swapTurns = () => {
    currentTurn = currentTurn === "X" ? "O" : "X";
  };

  const getTurn = () => {
    return currentTurn;
  };

  const checkWin = () => {
    for (const combination of winningCombinations) {
      if (
        square[combination[0]].classList.contains(currentTurn) &&
        square[combination[1]].classList.contains(currentTurn) &&
        square[combination[2]].classList.contains(currentTurn)
      ) {
        return true;
      }
    }
    return false;
  };

  const isTie = () => {
    return [...square].every(
      (cell) => cell.classList.contains("X") || cell.classList.contains("O")
    );
  };

  return { swapTurns, getTurn, checkWin, isTie };
})();

const displayChange = (() => {
  const addMark = (e, mark) => {
    e.target.textContent = mark;
    e.target.classList.add(mark);
  };

  const changePlayer = (playerText, mark) => {
    playerText.textContent = `Player ${mark}'s turn`;
  };

  const displayOverlay = (message) => {
    overlayMessage.textContent = message;
    overlay.style.display = "flex";
  };

  return { addMark, changePlayer, displayOverlay };
})();

// Get html elements
const playerMessage = document.querySelector(".message");
const square = document.querySelectorAll(".square");
const overlay = document.querySelector(".overlay");
const overlayMessage = document.querySelector(".overlay-message");
const resetButton = document.querySelector(".reset-button");

//Event: Handle board clicks
square.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  displayChange.addMark(e, game.getTurn());
  if (game.checkWin()) {
    const winnerMessage = `Player ${game.getTurn()} Wins!`;
    displayChange.displayOverlay(winnerMessage);
  } else if (game.isTie()) {
    const tieMessage = `It's a Tie!`;
    displayChange.displayOverlay(tieMessage);
  }
  game.swapTurns();
  displayChange.changePlayer(playerMessage, game.getTurn());
  //change player display
}

//Event: reset game
resetButton.addEventListener("click", resetGame);

function resetGame() {
  location.reload();
}
