/*eslint-env browser*/

var mean,
    max,
    min,
    median,
    range,
    values, //array to hold inputted digits
    valuesContainer = document.getElementById("myValues"), //section container for all outputted values
    valuesTitle = document.getElementById("valuesTitle"), //the top line on the results display
    myCalculatedValuesContainer = document.getElementById("myCalculatedValuesContainer"), //div container for all outputted values
    myIndividualValuesContainer = [document.getElementById("container1"), document.getElementById("container2"),
                                   document.getElementById("container3"), document.getElementById("container4"),
                                   document.getElementById("container5"), document.getElementById("container6"),
                                   document.getElementById("container7")]; //all  containers inside Values container

function bubbleSort(valuesArray) { //sorts integer array in ascending order
    "use strict";
    
    var length = valuesArray.length,
        i,
        j,
        temp;
    
    for (i = 0; i < length - 1; i += 1) {
        for (j = 0; j < length - i - 1; j += 1) { //scans array up to all unsorted values
            if (valuesArray[j] > valuesArray[j + 1]) { //swaps values when j-th value is greater than j + 1th values
                temp = valuesArray[j];
                valuesArray[j] = valuesArray[j + 1];
                valuesArray[j + 1] = temp;
            }
        }
    }
}

function getNumbers(stringInput) { //takes all the numbers from a string and puts them into an array
    "use strict";
    var length = stringInput.length,
        values = [],
        tempNumber = "",
        i, //counter
        hyphenCounter; //counter for negative numbers
    
    for (i = 0; i <= length - 1; i += 1) { //scan through string
        
        hyphenCounter = 0;
        
        if ((!isNaN(stringInput[i]) && stringInput[i] !== " ") || stringInput[i] === "-") { //if it is a number or negative sign
            
            if (stringInput[i] === "-") { //if negative sign, add and go to next character
                tempNumber += stringInput[i];
                hyphenCounter += 1;
                i += 1;
            }
           
            while (!isNaN(stringInput[i]) && stringInput[i] !== " ") { //add the number and all connected numbers to string
                tempNumber += stringInput[i];
                i += 1;
            }
            
            i -= 1; //move back counter 1 because for loop will also increment
            
            if (tempNumber.length >= 2 || (tempNumber.length === 1 && hyphenCounter === 0)) { //only add value if number is hyphen-digit or just digit but no hyphen
                values.push(parseInt(tempNumber, 10)); //append number to array
            }
            
            tempNumber = ""; //reset tempNumber
        }
    }
    
    return values;
}

function getMedian(valuesArray) { //finds median in an array of integers
    "use strict";
    var length = valuesArray.length,
        median,
        center;
    
    if (length % 2 === 0) { //length is even
        median = (valuesArray[length / 2] + valuesArray[length / 2 - 1]) / 2;
    } else { //if length is odd
        center = Math.floor(length / 2);
        median = valuesArray[center];
    }
    
    return median;
}

function getMean(valuesArray) { //finds mean in an array of integers
    "use strict";
    
    var length = valuesArray.length,
        mean,
        i,
        sum = 0;
    
    for (i = 0; i <= length - 1; i += 1) { //adds all values in valuesArray
        sum += valuesArray[i];
    }
    
    mean = sum / length;
    
    return mean;
}

function outputResults(isValuesArrayEmpty) {
    "use strict";
    
    var i;
    
    if (isValuesArrayEmpty) { //no numbers to output
        document.querySelector("#valuesTitle").innerHTML = "No numbers were entered";
        //value container formatting
        valuesContainer.classList.add('myValues'); //box containing results
        valuesTitle.classList.remove('myValuesTitle'); //removes "Values" title
        valuesTitle.classList.add('myEmptyValuesTitle'); //displays "No numbers were entered"
        myCalculatedValuesContainer.classList.remove('myCalculatedValues'); //removes spacing around empty values
        for (i = 1; i < 6; i += 1) { //when empty, these create extra space so they need to be removed
            myIndividualValuesContainer[i].classList.remove('col-lg-2');
        }
        myIndividualValuesContainer[0].classList.remove('col-lg-1');
        myIndividualValuesContainer[6].classList.remove('col-lg-1');
        //values
        document.querySelector("#meanValue").innerHTML = "";
        document.querySelector("#medianValue").innerHTML = "";
        document.querySelector("#minValue").innerHTML = "";
        document.querySelector("#maxValue").innerHTML = "";
        document.querySelector("#rangeValue").innerHTML = "";
        //headers
        document.querySelector("#meanHeader").innerHTML = "";
        document.querySelector("#medianHeader").innerHTML = "";
        document.querySelector("#minHeader").innerHTML = "";
        document.querySelector("#maxHeader").innerHTML = "";
        document.querySelector("#rangeHeader").innerHTML = "";
    } else {
        document.querySelector("#valuesTitle").innerHTML = "Values";
        //value container formatting
        valuesContainer.classList.add('myValues'); //box containing results
        valuesTitle.classList.add('myValuesTitle'); //displays "Values" as title
        valuesTitle.classList.remove('myEmptyValuesTitle'); //removes "No numbers were entered"
        myCalculatedValuesContainer.classList.add('myCalculatedValues'); //adds spacing around values
        for (i = 1; i < 6; i += 1) {
            myIndividualValuesContainer[i].classList.add('col-lg-2');
        }
        myIndividualValuesContainer[0].classList.add('col-lg-1');
        myIndividualValuesContainer[6].classList.add('col-lg-1');
        //values
        document.querySelector("#meanValue").innerHTML = mean.toFixed(2); //toFixed() removes trailing digits and returns as a string
        document.querySelector("#medianValue").innerHTML = median;
        document.querySelector("#minValue").innerHTML = min;
        document.querySelector("#maxValue").innerHTML = max;
        document.querySelector("#rangeValue").innerHTML = range;
        //headers
        document.querySelector("#meanHeader").innerHTML = "Mean:";
        document.querySelector("#medianHeader").innerHTML = "Median:";
        document.querySelector("#minHeader").innerHTML = "Min:";
        document.querySelector("#maxHeader").innerHTML = "Max:";
        document.querySelector("#rangeHeader").innerHTML = "Range:";
    }
}

function processNumbers() {
    "use strict";
    
    var myCalculator = document.querySelector("input"),
        stringValues = myCalculator.value,
        length; //length of array containing numbers
    
    values = getNumbers(stringValues); //getNumbers() takes the integers from input string and puts them into an array
    length = values.length;
    
    if (length > 0) { //if there are numbers entered
        //sort values
        bubbleSort(values);

        //setting max, min, median
        min = values[0];
        median = getMedian(values);
        max = values[length - 1];

        //Range finder
        range = max - min;

        //setting mean
        mean = getMean(values);
        
        outputResults(0);
    } else {
        outputResults(1);
    }
}

var button = document.querySelector("button");
button.addEventListener("click", processNumbers);