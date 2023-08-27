/*Créez un programme qui trouve le plus court chemin entre l’entrée et la sortie d’un labyrinthe en évitant les obstacles.


Le labyrinthe est transmis en argument du programme. La première ligne du labyrinthe contient les informations pour lire la carte : LIGNESxCOLS, caractère plein, vide, chemin, entrée et sortie du labyrinthe. 


Le but du programme est de remplacer les caractères “vide” par des caractères “chemin” pour représenter le plus court chemin pour traverser le labyrinthe. Un déplacement ne peut se faire que vers le haut, le bas, la droite ou la gauche.

Exemples d’utilisation :
$> cat -e example.map
10x10* o12$
*****2****$
* *   ****$
*   **** *$
* ****   *$
*  *     2$
*  ** *  *$
*     * **$
***  **  *$
1     ****$
**********$

$> ruby exo.rb example.map
10x10* o12
*****2****
* *   **** 
*   **** *
* ****   * 
*  * oooo2
*  **o*  *
*  ooo* **
***o **  *
1ooo  ****
**********
=> SORTIE ATTEINTE EN 12 COUPS !


Vous devez gérer les erreurs / Vous trouverez un générateur de labyrinthe en annexe de cet exercice.*/

const fs = require("fs");
const path = require("path");
const readline = require("readline");

function readLines(filename) {
  const lines = fs.readFileSync(filename, "utf8").split("\n");
  return lines;
}

function createGraphFromLabyrinth(labyrinth) {
  const graph = {};
  const rows = labyrinth.length;
  const cols = labyrinth[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        labyrinth[row][col] === " " ||
        labyrinth[row][col] === "1" ||
        labyrinth[row][col] === "2"
      ) {
        const node = `${row},${col}`;
        graph[node] = [];

        const neighbors = [
          `${row - 1},${col}`,
          `${row + 1},${col}`,
          `${row},${col - 1}`,
          `${row},${col + 1}`,
        ];

        for (const neighbor of neighbors) {
          const [nRow, nCol] = neighbor.split(",").map(Number);
          if (
            nRow >= 0 &&
            nRow < rows &&
            nCol >= 0 &&
            nCol < cols &&
            (labyrinth[nRow][nCol] === " " ||
              labyrinth[nRow][nCol] === "1" ||
              labyrinth[nRow][nCol] === "2")
          ) {
            graph[node].push(neighbor);
          }
        }
      }
    }
  }

  return graph;
}

function manhattanDistance(currentNode, goalNode) {
  const [x1, y1] = currentNode.split(",").map(Number);
  const [x2, y2] = goalNode.split(",").map(Number);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function aStarAlgorithm(graph, startNode, goalNode, heuristicFunc) {
  const openSet = new PriorityQueue();
  openSet.enqueue(startNode, 0);

  const gCosts = {};
  const parents = {};

  for (const node in graph) {
    gCosts[node] = Infinity;
    parents[node] = null;
  }

  gCosts[startNode] = 0;

  while (!openSet.isEmpty()) {
    const currentNode = openSet.dequeue();

    if (currentNode === goalNode) {
      const path = [];
      let current = goalNode;
      while (current !== null) {
        path.unshift(current);
        current = parents[current];
      }
      return path;
    }

    for (const neighbor of graph[currentNode]) {
      const tentativeGCost = gCosts[currentNode] + 1;
      if (tentativeGCost < gCosts[neighbor]) {
        parents[neighbor] = currentNode;
        gCosts[neighbor] = tentativeGCost;
        const fCost = tentativeGCost + heuristicFunc(neighbor, goalNode);
        openSet.enqueue(neighbor, fCost);
      }
    }
  }

  return [];
}

function tracePathInLabyrinth(labyrinth, path) {
  const labyrinthCopy = labyrinth.map((row) => row.slice()); // Créez une copie profonde du labyrinthe

  for (let i = 1; i < path.length - 1; i++) {
    const [row, col] = path[i].split(",").map(Number);
    labyrinthCopy[row][col] = "o"; // Remplacez le caractère à la position (row, col) par "o"
  }

  // Transformez la matrice labyrinthCopy en une matrice de chaînes de caractères
  const labyrinthWithPath = labyrinthCopy.map((row) => row.join(""));

  return labyrinthWithPath;
}

function numberAttempts(labyrinthWithPath) {
  const countO = labyrinthWithPath.reduce(
    (total, row) => total + (row.split("o").length - 1),
    0
  );
  console.log("\x1b[32m%s\x1b[0m", `EXIT REACH IN ${countO} MOVES!`);
}

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().element;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.log("Error: Please provide a filename.");
    process.exit(1);
  }

  const filename = args[0];
  const lines = readLines(filename);

  const labyrinth = lines.slice(1).map((line) => line.split(""));

  const startExitPoints = findStartAndExit(labyrinth);
  const startNode = `${startExitPoints[0].row},${startExitPoints[0].col}`;
  const exitNode = `${startExitPoints[1].row},${startExitPoints[1].col}`;

  const graph = createGraphFromLabyrinth(labyrinth);
  const shortestPath = aStarAlgorithm(
    graph,
    startNode,
    exitNode,
    manhattanDistance
  );
  const labyrinthWithPath = tracePathInLabyrinth(labyrinth, shortestPath);

  labyrinthWithPath.forEach((row) => console.log(row));
  numberAttempts(labyrinthWithPath);
}

function findStartAndExit(labyrinth) {
  let entry = null;
  let exit = null;

  for (let row = 0; row < labyrinth.length; row++) {
    for (let col = 0; col < labyrinth[row].length; col++) {
      if (labyrinth[row][col] === "1") {
        entry = { row, col };
      } else if (labyrinth[row][col] === "2") {
        exit = { row, col };
      }
    }
  }

  if (entry === null || exit === null) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Error: Entry and/or exit not found in the labyrinth."
    );
    process.exit(1);
  }

  return [entry, exit];
}

main();
