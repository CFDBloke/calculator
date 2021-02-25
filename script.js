
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
        });
    })

    let operation = {};

    const operands = {
        one: 'first',
        two: 'second'
    }

    let activeOperand = operands.one;

    function takeInput(input) {

        const inputType = getInputType(input);

        switch (inputType) {
            case 'number':
                inputNumber(input);
                break;
            case 'operator':
                inputOperator(input);
                break;
            case 'minus':
                toggleMinus();
                break;
            case 'clear':
                clearOperand();
                break;
            case 'all-clear':
                clearOperation();
                break;
            default:
                checkOperation();
                break;
        }
    }

    function getInputType(input) {
        switch (input) {
            case 'add':
            case 'subtract':
            case 'times':
            case 'divide':
                return 'operator';
            case 'minus':
                return 'minus';
            case 'clear':
                return 'clear';
            case 'all-clear':
                return 'all-clear';
            case 'equals':
                return 'equals';
            default:
                return 'number';
        }
    }

    function inputNumber(input) {
        if (!isNaN(parseInt(input))) {
            if (activeOperand === 'first') {
                if ('firstOperand' in operation) {
                    operation.firstOperand += input;
                } else {
                    operation.firstOperand = input;
                }
                display.textContent = operation.firstOperand;
            } else {
                if ('secondOperand' in operation) {
                    operation.secondOperand += input;
                } else {
                    operation.secondOperand = input;
                }
                display.textContent = operation.secondOperand;
            }
        } else {
            if (activeOperand === 'first') {
                if(allowDecimal(operation.firstOperand)) {
                    if ('firstOperand' in operation) {
                        operation.firstOperand += input;
                    } else {
                        operation.firstOperand = '0' + input;
                    }
                    display.textContent = operation.firstOperand;
                }
            } else {
                if(allowDecimal(operation.secondOperand)) {
                    if ('secondOperand' in operation) {
                        operation.secondOperand += input;
                    } else {
                        operation.secondOperand = '0' + input;
                    }
                    display.textContent = operation.secondOperand;
                }
            }
        }

    }

    function inputOperator(input) {
        if (activeOperand === 'first') {
            operation.operator = input;
            activeOperand = operands.two;
            display.textContent = '';
        } else {
            operate(input);
        }
    }

    function allowDecimal(operandString) {
        
        if (operandString === undefined) return true;

        if(operandString.indexOf('.') === -1){
            return true;
        } else {
            return false;
        }
    }

    function clearOperand() {
        if (activeOperand === 'first') {
            delete operation.firstOperand;
            display.textContent = '';
        } else {
            delete operation.secondOperand;
            display.textContent = '';
        }
    }

    function clearOperation() {
        operation = {};
        display.textContent = '';
        activeOperand = operands.one;
    }

    function checkOperation() {
        if ('firstOperand' in operation && 'secondOperand' in operation && 'operator' in operation) {
            operate();
        }
    }

    function operate(input) {

        let result = 0;

        switch (operation.operator) {
            case 'add':
                result = add(operation.firstOperand, operation.secondOperand);
                break;
            case 'subtract':
                result = subtract(operation.firstOperand, operation.secondOperand);
                break;
            case 'times':
                result = multiply(operation.firstOperand, operation.secondOperand);
                break;
            case 'divide':
                result = divide(operation.firstOperand, operation.secondOperand);
                break;
        }

        display.textContent = result;

        operation = {};

        operation.firstOperand = result;

        activeOperand = operands.one;

        if(input !== undefined) {
            operation.operator = input;
            activeOperand = operands.two;
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

    function toggleMinus() {
        let operandToToggle = undefined;

        if (activeOperand === 'first') {
            operandToToggle = operation.firstOperand;
        } else {
            operandToToggle = operation.secondOperand;
        }
        
        if (operandToToggle === undefined) return;

        if (operandToToggle[0] === '-') {
            operandToToggle = operandToToggle.slice(1);
        } else {
            operandToToggle = '-' + operandToToggle;
        }

        if (activeOperand === 'first') {
            operation.firstOperand = operandToToggle;
            display.textContent = operation.firstOperand;
        } else {
            operation.secondOperand = operandToToggle;
            display.textContent = operation.secondOperand;
        }
    }

    function registerKeyPress(e) {
        let keyCode = e.keyCode;

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
        if (btn !== null) {
            btn.classList.add('pressed');
            takeInput(input);
        }
    }

    function removeTransition(e) {
            this.classList.remove('pressed');
      }

}
