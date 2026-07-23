let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression === '' || /[+\-*/%]$/.test(expression)) {
        return;
    }
    expression += op;
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    display.value = '';
}

function deleteLastChar() {
    expression = expression.toString().slice(0, -1);
    display.value = expression;
}

function calculate() {
    try {
        // Evaluate the expression
        let result = eval(expression);
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber(e.key);
    if (e.key === '+' || e.key === '-') appendOperator(e.key);
    if (e.key === '*') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === '%') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLastChar();
    }
    if (e.key === 'Escape') clearDisplay();
});