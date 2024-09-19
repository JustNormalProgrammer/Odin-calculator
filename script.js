const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const numbers = "0123456789";
const numberButtons = [];
const operatorButtons = [];
Array.from(buttons).forEach(button => {
    if (numbers.includes(button.textContent)) {
        numberButtons.push(button);
    } else {
        operatorButtons.push(button);
    }
});

numberButtons.forEach(numBtn => {
    numBtn.addEventListener('click', () => displayNumber(numBtn));
})
operatorButtons.forEach(opBtn => {
    opBtn.addEventListener('click', () => displayOperator(opBtn));
})

let isOperatorLast = false;
let isCommaLast = false;
let isCommaInNumber = false;
let idxOfOperatorInEquation = 0;
let num1 = '';
let num2 = '';

function displayOperator(opBtn) {
    let value = opBtn.textContent;
    switch (value) {
        case "C":
            result.textContent = '';
            isCommaLast = false;
            isOperatorLast = false;
            isCommaInNumber = false;
            idxOfOperatorInEquation = 0;
            break;
        case "⌫":
            if (isCommaLast) isCommaLast = false;
            if (isOperatorLast) {
                isOperatorLast = false;
                idxOfOperatorInEquation = 0;
            }
            result.textContent = result.textContent.slice(0, -1);
            break;
        case ".":
            if ((isCommaLast || isCommaInNumber || isOperatorLast) && num2!==null) break;
            result.textContent += ".";
            isCommaLast = true;
            isCommaInNumber = true;
            break;
        default:
            console.log(idxOfOperatorInEquation)
            if (isOperatorLast && value !== "=") {
                result.textContent = result.textContent.slice(0, -1) + value;
                break;
            }
            if (isCommaLast) result.textContent += "0";
            if (idxOfOperatorInEquation) {
                num2 = parseFloat(result.textContent.slice(idxOfOperatorInEquation + 1));
                getResult(result.textContent.charAt(idxOfOperatorInEquation));
                if (value === "=") {
                    result.textContent = num1;
                    isCommaLast = false;
                    isOperatorLast = false;
                    idxOfOperatorInEquation = 0;
                    break;
                } else {
                result.textContent = num1 + value;
                isOperatorLast = true;
                idxOfOperatorInEquation = result.textContent.length - 1;
                break;
                }
            } else {
                num1 = parseFloat(result.textContent);
            }
            if(value === "=" && idxOfOperatorInEquation === 0) break;
                idxOfOperatorInEquation = result.textContent.length;
                result.textContent += value;
                isCommaInNumber = false;
                isOperatorLast = true;
                break;
    }
}


function displayNumber(nodeBtn) {
    let value = nodeBtn.textContent;
    result.textContent += value;
    isOperatorLast = false;
    isCommaLast = false;
}
function getResult(operator) {
    switch (operator) {
        case "÷":
            num1 = num1 / num2;
            num2 = null;
            break;
        case "×":
            num1 = num1 * num2;
            num2 = null;
            break;
        case "−":
            num1 = num1 - num2;
            num2 = null;
            break;
        case "+":
            num1 = num1 + num2;
            num2 = null;
            break;
        case "%":
            num1 = num1 % num2;
            num2 = null;
            break;
    }
}
