/*Créez un programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé.

Vous devez gérer les 5 opérateurs suivants : “+” pour l’addition, “-” pour la soustraction, “*” la multiplication, “/” la division et “%” le modulo.

Exemple d’utilisation :


$> ruby exo.rb “4 + 21 * (1 - 2 / 2) + 38”
42


Vous pouvez partir du principe que la chaîne de caractères donnée en argument sera valide.*/

function hasHigherPriority(operator1, operator2) {
  const priorities = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };
  return priorities[operator1] >= priorities[operator2];
}
function performOperation(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "%":
      return operand1 % operand2;
    default:
      throw new Error("Opérateur invalide");
  }
}
const evaluateExpression = (expressions) => {
  const expressionWithoutSpaces = expressions.join("").replace(/\s/g, "");
  const resultArray = expressionWithoutSpaces.match(
    /(-?\d+|\+|\*|\/|%|\(|\)|-)/g
  );

  const operands = [];
  const operators = [];

  for (const token of resultArray) {
    if (/[+\-*/%]/.test(token)) {
      operators.push(token); // Ajouter l'opérateur à la pile des opérateurs
    } else {
      operands.push(token); // Ajouter l'opérande à la pile des opérandes
    }
  }

  return { operators, operands };
};

const expressions = process.argv.slice(2);
const result = evaluateExpression(expressions);

console.log("Opérateurs trouvés :", result.operators);
console.log("Opérandes trouvées :", result.operands);
