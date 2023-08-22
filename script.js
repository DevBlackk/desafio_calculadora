const calculator = document.getElementById("calculator");
const keys = document.getElementById("calculator__keys");
const display = document.getElementById("calculator__display");

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        const createResultString = () => {
            // As variáveis necessárias são:
            // 2. displayedNum
            // 1. keyContent
            // 4. action
            // 3. previousKeyType
            if (!action) {
                return displayedNum === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ? keyContent
                : displayedNum + keyContent;
            }

            if (action === 'decimal') {
                if (!displayedNum.includes('.')) {
                    return displayedNum + '.';
                }
            }
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (
                firstValue && 
                operator &&
                previousKeyType !== '!oprator' && //error
                previousKeyType !== 'calculate'
                ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            }else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        if (action === 'decimal'){
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ) {
                display.textContent = '0'
            }
        
            calculator.dataset,previousKey = 'dicimal';
        }
        
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }else {
                key.textContent = 'AC';
            }

            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }
        
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=class=clear]');//error 
            clearButton.textContent = 'CE';
        }
        if (action === 'calculate'){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculator(firstValue, operator, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKey = 'calculate';
        }

        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)
            if (operator === 'add') return firstNum + secondNum
            if (operator === 'subtract') return firstNum - secondNum
            if (operator === 'multiply') return firstNum * secondNum
            if (operator === 'divide') return firstNum / secondNum
            }
        }

        Array.from(key.parentNode.children) //error 
        .forEach(k => k.classList.remove('is-depressed'))
    }

);


