
startCalculator()

function startCalculator() {

    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => btn.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', registerKeyPress);

    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.display');

    buttons.forEach( button => {
        button.addEventListener("click", (e) => {
            const input = e.target.dataset.key;
            takeInput(input);
            console.log(operation)
        });
    })

    let operation = {}

    function takeInput(input) {
        
        if (input !== 'equals') {
            
            updateDisplay(display, input);

            updateOperation(input);

        } else if (input === 'equals') {

            operation.result = operate();

            display.textContent = Math.round(operation.result*100000000)/100000000;

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
        
        if (isOperator(input) || input === 'all-clear' || input === 'clear') {
            display.textContent = '';
        }
        // Check the input is parsable to an integer or is a decimal point
        else if (!isNaN(parseInt(input)) || input === '.') {

            // Make sure a decimal point hasn't already been inputted
            if ((display.textContent.match(/\./g) || []).length < 1 || input !== '.') {
                
                display.textContent += input;

            }
        } else if (input === 'minus') {
            display.textContent = toggleMinus(display.textContent);
        }
    }

    function updateOperation(input) {

        if (!('operator' in operation) && !isOperator(input) && input !== 'all-clear') {
            if (input !== 'clear') {
                operation.firstOperand = display.textContent;
            } else {
                delete operation.firstOperand;
            }
        } else if (isOperator(input)) {
            operation.operator = input;
        } else if (input === 'all-clear') {
            operation = {};
        } else {
            if (input !== 'clear') {
                operation.secondOperand = display.textContent;
            } else {
                delete operation.secondOperand;
            }
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

    function toggleMinus(operand) {
        if (operand[0] === '-') {
            return operand.slice(1);
        } else {
            return '-' + operand;
        }
    }

    function registerKeyPress(e) {
        let keyCode = e.keyCode;
        console.log(keyCode);
        let input = '';

        switch (keyCode) {
            case 48:
            case 96:
                input = '0';
                break;
            case 49:
            case 97:
                input = '1';
                break;
            case 50:
            case 98:
                input = '2';
                break;
            case 51:
            case 99:
                input = '3';
                break;
            case 52:
            case 100:
                input = '4';
                break;
            case 53:
            case 101:
                input = '5';
                break;
            case 54:
            case 102:
                input = '6';
                break;
            case 55:
            case 103:
                input = '7';
                break;
            case 56:
            case 104:
                input = '8';
                break;
            case 57:
            case 105:
                input = '9';
                break;
            case 57:
            case 105:
                input = '9';
                break;
            case 109:
                input = 'subtract';
                break;
            case 107:
                input = 'add';
                break;
            case 106:
                input = 'times';
                break;
            case 111:
            case 191:
                input = 'divide';
                break;
            case 189:
                input = 'minus';
                break;
            case 46:
                input = 'all-clear';
                break;
            case 8:
                input = 'clear';
                break;
            case 110:
            case 190:
                input = '.';
                break;
            case 13:
                input = 'equals';
                break;
        }

        const btn = document.querySelector(`button[data-key='${input}']`);
        btn.classList.add('pressed');
        takeInput(input);
    }

    function removeTransition(e) {
        //if (e.propertyName !== 'transform') return; // skip it if it's not a transition
            this.classList.remove('pressed');
      }

}
