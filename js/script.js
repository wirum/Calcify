let result = 0;
let input = 0;
let input2 = 0;
let oddeven = 0;

function read()
{
    input = document.getElementById("Input").value;
    input2 = document.getElementById("Input2").value;
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

function add()
{
    read()
    if (verify())
    {
        result= input+ input2;
        document.getElementById("result").innerText = result;
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

function restDivision()
{
    read()
    if (verify())
    {
        result = input % input2;
        document.getElementById("result").innerText = result;
    }
    else
    {
        return;
    }
}