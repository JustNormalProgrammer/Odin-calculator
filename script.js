const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const numbers = "0123456789";
const numberButtons = [];
const operatorButtons = [];
Array.from(buttons).forEach(button => {
    if(numbers.includes(button.textContent)){
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
let idxOfOperatorInEquation = 0;
let num1 = '';
let num2 = '';

function displayOperator(opBtn){
    let value = opBtn.textContent;
    switch(value){
        case "C": 
            result.textContent = '';
            isCommaLast = false;
            isOperatorLast = false;
            idxOfOperatorInEquation = 0;
            break; 
        case "⌫":
            if(isCommaLast) isCommaLast = false;
            if(isOperatorLast) {
                isOperatorLast = false;
                idxOfOperatorInEquation = 0;
            }
            result.textContent = result.textContent.slice(0,-1);
            break;
        case ".":
            if(isCommaLast) break;
            if(isOperatorLast) break;
            result.textContent += ".";
            isCommaLast = true;
            break;
        default:
            if(isOperatorLast && value) {
                result.textContent = result.textContent.slice(0,-1) + value;
                break;
            }
            if(isCommaLast) break;
            if(idxOfOperatorInEquation) {
                num2 = parseFloat(result.textContent.slice(idxOfOperatorInEquation+1));
                getResult(result.textContent.charAt(idxOfOperatorInEquation));
                if(value === "=") {
                    result.textContent = num1;
                    break;
                }
                result.textContent = num1 + value;
                isOperatorLast = true;
                idxOfOperatorInEquation = result.textContent.length-1;
                console.log(idxOfOperatorInEquation+1)
                break;
            }else {
                num1 = parseFloat(result.textContent);
            }
            idxOfOperatorInEquation = result.textContent.length;
            result.textContent += value;
            isOperatorLast = true;
            break;
    }
}


function displayNumber(nodeBtn){
    let value = nodeBtn.textContent;
    isOperatorLast = false;
    result.textContent += value;
    isCommaLast = false;
}
function getResult(operator){
    switch(operator){
        case "÷":
            num1 = num1 / num2;
            num2 = '';
            break;
        case "×":
            num1 = num1 * num2;
            num2 = '';
            break;
        case "−":
            num1 = num1 - num2;
            num2 = '';
            break;
        case "+":
            num1 = num1 + num2;
            num2 = '';
            break;
        case "%":
            num1 = num1 % num2;
            num2 = '';
            break;
    }
}
function operate(num1, num2, operator){
    switch(operator){
        case "":break;
    }
}