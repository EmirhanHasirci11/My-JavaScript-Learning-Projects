const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
//Input kısmında gözüken kısmı güncellemek için
function updateDisplay() {
    display.value = displayValue;
}
//Butonlara tıklandığı zaman ne yapacağını belirleme kısmı
keys.addEventListener('click', function (e) {
    const element = e.target;

    let value = element.value
    if (!element.matches('button')) return;
    switch (value) {
        case '+':
        case '-':
        case '/':
        case '*':
        case '=':
            handleOperator(value)
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default: inputNumber(value)
    }
    updateDisplay()
})
//Eğer bir rakama tıklandıya yapılacak işlem
function inputNumber(num) {
    //eğer waitingForSecondValue true gelirse ekrandaki değeri yeni değer olarak değiştirir 
    if (waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false
    }
    else {

        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}
//Ondalıklı sayı atama kısmı
function inputDecimal() {
    if (!displayValue.includes('.')) {

        displayValue += '.'
    }
}
function clear() {
    displayValue = '0';
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return
    }
    if (firstValue === null) {
        firstValue = value;
    }
    else {
        const result = calculate(firstValue, value, operator)
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator
}
function calculate(first, second, operator) {
    switch (operator) {
        case '+': return first + second;
            break;
        case '-': return first - second;
            break;
        case '/': return first / second
            break;
        case '*': return first * second
            break;
        default: return second
    }
}