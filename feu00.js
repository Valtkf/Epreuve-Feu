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
const showRectangle = (width, hight) => {
  let line = "o";
  let column = "|";
  for (let i = 1; i <= width - 2; i++) {
    line += "-";
  }
  line += "o";
  console.log(line);
  for (let i = 0; i <= hight - 2; i++) {
    column += "|";
  }
  console.log(column);
};

const width = parseInt(process.argv[2]);
const hight = parseInt(process.argv[3]);

showRectangle(width, hight);
