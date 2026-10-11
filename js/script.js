let result = 0;
let input = 0;
let input2 = 0;
let oddeven = 0;
let calchistory= [];

function calcHistory(num1,operator,num2,res)
{
    calchistory.push(`${num1} ${operator} ${num2} = ${res}`);
    let historytext = calchistory.join("\n")
    document.getElementById("calcHistory").innerText = historytext;
}

function read()
{
    input = document.getElementById("Input").value;
    input2 = document.getElementById("Input2").value;
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
    document.getElementById("result").innerText = "0";
    document.getElementById("Input").value = "";
    document.getElementById("Input2").value = "";

    input2 = 0;
    input = 0;
    result = 0;
}

function clearHistory()
{
    document.getElementById("calcHistory").innerText = "";
    calchistory=[]
}

function add()
{
    read()
    if (verify())
    {
        result= input+ input2;
        document.getElementById("result").innerText = result;
        calcHistory(input," + ", input2, result);
    }
    else
    {
        return;
    }
}
function subtract()
{
    read()
    if (verify())
    {
        result=input - input2;
        document.getElementById("result").innerText = result;
        calcHistory(input," - ", input2, result);
    }
    else
    {
        return;
    }

}
function divide()
{
    read()
    if (verify())
    {
        if (input2 != 0)
        {
            result = input / input2;
            document.getElementById("result").innerText = result;
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
    read()
    if (verify())
    {
        result = input * input2;
        document.getElementById("result").innerText = result;
        calcHistory(input," * ", input2, result);
    }
    else
    {
        return;
    }
}

function power()
{
    read()
    if (verify())
    {
        result = input ** input2;
        document.getElementById("result").innerText = result;
        calcHistory(input," ** ", input2, result);
    }
    else
    {
        return;
    }
}

function restDivision()
{
    read()
    if (verify())
    {
        if (input2 != 0)
        {
            result = input % input2;
            document.getElementById("result").innerText = result;
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
    readOdd()
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

