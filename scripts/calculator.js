
var displayOutput = "";

var currentValue = "";
var currentTotal = 0;

document.addEventListener("DOMContentLoaded", startCalc);

function startCalc() {

    addNumberButtonEvents();

    addDecimalButtonEvent();

    addPercentButtonEvent();

    addOperationButtonEvent();

    addClearButtonEvent();
}

function updateDisplay() {
    document.getElementById("numDisplay").innerHTML = displayOutput;
}

function appendDigit(evt) {
    let newDigit = evt.target.attributes["data-id"].value;

    currentValue += newDigit;

    displayOutput = currentValue;

    currentValue = "" + parseFloat(currentValue);

    updateDisplay();
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






function addNumberButtonEvents() {
    // get array of number elements
    let numbersButtonList = Array.from(document.getElementsByClassName("digit"));
    numbersButtonList.forEach(function (btn) {
        btn.addEventListener('click', appendDigit);
    }
    )
}



function addDecimalButtonEvent() {

}

function addPercentButtonEvent() {
}

function addOperationButtonEvent() {

}

function addClearButtonEvent() {
}


