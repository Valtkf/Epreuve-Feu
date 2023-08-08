/*Créez un programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé.

Vous devez gérer les 5 opérateurs suivants : “+” pour l’addition, “-” pour la soustraction, “*” la multiplication, “/” la division et “%” le modulo.

Exemple d’utilisation :


$> ruby exo.rb “4 + 21 * (1 - 2 / 2) + 38”
42


Vous pouvez partir du principe que la chaîne de caractères donnée en argument sera valide.*/

const hasHigherPriority = (operator1, operator2) => {
  const priorities = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };
  return priorities[operator1] >= priorities[operator2];
};

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

const evaluateExpression = (expression) => {
  const resultArray = expression.match(/(-?\d+(\.\d+)?|[+\-*\/%()])/g);

  const tokens = [];

  for (const token of resultArray) {
    tokens.push(token);
  }

  const operands = [];
  const operators = [];

  for (let i = 0; i < tokens.length; i++) {
    const currentToken = tokens[i];

    if (/[+\-*\/%]/.test(currentToken)) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== "(" &&
        hasHigherPriority(operators[operators.length - 1], currentToken)
      ) {
        operands.push(operators.pop());
      }
      operators.push(currentToken);
    } else if (currentToken === "(") {
      operators.push(currentToken);
    } else if (currentToken === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        operands.push(operators.pop());
      }
      operators.pop();
    } else {
      operands.push(parseFloat(currentToken));
    }
  }

  while (operators.length > 0) {
    operands.push(operators.pop());
  }

  return operands;
};

const evaluateAndHandlePriority = (operands) => {
  const valueStack = [];

  for (let i = 0; i < operands.length; i++) {
    const currentElement = operands[i];

    if (typeof currentElement === "number") {
      valueStack.push(currentElement);
    } else if (
      typeof currentElement === "string" &&
      /[+\-*\/%]/.test(currentElement)
    ) {
      const operator = currentElement;
      const operand2 = valueStack.pop();
      const operand1 = valueStack.pop();
      const result = performOperation(operand1, operator, operand2);
      valueStack.push(result);
    }
  }

  return valueStack[0]; // Le résultat final se trouve au sommet de la pile
};
const expression = process.argv[2];

const result = evaluateExpression(expression);
const finalResult = evaluateAndHandlePriority(result, []);

console.log("Résultat final :", finalResult);
