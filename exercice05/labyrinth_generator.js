const fs = require("fs");
const process = require("process");

function generateLabyrinth(height, width, chars) {
  const entry = Math.floor(Math.random() * (width - 4)) + 2;
  const exit1 = Math.floor(Math.random() * (width - 4)) + 2;
  const exit2Side = Math.random() < 0.5 ? "left" : "right";
  const exit2 = Math.floor(Math.random() * (height - 2)) + 1;

  const labyrinth = [];

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      if (y === 0 && x === exit1) {
        row += chars[2];
      } else if (y === height - 1 && x === entry) {
        row += chars[3];
      } else if (
        (exit2Side === "left" && x === 0 && y === exit2) ||
        (exit2Side === "right" && x === width - 1 && y === exit2)
      ) {
        row += chars[4];
      } else if (1 <= y && y < height - 1 && 1 <= x && x < width - 1) {
        if (Math.random() > 0.2) {
          row += " ";
        } else {
          row += chars[0];
        }
      } else {
        row += chars[0];
      }
    }
    labyrinth.push(row);
  }

  return labyrinth;
}

if (process.argv.length < 5 || process.argv[4].length < 4) {
  console.log("params needed: height width characters");
} else {
  const height = parseInt(process.argv[2]);
  const width = parseInt(process.argv[3]);
  const chars = process.argv[4];

  const labyrinth = generateLabyrinth(height, width, chars);

  const content = `${height}x${width}${chars}\n${labyrinth.join("\n")}`;

  fs.writeFileSync("labyrinthe.map", content);
  console.log("Labyrinth created and saved as labyrinthe.map");
}
