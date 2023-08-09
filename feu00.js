/*Créez un programme qui affiche un rectangle dans le terminal.


Exemples d’utilisation :
$> python exo.py 5 3
o---o
|   |
o---o

$> python exo.py 5 1
o---o

$> python exo.py 1 1
o */

const showRectangle = (width, height) => {
  for (let i = 1; i <= height; i++) {
    let line = ""; // Initialisation de la ligne

    // Générer la première ligne du rectangle
    if (i === 1 || i === height) {
      line = "o";
      for (let j = 1; j <= width - 2; j++) {
        line += "-";
      }
      if (width > 1) {
        line += "o";
      }
    } else {
      // Générer les lignes verticales pour les autres lignes
      line = "|";
      for (let j = 1; j <= width - 2; j++) {
        line += " ";
      }
      if (width > 1) {
        line += "|";
      }
    }

    console.log(line);
  }
};

const width = parseInt(process.argv[2]);
const height = parseInt(process.argv[3]);

showRectangle(width, height);
