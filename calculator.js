
var displayOutput = "";

var currentValue = "";
var currentTotal = 0;

document.addEventListener("DOMContentLoaded",startCalc);

function startCalc(){

    addNumberButtonEvents();

    addDecimalButtonEvent();

    addPercentButtonEvent();

    addOperationButtonEvent();

    addClearButtonEvent();
}

function updateDisplay(){
    document.getElementById("numDisplay").innerHTML = displayOutput;
}

function appendDigit(newDigit){

    currentValue += newDigit;

    displayOutput = currentValue;

    currentValue = "" + parseFloat(currentValue);
    
    updateDisplay();
}

function equate(){

    //TODO ADD ALTERNATE OPERATORS = - .....

    if(currentValue !== ""){
        currentTotal += parseFloat(currentValue);
    }

    currentValue = "";

    displayOutput = "" + currentTotal;
    
    updateDisplay();
}






function addNumberButtonEvents(){
    let numbersButtonList = document.getElementsByClassName("digit");
}


function addDecimalButtonEvent(){
}

function addPercentButtonEvent(){
}

function addOperationButtonEvent(){
    
}

function addClearButtonEvent(){
}


