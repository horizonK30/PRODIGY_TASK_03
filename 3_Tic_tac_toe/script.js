// Select elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const board = document.getElementById("board");
const twoPlayerModeButton = document.getElementById("twoPlayerMode");
const aiModeButton = document.getElementById("aiMode");

// Variables
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game
function initializeGame(mode) {
  board.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  twoPlayerModeButton.parentElement.classList.add("hidden");
  restartButton.addEventListener("click", restartGame);

  if (mode === "twoPlayer") {
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  } else if (mode === "ai") {
    cells.forEach((cell) => cell.addEventListener("click", handleCellClickAI));
    statusText.textContent = `Player X's turn`;
  }
}

// Handle cell click for two-player mode
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !isGameActive) return;

  updateCell(cell, index);
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = `It's a draw! 🤝`;
    isGameActive = false;
  } else {
    switchPlayer();
  }
}

// Handle cell click for AI mode
function handleCellClickAI(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !isGameActive) return;

  updateCell(cell, index);
  if (checkWinner()) {
    statusText.textContent = `Player X wins! 🎉`;
    isGameActive = false;
    return;
  } else if (!gameState.includes("")) {
    statusText.textContent = `It's a draw! 🤝`;
    isGameActive = false;
    return;
  }

  setTimeout(() => {
    aiMove();
    if (checkWinner()) {
      statusText.textContent = `AI wins! 🤖`;
      isGameActive = false;
    } else if (!gameState.includes("")) {
      statusText.textContent = `It's a draw! 🤝`;
      isGameActive = false;
    }
  }, 500);
}

// AI move logic
function aiMove() {
  const emptyCells = gameState
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameState[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
}

// Update the cell
function updateCell(cell, index) {
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Event Listeners for mode selection
twoPlayerModeButton.addEventListener("click", () =>
  initializeGame("twoPlayer")
);
aiModeButton.addEventListener("click", () => initializeGame("ai"));
