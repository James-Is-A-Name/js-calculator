
var displayOutput;

var currentValue = "";
var currentTotal = 0;
var nextOperation = "+";

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

function updateDisplay() {
    document.getElementById("numDisplay").innerHTML = displayOutput;
}

function appendDigit(evt) {
    let newDigit = evt.target.attributes["data-id"].value;

    currentValue += newDigit;

    displayOutput = currentValue;

    // currentValue = "" + parseFloat(currentValue);

    updateDisplay();
}

function addDecimal() {
    // ensure not already a decimal in current number string
    if (currentValue.indexOf('.') < 0) {
        // add "." to currentValue string
        currentValue += ".";
        displayOutput = currentValue;
        updateDisplay();
    }
}

function equate() {

    //TODO ADD ALTERNATE OPERATORS = - .....

    if (currentValue !== "") {
        currentTotal += parseFloat(currentValue);
    }

    currentValue = "";

    displayOutput = "" + currentTotal;

    updateDisplay();
}


function invokePercent() {
    // check if currentvalue is NaN ("" or ".")
    // if so, 
    if (!isNaN(parseFloat(currentValue))) {
        currentValue = parseFloat(currentValue) / 100 * currentTotal;
        displayOutput = currentValue;
        updateDisplay();
    }
}

function setNextOperation(evt) {
    equate();
    nextOperation = evt.target.attributes["data-id"].value;
}

function clearValues() {
    currentTotal = 0;
    currentValue = "";
    displayOutput = 0;
    nextOperation = "+";
    updateDisplay();

}


