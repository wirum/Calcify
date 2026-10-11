let result = 0;
let input = 0;
let input2 = 0;
let valid = false;



function read()
{
    input = document.getElementById("Input").value;
    input2 = document.getElementById("Input2").value;
    input= Number.parseFloat(input);
    input2= Number.parseFloat(input2);
}

function verify()
{
    if (input!=NaN || input2!=NaN)
    {
        valid = true;
    }
    else
    {
        document.getElementById("result").innerText = "You forgot an value.."
        valid = false;
    }
}

function add()
{
    read()
    if (verify() == true)
    {
        result= input+ input2;
        document.getElementById("result").innerText = result;
    }
}
function subtract()
{
    read()
    if (verify() == true)
    {
        result=input - input2;
        document.getElementById("result").innerText = result;
    }

}
function divide()
{
    read()
    if (verify() == true)
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
    result = input * input2;
    document.getElementById("result").innerText = result;
}