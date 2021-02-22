
const num1 = '10';
const num2 = '8';

divideSymbol = String.fromCharCode(247);
console.log(operate(num1, num2, divideSymbol));

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case String.fromCharCode(247):
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}
