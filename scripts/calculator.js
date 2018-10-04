var currentValue = "";
var currentTotal = 0;
var nextOperation = "+";

var currentEquation = [{operation:"+",value:0}];

document.addEventListener("DOMContentLoaded", startCalc);

function startCalc() {

    addNumberButtonEvents();

    addDecimalButtonEvent();

    addPercentButtonEvent();

    addOperationButtonEvent();

    addEqualsButtonEvent();

    addClearButtonEvent();
}

// Add event listeners


function addNumberButtonEvents() {
    // get array of number elements
    let numbersButtonList = Array.from(document.getElementsByClassName("digit"));
    numbersButtonList.forEach(function (btn) {
        btn.addEventListener('click', appendDigit);
    }
    )
}


function addDecimalButtonEvent() {
    let decimalButton = document.getElementById('buttonDecimal');
    decimalButton.addEventListener('click', addDecimal);
}

function addPercentButtonEvent() {
    let percentButton = document.getElementById('buttonPercent');
    percentButton.addEventListener('click', invokePercent);
}

function addOperationButtonEvent() {
    // get array of number elements
    let operationButtonList = Array.from(document.getElementsByClassName("operation"));
    operationButtonList.forEach(function (btn) {
        btn.addEventListener('click', setNextOperation);
    }
    )
}

function addEqualsButtonEvent() {
    let equalButton = document.getElementById('buttonEquals');
    equalButton.addEventListener('click', equate);
}


function addClearButtonEvent() {
    let clearButton = document.getElementById('buttonClear');
    clearButton.addEventListener('click', clearValues)
}



// main logic functions

function updateDisplay(displayValue) {
    document.getElementById("displayValue").innerHTML = displayValue;
}

function appendDigit(evt) {
    let newDigit = evt.target.attributes["data-id"].value;

    currentValue += newDigit;

    if(!isNaN(parseFloat(currentValue))){
        currentEquation[currentEquation.length-1].value = parseFloat(currentValue);
    }

    updateDisplay(currentValue);
}

function addDecimal() {
    // ensure not already a decimal in current number string
    if (currentValue.indexOf('.') < 0) {
        // add "." to currentValue string
        currentValue += ".";
        updateDisplay(currentValue);
    }
}

function equate() {

  // Check currentValue is able to be a number
    if (!isNaN(parseFloat(currentValue))) {
         switch (nextOperation){
            case "*":{
                currentTotal *= parseFloat(currentValue);
                break;
            }
            case "/":{
                currentTotal /= parseFloat(currentValue);
                break;
            }
            case "-":{
                currentTotal -= parseFloat(currentValue);
                break;
            }
            case "+":{
                currentTotal += parseFloat(currentValue);
                break;
            }
        }
    }

    currentValue = "";

    //may not need to ensure current total passed to displayOutput is a string
    //displayOutput = "" + currentTotal;

    updateDisplay(currentTotal);
}




function calculateLogically(operationArray){
    let newArray = operationArray.reduce( (equation,operation) => evaluateDivisonMultiplication(equation,operation) , []);
    return calculate(newArray);
}
function calculate(operationArray){
    let output = operationArray.reduce((total,x) => applyOperation(total,x.operation,x.value) , 0)
    return output;
}
function evaluateDivisonMultiplication(equation,segment){
    if(segment.operation === '*' ){
        let previousOperation = equation[equation.length - 1].operation;
        let previousValue= equation[equation.length - 1].value;

        //Arrays of objects point to the objects so you have to give it a new object not alter the object
        equation[equation.length - 1] = { operation:previousOperation, value:(previousValue * segment.value)};
    }
    else if(segment.operation === '/'){
        let previousOperation = equation[equation.length - 1].operation;
        let previousValue= equation[equation.length - 1].value;

        //Arrays of objects point to the objects so you have to give it a new object not alter the object
        equation[equation.length - 1] = { operation:previousOperation, value:(previousValue / segment.value)};
    }
    else{
        equation.push(segment)
    }
    return equation;
}
function applyOperation(total,operation,value){
    switch (operation){
        case "*":{
            total *= parseFloat(value);
            break;
        }
        case "/":{
            total /= parseFloat(value);
            break;
        }
        case "-":{
            total -= parseFloat(value);
            break;
        }
        default:{
            total += parseFloat(value);
        }
    }
    return total;
}
function equationAsString(equation){
    return equation.slice(1).reduce((output,x) => (output+" "+x.operation+" "+x.value) ,(""+equation[0].value));
}



function invokePercent() {
    // check if currentvalue is NaN ("" or ".")
    // if so, 
    if (!isNaN(parseFloat(currentValue))) {
        currentValue = parseFloat(currentValue) / 100 * currentTotal;
        updateDisplay(currentValue);
    }
}

function setNextOperation(evt) {
    equate();
    nextOperation = evt.target.attributes["data-id"].value;
    currentEquation.push({operation:nextOperation,value:0});
}

function clearValues() {
    currentTotal = 0;
    currentValue = "";
    nextOperation = "+";
    currentEquation = [{operation:"+",value:0}];
    updateDisplay(0);
}


