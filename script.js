document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");
  const solveButton = document.getElementById("solve-button");
  const resultDiv = document.getElementById("result");

  // Generate the Sudoku grid
  for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 9; j++) {
          const cell = document.createElement("td");
          const input = document.createElement("input");
          input.maxLength = 1; // Limit input to one character
          input.placeholder = ".";
          cell.appendChild(input);
          row.appendChild(cell);
      }
      board.appendChild(row);
  }

  // Solve Sudoku function
  solveButton.addEventListener("click", () => {
      const sudoku = [];
      const inputs = document.querySelectorAll("input");
      for (let i = 0; i < 9; i++) {
          const row = [];
          for (let j = 0; j < 9; j++) {
              const value = inputs[i * 9 + j].value;
              row.push(value === "" ? "." : value);
          }
          sudoku.push(row);
      }

      if (solveSudoku(sudoku)) {
          resultDiv.innerHTML = "Sudoku solved!";
          displayBoard(sudoku);
      } else {
          resultDiv.innerHTML = "No solution exists.";
      }
  });

  // Sudoku solving algorithm
  function solveSudoku(board) {
      for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
              if (board[i][j] === '.') {
                  for (let num = 1; num <= 9; num++) {
                      const char = num.toString();
                      if (isValid(board, i, j, char)) {
                          board[i][j] = char;
                          if (solveSudoku(board)) {
                              return true;
                          }
                          board[i][j] = '.'; // Backtrack
                      }
                  }
                  return false; // No valid number found
              }
          }
      }
      return true; // Solved
  }

  function isValid(board, row, col, num) {
      for (let i = 0; i < 9; i++) {
          if (board[row][i] === num || board[i][col] === num || 
              board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
              return false;
          }
      }
      return true;
  }

  function displayBoard(board) {
      const inputs = document.querySelectorAll("input");
      for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
              inputs[i * 9 + j].value = board[i][j];
          }
      }
  }
});