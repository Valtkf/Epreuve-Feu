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

/*Pour i allant de 1 à hauteur:
        Si i est égal à 1 OU i est égal à hauteur:
            Afficher "o" suivi de (largeur - 2) fois le caractère "-"
            Afficher "o"
        Sinon:
            Afficher "|"
            Afficher (largeur - 2) fois l'espace " "
            Afficher "|"
        Fin Si
        Aller à la ligne
    Fin Pour*/
const showRectangle = (width, height) => {
  for (let i = 1; i <= height; i++) {
    let line = ""; // Initialisation de la ligne

    // Générer la première ligne du rectangle
    if (i === 1 || i === height) {
      line = "o";
      for (let j = 1; j <= width - 2; j++) {
        line += "-";
      }
      line += "o";
    } else {
      // Générer les lignes verticales pour les autres lignes
      line = "|";
      for (let j = 1; j <= width - 2; j++) {
        line += " ";
      }
      line += "|";
    }

    console.log(line);
  }
};

const width = parseInt(process.argv[2]);
const height = parseInt(process.argv[3]);

if (width <= 2 || height <= 2) {
  console.error("Veuillez entrer des valeurs supérieures à 2");
} else {
  showRectangle(width, height);
}
