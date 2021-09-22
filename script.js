const game = (() => {
  let xTurn = true;

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
    xTurn = xTurn ? false : true;
  };

  const isXturn = () => {
    return xTurn;
  };

  const gameOver = () => {
    //check if game is over
    return;
  };

  return { xTurn, swapTurns, isXturn, gameOver };
})();

// Get board squares and handle events
const square = document.querySelectorAll(".square");

square.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  console.log(game.xTurn);
  if (game.isXturn()) {
    e.target.textContent = "X";
  } else {
    e.target.textContent = "O";
  }
  game.swapTurns();
}
