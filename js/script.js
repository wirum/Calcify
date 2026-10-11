let result = 0;
let input = 0;
let input2 = 0;




function read()
{
    input = document.getElementById("Input").value;
    input2 = document.getElementById("Input2").value;
    input= Number.parseFloat(input);
    input2= Number.parseFloat(input2);
}


function add()
{
    read()
    result= input+ input2;
    document.getElementById("result").innerText = result;
}
function subtract()
{
    read()
    result=input - input2;
    document.getElementById("result").innerText = result;
}
function divide()
{
    read()
    if (input2 != 0)
    {
        result = input / input2;
        document.getElementById("result").innerText = result;
    }
    else
    {
        document.getElementById("result").innerText = "You can't divide by zero!"
    }
}
function multiply()
{
    read()
    result = input * input2;
    document.getElementById("result").innerText = result;
}