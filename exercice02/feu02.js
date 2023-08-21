/*Créez un programme qui affiche la position de l’élément le plus en haut à gauche (dans l’ordre) d’une forme au sein d’un plateau.


Exemples d’utilisation :
$> cat board.txt
0000
1111
2331
$> cat to_find.txt
11
 1
$> cat unfindable.txt
00
00

$> ruby exo.rb board.txt to_find.txt
Trouvé !
Coordonnées : 2,1
----
--11
---1

$> ruby exo.rb board.txt unfindable.txt
Introuvable

Vous devez gérer les potentiels problèmes d’arguments et de lecture de fichiers.*/

const fs = require("fs");
let boardArray;
let shapeArray;

try {
  // Lire le contenu de board.txt de manière synchrone
  const boardContent = fs.readFileSync("board.txt", "utf-8");

  // Lire le contenu de to_find.txt de manière synchrone
  const shapeContent = fs.readFileSync("to_find.txt", "utf-8");

  // Diviser le contenu en lignes
  const boardLines = boardContent.split("\n");
  const shapeLines = shapeContent.split("\n");

  // Créer boardArray et shapeArray
  boardArray = boardLines.map((line) => line.split(""));
  shapeArray = shapeLines.map((line) => line.split(""));

  // Maintenant, vous avez boardArray et shapeArray prêts à être utilisés dans votre logique.
} catch (err) {
  console.error(
    "Une erreur s'est produite lors de la lecture des fichiers :",
    err
  );
}

// Logique pour trouver la forme dans la matrice
const isShapeFound = (boardRow, boardColumn) => {
  const [shapeHeight, shapeWidth] = [shapeArray.length, shapeArray[0].length];

  for (let i = 0; i < shapeHeight; i++) {
    for (let j = 0; j < shapeWidth; j++) {
      const shapeElement = shapeArray[i][j];
      const boardElement = boardArray[boardRow + i][boardColumn + j];

      // Comparer les éléments de la forme avec les éléments correspondants de la matrice
      if (shapeElement !== " " && shapeElement !== boardElement) {
        return false; // La forme n'a pas été trouvée à cette position
      }
    }
  }
  return true; // Tous les éléments de la forme correspondent à la matrice
};

const getShapePosition = () => {
  const boardHeight = boardArray ? boardArray.length : 0;
  const boardWidth = boardArray && boardArray[0] ? boardArray[0].length : 0;
  const shapeHeight = shapeArray ? shapeArray.length : 0;
  const shapeWidth = shapeArray && shapeArray[0] ? shapeArray[0].length : 0;

  for (let row = 0; row <= boardHeight - shapeHeight; row++) {
    for (let col = 0; col <= boardWidth - shapeWidth; col++) {
      if (isShapeFound(row, col)) {
        return [row, col]; // Retourne la position si la forme est trouvée
      }
    }
  }
  return null;
};

const getCoordinatesFirstElement = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === "1") {
        return [i, j];
      }
    }
  }
  return [-1, -1]; // Si aucun "1" n'est trouvé, retournez des coordonnées invalides.
};

const getShapeDrawing = (shapeCoordinates) => {
  if (!shapeCoordinates) {
    return "Introuvable";
  }

  const [row, col] = shapeCoordinates;

  // Créé une nouvelle matrice pour le dessin de la forme avec des tirets
  const shapeDrawing = Array.from({ length: boardArray.length }, () =>
    Array(boardArray[0].length).fill("-")
  );

  // Mettre en place les chiffres de la forme dans la nouvelle matrice
  for (let i = 0; i < shapeArray.length; i++) {
    for (let j = 0; j < shapeArray[0].length; j++) {
      if (shapeArray[i][j] === "1") {
        shapeDrawing[row + i][col + j] = "1";
      }
    }
  }

  // Formatter la sortie avec des tirets pour les autres éléments
  const formattedShape = shapeDrawing.map((row) => row.join("")).join("\n");

  return `Trouvé !
Coordonnées : ${col},${row}
${formattedShape}`;
};

// Logique pour vérifier et afficher les résultats
const position = getShapePosition();
const drawing = getShapeDrawing(position);
console.log(drawing);
