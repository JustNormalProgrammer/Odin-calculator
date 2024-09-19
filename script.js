const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const numbers = "0123456789";
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');


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

// Resets helper values
function resetValues() {
    isCommaLast = false;
    isOperatorLast = false; 
    idxOfOperatorInEquation = 0;
}
function displayOperator(opBtn) {
    let value = opBtn.textContent;
    switch (value) {
        case "C":
            // Reset everything
            result.textContent = '';
            isCommaInNumber = false;
            resetValues();
            break;
        case "⌫":
            // Check if special character is last
            if (isCommaLast) isCommaLast = false;
            if (isOperatorLast) {
                isOperatorLast = false;
                idxOfOperatorInEquation = 0;
            }
            result.textContent = result.textContent.slice(0, -1);
            break;
        case ".":
            // Check if "." is already in a number
            if ((isCommaLast || isCommaInNumber || isOperatorLast) || (num2!==null && num2 !== '')) break;
            result.textContent += ".";
            isCommaLast = true;
            isCommaInNumber = true;
            break;
            // Handle "=;+;-;*;/;%" operators
        default:
            // If an operator is last replace it with a new one
            if (isOperatorLast && value !== "=") {
                result.textContent = result.textContent.slice(0, -1) + value;
                break;
            }
            // Add "0" if operator was clicked right after the "." operator
            if (isCommaLast) result.textContent += "0";
            // Chceck if expression already has any operator: [=;+;-;*;/;%] 
            if (idxOfOperatorInEquation) {
                // If it does set num 2, slicing the result string from the idx of operator onwards
                num2 = parseFloat(result.textContent.slice(idxOfOperatorInEquation + 1));
                getResult(result.textContent.charAt(idxOfOperatorInEquation));
                // If "=" display evaluated value 
                if (value === "=") {
                    result.textContent = num1;
                    // Beacause evaluated value can contain a "." operator, we do no reset it.
                    resetValues();
                    break;
                } else {
                    // Evaluate pair of numbers and add following operator immediately
                    result.textContent = num1 + value;
                    isOperatorLast = true;
                    idxOfOperatorInEquation = result.textContent.length - 1;
                    break;
                }
            } else {
                // Save first number
                num1 = parseFloat(result.textContent);
            }
            // Save idx of operator, display the operator and prepare helper values for the next number
            if(value === "=" && idxOfOperatorInEquation === 0) break;
                idxOfOperatorInEquation = result.textContent.length;
                result.textContent += value;
                isCommaInNumber = false;
                isOperatorLast = true;
                break;
    }
}

// Display the number, reset helper values to prepare them for the next number
function displayNumber(nodeBtn) {
    console.log(nodeBtn.textContent.length)
    let value = nodeBtn.textContent;
    result.textContent += value;
    isOperatorLast = false;
    isCommaLast = false;
}
// Save evaluated value in num1 and set num2 to null
function getResult(operator) {
    switch (operator) {
        case "÷":
            num1 = parseFloat((num1 / num2).toFixed(6));
            num2 = null;
            break;
        case "×":
            num1 = parseFloat((num1 * num2).toFixed(6));
            num2 = null;
            break;
        case "−":
            num1 = parseFloat((num1 - num2).toFixed(6));
            num2 = null;
            break;
        case "+":
            num1 = parseFloat((num1 + num2).toFixed(6));
            num2 = null;
            break;
        case "%":
            num1 = parseFloat((num1 % num2).toFixed(6));
            num2 = null;
            break;
    }
    if(String(num1).includes(".")) {
        isCommaInNumber = true;
    } else {
        isCommaInNumber = false;
    }
}
