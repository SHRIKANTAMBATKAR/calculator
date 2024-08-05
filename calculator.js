document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let displayValue = '';
    let operator = '';
    let firstOperand = null;
    let secondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (!isNaN(value) || value === '.') {
                if (secondOperand) {
                    displayValue = value;
                    secondOperand = false;
                } else {
                    displayValue += value;
                }
                display.value = displayValue;
            } else if (value === 'AC') {
                displayValue = '';
                display.value = '0';
                operator = '';
                firstOperand = null;
                secondOperand = false;
            } else if (value === 'DEL') {
                displayValue = displayValue.slice(0, -1);
                display.value = displayValue || '0';
            } else if (value === '=') {
                if (firstOperand !== null && operator !== '') {
                    displayValue = calculate(firstOperand, parseFloat(displayValue), operator).toString();
                    display.value = displayValue;
                    firstOperand = null;
                    operator = '';
                    secondOperand = false;
                }
            } else {
                if (firstOperand === null) {
                    firstOperand = parseFloat(displayValue);
                } else if (operator) {
                    displayValue = calculate(firstOperand, parseFloat(displayValue), operator).toString();
                    display.value = displayValue;
                    firstOperand = parseFloat(displayValue);
                }
                operator = value;
                secondOperand = true;
            }
        });
    });

    function calculate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case 'x':
                return first * second;
            case '÷':
                return first / second;
            case '%':
                return first % second;
            default:
                return second;
        }
    }
});
