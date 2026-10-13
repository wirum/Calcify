let result = 0;
let click = 0
let input = 0;
let input1 = 0;
let oddeven = 0;
let calchistory= [];
let howTo=[];
let howToHistory = "";
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

function showMe()
{   
    if (click == 0)
    {
        document.getElementById("howTo").style.display = "block";
        click++
    }
    else
    {
        document.getElementById("howTo").style.display = "none";
        click = 0
    }
}

function steps(nums,res)
{
    howTo.push(`${nums} = ${res}`);
    howToHistory = howTo.join("\n");
    document.getElementById("howTo").innerText = howToHistory;
}

function calculate()
{
    read();

    if (verify() == true)
    {
        let originalInput = input;

        tokenizer();

        calcHistory(originalInput, result);

        document.getElementById("result").innerText = `Result: ${result}`;
        document.querySelector(".HowTo").style.display = "block";
    }
    else
    {
        document.getElementById("result").innerText = "You forgot the value..";
    }
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
    console.log("tokenizer:");
    console.log(cleanInput);
    let length = cleanInput.length
    length--
    length = length/2
    for(let i = 0; length > i; i++)
    {
        evaluate();
        steps(cleanInput.join(""), result)
    }
}

function evaluate()
{
    let y = 0
    let x = 0
    let z = 0
    let used = false;
    let num1, num2 = 0;
    /*let length = scan(cleanInput)
    //for(let i = 0; i < length.length; i++)
    {*/
        let operation = scan(cleanInput);
        console.log("scan:");
        console.log(operation);
        let pos = operation[2]
        pos--
        console.log(operation);
        if(operation[0] == 2)
        {
            if (operation[1][1] == "/")
            {
                result = operation[1][0] / operation[1][2]
            }
            else if(operation[1][1] == "*")
            {
                result = operation[1][0] * operation[1][2]
            }
            else
            {
                error();
            }
        }
        else if(operation[0] == 3)
        {
            if(operation[1][1] == "+")
            {
                result = operation[1][0] + operation[1][2]
            }
            else if(operation[1][1] == "-")
            {
                result = operation[1][0] - operation[1][2]
            }
            else
            {
                error();
            }
        }
        console.log("result:");
        console.log(result);
        getRidOfTs(cleanInput, pos, 3)

        console.log("depois do getRidOfTs:");
        console.log(cleanInput);

    //}
    
}

function getRidOfTs(array, start, quantity)
{
    // arremessa fora os 3 já calculados, chamados no evaluate depois do scan (ninguém gosta deles)
    let notaproblem = ""
    let problemtofix  = array
    let problem =  problemtofix.splice(start,quantity, result)
    notaproblem = problemtofix
    return notaproblem//anymore;
}

function scan(array)
{
    let found = false;
    for(let i = 0; i < array.length; i++)
    {
            if (array[i] == "*" || array[i] == "/")
            {
                //retorna prioridade 2, posição
                found = true;
                return[2,findEm(array,i), i]
            }
            else 
            {
                found=false
            }

    }
    if (!found)
    {

        for(let i = 0; i < array.length; i++)
        {
            if(array[i] == "+" || array[i] == "-")
            {
                //retorna prioridade 3, posição
                found = true
                return[3,findEm(array,i), i]
            }
            else
            {
                found = false;
            }

        }
    }

}

function findEmWhere(array, opPos)
{
    let lilbro=opPos
    let middlebro = opPos
    let bigbro = opPos
    lilbro--
    bigbro++
    return[lilbro, middlebro, bigbro];
}

function findEm(array,opPos)
{
    let lilbro=opPos
    let middlebro = opPos
    let bigbro = opPos
    lilbro--
    bigbro++
    lilbro = array[lilbro]
    middlebro = array[middlebro]
    bigbro = array[bigbro]
    return[lilbro, middlebro, bigbro];
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


function calcHistory(nums,res)
{
    calchistory.push(`${nums} = ${res}`);
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
    if (input.trim() == "")
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

function error()
{
    alert("Algo deu errado..!")
}

function clearAll()
{
    document.getElementById("result").innerText = "Result: 0";
    document.getElementById("Input").value = "";
    document.getElementById("howTo").innerText = "";

    result = 0;
    input = 0;
    input1 = 0;
    calchistory= [];
    howTo=[];
    howToHistory = "";
    cleanInput = [];
    operations = [];
    historytext = [""];
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
