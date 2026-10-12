let result = 0;
let input = 0;
let input1 = 0;
let oddeven = 0;
let calchistory= [];
let historytext = "";
let cleanInput = [];
let operations = [];

window.addEventListener("load", loadHistory);

function loadHistory()
{
    if (JSON.parse(localStorage.getItem("history")) != null)
    {
        calchistory = JSON.parse(localStorage.getItem("history"));    
        historytext = calchistory.join("\n");
        document.getElementById("calcHistory").innerText = historytext;
    }
    else
    {
        return;
    }

}

function calculate()
{
    tokenizer();
}

function tokenizer()
{   
    clearInput()
    let used = false;
    let y = 0;
    let currentNumber = "";
    read();
    for(let i = 0; i < input.length; i++)
    {
        if (used == false)
        {
            prepareInput(cleanInput, y);
        }
        console.log(input[i]);
        currentNumber = input[i]
        if (isNumber(currentNumber))
        {
            cleanInput[y] += currentNumber
            used = true; 
        }
        else if(isOperator(currentNumber))
        {
            cleanInput[y] = parseFloat(cleanInput[y])
            y++;
            prepareInput(cleanInput, y);
            cleanInput[y] = currentNumber
            y++;
            used = false;
        }
        else if(isDecimal(currentNumber))
        {
            if (currentNumber == ",")
            {
                currentNumber = "."
            }
            cleanInput[y] += currentNumber
            used = true;
        }
    }
    cleanInput[y] = parseFloat(cleanInput[y])
    console.log(cleanInput);
    evaluate()
}

function evaluate()
{
    let y = 0
    let x = 0
    let z = 0
    let used = false;
    let num1, num2 = 0;
    for(let i = 0; i < cleanInput.length; i++)
    {
        if(cleanInput[i] == "+")
        {
            y = i
            if (used == false)
            {
                y--
                result += cleanInput[y]
                used = true
                y++;
            }

            y++; 
            result += cleanInput[y]
        }
    }
    document.getElementById("result").innerText = `Result: ${result}`;
}

function prepareInput(array, i)
{
    array[i] = "";
}

function isNumber(isNum)
{
    if(isNum == "0" || isNum == "1" || isNum == "2" || isNum == "3" || isNum == "4" || isNum == "5"  || isNum == "6" || isNum == "7" || isNum == "8" || isNum == "9")
    {
        return true;
    }      
    else 
    {
        return false;
    }
}

function isOperator(isOpp)
{
    if(isOpp == "+" || isOpp == "-" || isOpp == "*" || isOpp == "/" || isOpp == "^")
    {
        return true;
    }      
    else 
    {
        return false;
    }
}

function isDecimal(isDec)
{
    if(isDec == "," || isDec == ".")
    {
        return true;
    }
    else
    {
        return false;
    }
}


function copyResult()
{
    navigator.clipboard.writeText(result);
    alert("Copiado!");
}

function copyHistory()
{
    let historytext = calchistory.join("\n");
    navigator.clipboard.writeText(historytext);
    alert("Copiado!");
}


function calcHistory(num1,operator,num2,res)
{
    calchistory.push(`${num1} ${operator} ${num2} = ${res}`);
    historytext = calchistory.join("\n");
    document.getElementById("calcHistory").innerText = historytext;
    localStorage.setItem("history", JSON.stringify(calchistory));
}

function read()
{
    input = document.getElementById("Input").value;
}

function converter()
{
    input = input.replace(",", ".");
    input2 = input2.replace(",", ".");
    input= Number.parseFloat(input);
    input2= Number.parseFloat(input2);
}

function readOdd()
{
    oddeven = document.getElementById("OddOrEven").value;
    oddeven = Number.parseFloat(oddeven);
}

function verify()
{
    if (isNaN(input) || isNaN(input2))
    {
        document.getElementById("result").innerText = "You forgot an value..";
        return false;
    }
    else
    {
        return true;
    }
}

function verifyOdd()
{
    if (isNaN(oddeven))
    {
        document.getElementById("result2").innerText = "You forgot the value..";
        return false;
    }
    else
    {
        return true;
    }
}

function clearAll()
{
    document.getElementById("result").innerText = "Result: 0";
    document.getElementById("Input").value = "";

    input = 0;
    result = 0;
}

function clearInput()
{
    cleanInput = [];
    result = 0;
}

function clearHistory()
{
    document.getElementById("calcHistory").innerText = "";
    calchistory=[];
    localStorage.removeItem("history");
}

function add()
{
    read();
    if (verify())
    {
        result= input1+ input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input," + ", input2, result);
    }
    else
    {
        return;
    }
}
function subtract()
{
    read();
    if (verify())
    {
        result=input - input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input," - ", input2, result);
    }
    else
    {
        return;
    }

}
function divide()
{
    read();
    if (verify())
    {
        if (input2 != 0)
        {
            result = input / input2;
            document.getElementById("result").innerText = `Result: ${result}`;
            calcHistory(input," / ", input2, result);
        }
        else
        {
            document.getElementById("result").innerText = "You can't divide by zero!";
        }
    }
}
function multiply()
{
    read();
    if (verify())
    {
        result = input * input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input," * ", input2, result);
    }
    else
    {
        return;
    }
}

function power()
{
    read();
    if (verify())
    {
        result = input ** input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input," ** ", input2, result);
    }
    else
    {
        return;
    }
}

function restDivision()
{
    read();
    if (verify())
    {
        if (input2 != 0)
        {
            result = input % input2;
            document.getElementById("result").innerText = `Result: ${result}`;
            calcHistory(input," mod ", input2, result);
        }
        else
        {
            document.getElementById("result").innerText = "You can't divide by zero!";
        }        

    }
    else
    {
        return;
    }
}



function oddOreven()
{
    readOdd();
    if (verifyOdd())
    {
        if (oddeven % 2 === 0) 
        {
            document.getElementById("result2").innerText = "Even Number!";
        }
        else 
        {
            document.getElementById("result2").innerText = "Odd Number!";
        }
    }
    else
    {
        return;
    }
    
}
