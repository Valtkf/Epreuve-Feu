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
