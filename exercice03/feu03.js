/* Créez un programme qui trouve et affiche la solution d’un Sudoku.


Exemples d’utilisation :
$> cat s.txt
1957842..
3.6529147
4721.3985
637852419
8596.1732
214397658
92.418576
5.8976321
7612358.4

$> ruby exo.rb s.txt
195784263
386529147
472163985
637852419
859641732
214397658
923418576
548976321
761235894

Afficher error et quitter le programme en cas de problèmes d’arguments.*/

const fs = require("fs");

function readSudokuFromFile(filename) {
  try {
    const sudokuContent = fs.readFileSync(filename, "utf-8");
    const sudokuLines = sudokuContent.split(/\r?\n/);
    return sudokuLines.map((line) => line.split(""));
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la lecture du fichier :",
      err
    );
    return null;
  }
}

function solveSudoku(board) {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    // Toutes les cases sont remplies, le Sudoku est résolu.
    return true;
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true; // Sudoku résolu
      }

      // Si ce chiffre ne mène pas à une solution, annuler le coup
      board[row][col] = ".";
    }
  }

  return false; // Aucune solution trouvée à partir de cet état
}

function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        return [row, col];
      }
    }
  }
  return null; // Toutes les cases sont remplies
}

function isValidMove(board, row, col, num) {
  // Vérifier que num est un chiffre valide de 1 à 9
  if (num < 1 || num > 9) {
    return false;
  }

  // Vérifier la ligne, la colonne et le bloc 3x3
  return (
    isValidInRow(board, row, num) &&
    isValidInCol(board, col, num) &&
    isValidInBox(board, row - (row % 3), col - (col % 3), num)
  );
}

function isValidInRow(board, row, num) {
  return !board[row].includes(num);
}

function isValidInCol(board, col, num) {
  for (let row = 0; row < 9; row++) {
    if (board[row][col] === num) {
      return false;
    }
  }
  return true;
}

function isValidInBox(board, startRow, startCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row + startRow][col + startCol] === num) {
        return false;
      }
    }
  }
  return true;
}

function printSudoku(board) {
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log("-".repeat(21)); // Ligne horizontale de séparation
    }
    let rowStr = "";
    for (let j = 0; j < 9; j++) {
      if (j % 3 === 0 && j !== 0) {
        rowStr += "| "; // Séparateur vertical
      }
      // Utilisez un espace pour les cases vides représentées par des "."
      rowStr += board[i][j] + " ";
    }
    console.log(rowStr);
  }
}

// Charger le Sudoku depuis le fichier
const sudokuArray = readSudokuFromFile("sudoku.txt");

if (sudokuArray) {
  // Exécuter la résolution
  if (solveSudoku(sudokuArray)) {
    console.log("Sudoku résolu :");
    // Afficher la solution avec la grille
    printSudoku(sudokuArray);
  } else {
    console.log("Aucune solution trouvée pour ce Sudoku.");
  }
}
