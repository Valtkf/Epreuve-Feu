/*Créez un programme qui remplace les caractères vides par des caractères plein pour représenter le plus grand carré possible sur un plateau. Le plateau sera transmis dans un fichier. La première ligne du fichier contient les informations pour lire la carte : nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.


Exemples d’utilisation :
$> cat plateau
9.xo
...........................
....x......................
............x..............
...........................
....x......................
...............x...........
...........................
......x..............x.....
..x.......x................
$> ruby exo.rb plateau
.....ooooooo...............
....xooooooo...............
.....ooooooox..............
.....ooooooo...............
....xooooooo...............
.....ooooooo...x...........
.....ooooooo...............
......x..............x.....
..x.......x................

Vous devez gérer les potentiels problèmes d’arguments, de fichiers, ou de carte invalide.

Une carte est valide uniquement si : les lignes ont toute la même longueur, il y a au moins une ligne d’une case, les lignes sont séparées d’un retour à la ligne, les caractères présents dans la carte sont uniquement ceux de la première ligne

En cas de plusieurs solutions, le carré le plus en haut à gauche sera choisi.

Vous trouverez un générateur de plateau sur la feuille suivante.*/

const fs = require("fs");

// Vérifie si une case contient un caractère "vide"
function isVoid(char, voidChar) {
  return char === voidChar;
}

// Remplace les caractères vides par des caractères pleins pour former un carré
function fillSquare(board, startX, startY, size, fillChar) {
  for (let i = startY; i < startY + size; i++) {
    for (let j = startX; j < startX + size; j++) {
      board[i][j] = fillChar;
    }
  }
}

function findLargestSquare(board, voidChar, fillChar) {
  const numRows = board.length;
  const numCols = board[0].length;
  let maxSize = 0;
  let startX = 0;
  let startY = 0;

  // Parcourez chaque case pour trouver le plus grand carré possible
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (isVoid(board[i][j], voidChar)) {
        let size = 1;
        let canFill = true;

        // Vérifiez si un carré peut être créé à partir de cette case
        while (canFill && i + size < numRows && j + size < numCols) {
          for (let m = i; m <= i + size; m++) {
            if (!isVoid(board[m][j + size], voidChar)) {
              canFill = false;
              break;
            }
          }
          for (let n = j; n <= j + size; n++) {
            if (!isVoid(board[i + size][n], voidChar)) {
              canFill = false;
              break;
            }
          }

          if (canFill) {
            size++;
          }
        }

        // Si le carré est plus grand que le précédent, mettez à jour les informations
        if (size > maxSize) {
          maxSize = size;
          startX = j;
          startY = i;
        }
      }
    }
  }

  // Remplacez les caractères vides par les caractères pleins pour le plus grand carré trouvé
  if (maxSize > 0) {
    fillSquare(board, startX, startY, maxSize, fillChar);
  }
}

function readBoardFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.trim().split("\n");
    if (lines.length < 2) {
      throw new Error("Le fichier de carte est invalide.");
    }

    const [infoLine, ...boardLines] = lines;
    const [numRows, voidChar, obstacleChar, fillChar] = infoLine.split("");

    const board = boardLines.map((line) => line.split(""));
    return { numRows: parseInt(numRows), board, voidChar, fillChar };
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la lecture du fichier :",
      error.message
    );
    process.exit(1);
  }
}

function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: node script.js input_filename");
    process.exit(1);
  }

  const inputFilename = process.argv[2];
  `Lecture du fichier : ${inputFilename}`;

  const { numRows, board, voidChar, fillChar } =
    readBoardFromFile(inputFilename);
  `Nombre de lignes : ${numRows}`;
  `Caractère vide : ${voidChar}`;
  `Caractère plein : ${fillChar}`;

  findLargestSquare(board, voidChar, fillChar);

  // Affiche le plateau avec le plus grand carré rempli
  for (let i = 0; i < numRows; i++) {
    console.log(board[i].join(""));
  }
}

main();
