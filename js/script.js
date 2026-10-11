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

function verify()
{
    if (isNaN(input) || isNaN(input2))
    {
        document.getElementById("result").innerText = "You forgot an value.."
        return false;
    }
    else
    {
        return true;
    }
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
            document.getElementById("result").innerText = "You can't divide by zero!"
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