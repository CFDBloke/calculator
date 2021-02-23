
startCalculator()

function startCalculator() {

    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.display');

    buttons.forEach( button => {
        button.addEventListener("click", (e) => {
            takeInput(e);
            console.log(operation)
        });
    })

    let operation = {}

    function takeInput(e) {
        
        const input = e.target.dataset.key;
        console.log(input);
        
        if (input !== 'equals') {
            
            updateDisplay(display, input);

            updateOperation(input);

        } else if (input === 'equals') {

            operation.result = operate();

            display.textContent = operation.result;

            let result = operation.result;

            operation = {};

            operation.firstOperand = result;

        }
    }


    function operate() {
        switch (operation.operator) {
            case 'add':
                return add(operation.firstOperand, operation.secondOperand);
            case 'subtract':
                return subtract(operation.firstOperand, operation.secondOperand);
            case 'times':
                return multiply(operation.firstOperand, operation.secondOperand);
            case String.fromCharCode(247):
                return divide(operation.firstOperand, operation.secondOperand);
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

    function updateDisplay(display, input) {
        
        if (isOperator(input) || input === 'all-clear') {
            display.textContent = '';
        }
        // Check the input is parsable to an integer or is a decimal point
        else if (!isNaN(parseInt(input)) || input === '.') {

            // Make sure a decimal point hasn't already been inputted
            if ((display.textContent.match(/\./g) || []).length < 1 || input !== '.') {
                
                display.textContent += input;

            }
        }
    }

    function updateOperation(input) {

        if (!('operator' in operation) && !isOperator(input) && input !== 'all-clear') {
            operation.firstOperand = display.textContent;
        } else if (isOperator(input)) {
            operation.operator = input;
        } else if (input === 'all-clear') {
            operation = {};
        } else
        {
            operation.secondOperand = display.textContent;
        }
    }

    function isOperator(input) {
        switch (input) {
            case 'times':
            case 'divide':
            case 'add':
            case 'subtract':
                return true;
            default:
                return false;
        }
    }

}
