let result = 0;
let click = 0
let input = 0;
let input1 = 0;
let oddeven = 0;
let calchistory = [];
let howTo = [];
let howToHistory = "";
let historytext = "";
let cleanInput = [];
let operations = [];
let isZero = false;
let parEval = "";
let evalUsed = false;
let parLength = 0;
let parPos = [];

window.addEventListener("load", loadHistory);

function loadHistory() {
    if (JSON.parse(localStorage.getItem("history")) != null) {
        calchistory = JSON.parse(localStorage.getItem("history"));
        historytext = calchistory.join("\n");
        document.getElementById("calcHistory").innerText = historytext;
    }
    else {
        return;
    }

}

function showMe() {
    if (click == 0) {
        document.getElementById("howTo").style.display = "block";
        click++;
    }
    else {
        document.getElementById("howTo").style.display = "none";
        click = 0;
    }
}

function renderHowTo()
{
    let howToElement = document.getElementById("howTo");
    howToElement.innerHTML = "";
    for(let frame of howTo)
    {
        let line = document.createElement("div");
        console.log(frame);
        console.log("FRAME:", frame);
        console.log("EXPRESSION:", frame.expression);
        for (let i = 0; i < frame.expression.length; i++)
        {
            let tokenElement = document.createElement("span");
            tokenElement.innerText = frame.expression[i];
            console.log(i, frame.expression[i]);
            if(i >= frame.start && i <= frame.end)
            {
                console.log("ACTIVE:", frame.expression[i]);
                tokenElement.classList.add("active-step");
                
            }
            line.appendChild(tokenElement);
        }howToElement.appendChild(line);
        
    }
    if(howTo.length > 0)
    {
        let finalLine = document.createElement("div");
        finalLine.innerText = howTo[howTo.length - 1].result;
        howToElement.appendChild(finalLine);
    }
}

function steps(expression, start, end, res) {
    /*howTo.push(`${nums} = ${res}`);
    howToHistory = howTo.join("\n");
    document.getElementById("howTo").innerText = howToHistory;*/
    console.log("📸:", expression);
    console.log("START:", start);
    console.log("END:", end);
    console.log("RESULT:", res);

    let frame = 
    {
        expression,
        start,
        end,
        result: res
    }

    howTo.push(frame);
    
    console.log(frame);
    
}

function calculate() {
    resetEngine();
    clearHowTo();
    read();

    if (verify() == true) {
        let originalInput = input;

        tokenizer();
        if (!isZero) 
        {
            calcHistory(originalInput, result);

            document.getElementById("result").innerText = `Result: ${result}`;
            document.querySelector(".HowTo").style.display = "block";
            //howTo.push(`${result} = ${result}`);
            //howToHistory = howTo.join("\n");
            //document.getElementById("howTo").innerText = howToHistory;
            renderHowTo();
        }
        else if (isZero) 
        {
            document.getElementById("result").innerText = "You can't divide by zero you dummy!";
        }
    }   
}

function tokenizer() {
    clearInput();
    let used = false;
    let y = 0;
    let currentNumber = "";
    read();
    for (let i = 0; i < input.length; i++) {
        if (used == false) {
            prepareInput(cleanInput, y);
        }
        currentNumber = input[i]
        if (isParenthesis(currentNumber)) {
            if (currentNumber == "(") {
                cleanInput[y] = currentNumber;
                y++;
                used = false;
            }
            else if (currentNumber == ")") {
                if(used)
                {
                    cleanInput[y] = parseFloat(cleanInput[y]);
                    y++;
                }
                cleanInput[y] = currentNumber;
                y++;
                used = false;
            }

        }
        else if (isNumber(currentNumber)) {
            cleanInput[y] += currentNumber;
            used = true;
        }
        else if (isOperator(currentNumber)) {
            console.log("IS OPERATOR");
            console.log(`Y: ${y}`);
            console.log(`USED STATE: ${used}`);
            console.log(`CLEAN INPUT: ${cleanInput}`);
            console.log(isUnary(cleanInput, y));
            if (used) {
                cleanInput[y] = parseFloat(cleanInput[y]);
                y++;
                prepareInput(cleanInput, y);
            }
            cleanInput[y] = currentNumber;
            y++;
            used = false;
        }
        else if (isDecimal(currentNumber)) {
            if (currentNumber == ",") {
                currentNumber = ".";
            }
            cleanInput[y] += currentNumber;
            used = true;
        }
    }
    console.log("RAW TOKENIZER:", cleanInput, "Y:", y, "USED:", used);
    console.log(`joinEm() ${joinEm(cleanInput)}`);
    if (used)
    {
        cleanInput[y] = parseFloat(cleanInput[y]);
    }
    console.log("tokenizer:");
    console.log(cleanInput);

    /*Millennium Bug
    Born: 16/10/2026
    Killed: 17/10/2026


    he appeared again on  17/10 (:cry:)
    Cause of death: normalizeUnary()
    RAM consumed during lifetime: regrettable*/
    // -5 is now, remarkably, just -5.
    normalizeUnary(cleanInput);

    console.log("normalized:");
    console.log(cleanInput);

    if(verifyExpression(cleanInput))
    {
        if (cleanInput.length === 1) 
        {
            result = cleanInput[0];
        }
        else 
        {
            while (cleanInput.length > 1) {
                let previousLength = cleanInput.length;

                evaluate();

                if (cleanInput.length >= previousLength)
                {
                    error("expression could not be evaluated");
                    break;
                    // dont be feisty -5 and your brothers -+5 & +-5 === the evil trio
                }
            }
        }
    }
}


function evaluate() {
    let operation
    if (parEval == "") {
        parEval = scan(cleanInput);
    }
    operation = parEval;

    console.log("scan:");
    console.log(operation);
    let pos = operation[2];
    pos--;
    console.log(operation);
    if (operation[0] == 0 && !evalUsed) {
        parPos = [operation[1][0], operation[1][1]];
        operation = cleanInput.slice(operation[1][0] + 1, operation[1][1]);
        parLength = operation.length;

        if(parLength == 1)
        {
            result = operation[0];
            result = cleanFloat(result)
            getRidOfTs(cleanInput, parPos[0], 3);
            parEval = "";
            evalUsed = false;
            parPos = [];

            return;
        }

        parEval = scan(operation);
        evalUsed = true;
        evaluate();
        return;
    }
    else if (operation[0] == 1 && operation[1][1] == "^")
    {
        console.log("POWER:", operation[1]);
        result = operation[1][0] ** operation [1][2];
        result = cleanFloat(result)
    }
    else if (operation[0] == 2) {
        if (operation[1][1] == "/") {
            if (operation[1][2] == 0) {
                isZero = true;
                return;
            }
            else {
                result = operation[1][0] / operation[1][2];
                result = cleanFloat(result)
            }
        }
        else if (operation[1][1] == "*") {
            result = operation[1][0] * operation[1][2];
            result = cleanFloat(result)
        }
        else if (operation[1][1] == "%")
        {
            result = operation[1][0] % operation[1][2];
            result = cleanFloat(result)
        }
        else {
            error("Something went wrong..");
        }
    }
    else if (operation[0] == 3) {
        if (operation[1][1] == "+") {
            result = operation[1][0] + operation[1][2];
            result = cleanFloat(result)
        }
        else if (operation[1][1] == "-") {
            result = operation[1][0] - operation[1][2];
            result = cleanFloat(result)
        }
        else {
            error("Something went wrong..");
        }
    }
    console.log("result:");
    console.log(result);
    console.log("evalUsed:", evalUsed);
    console.log("parLength:", parLength);
    console.log("parPos:", parPos);
    if (evalUsed == true) {
        if (parLength == 3) {
            parEval = ""
            //steps(operation[1].join(""), result) old lil bro
            console.log("HOWTO PAR STATE:", cleanInput);
            console.log("HOWTO PAR START:", parPos[0]);
            console.log("HOWTO PAR END:", parPos[1]);
            steps([...cleanInput], parPos[0], parPos[1], result) ; //📸 click (antes do get rid assassinar)
            getRidOfTs(cleanInput, parPos[0], 5);//esse mano aqui desce a rapa 🔪
            evalUsed = false;
            parPos = [];

            console.log("RESET:");
            console.log("evalUsed:", evalUsed);
            console.log("parEval:", parEval);
            console.log("parPos:", parPos);
        }
        else {
            let realPos = parPos[0] + operation[2];

            console.log("operation[2]:", operation[2]);
            console.log("parPos[0]:", parPos[0]);
            console.log("realPos:", realPos);
            console.log("HOWTO REAL POS:", realPos);
            //steps(operation[1].join(""), result)
            steps([...cleanInput], realPos, realPos + 2, result); // 📸 click
            getRidOfTs(cleanInput, realPos, 3); // 🔪 *som dramático de faca*
            parPos[1] -= 2;
            console.log("parPos:", parPos);

            let newPar = cleanInput.slice(parPos[0]+1,parPos[1]);
            parLength = newPar.length;

            parEval = scan(newPar);

            console.log("NEW PAR:", newPar);
            console.log("NEW LENGTH:", parLength);
            console.log("NEW EVAL:", parEval);
        }
    }
    else {
        console.log("HOWTO STATE:", cleanInput);
        console.log("HOWTO OP POS:", operation[2]);
        console.log("HOWTO START:", operation[2] - 1);
        console.log("HOWTO BROS:", operation[1]);
        //steps(operation[1].join(""), result);
        steps([...cleanInput], operation[2]-1, operation[2] + 1, result); // 📸 click
        getRidOfTs(cleanInput, pos, 3); // 🔪 *jack estripador intensifies*
        parEval = "";
        
    }

    console.log("depois do getRidOfTs:");
    console.log(cleanInput);
    //}

}

function verifyExpression(array)
{
    let i = 0;
    let number,operator,parenthesis,unary = false;
    for (i;i < array.length; i++)
    { 
        if (isNumberToken(array[i]))
        {
            number = true;
        }
        else if (isOperator(array[i]))
        {
            operator = true;
            if (isUnary(array, i))
            {
                unary = true;
                operator = false;
            }
            else
            {
                if (i + 1 >= array.length)
                {
                    error("Expression is incomplete!");
                    return false;
                }
            }
        }
        else if (isParenthesis(array[i]))
        {
            parenthesis = true;
        }
        else 
        {   
            error("Something went wrong..");
            return false; // teoricamente se chegar um animal aqui, alguma coisa está MUITO errada. E THE TRIO vai ser chamado ao RH
        }
    }
    return true;
}

function getRidOfTs(array, start, quantity) {
    // arremessa fora os 3 já calculados, chamados no evaluate depois do scan (ninguém gosta deles)
    // nosso assasino de aluguel
    let notaproblem = "";
    let problemtofix = array;
    let problem = problemtofix.splice(start, quantity, result);
    notaproblem = problemtofix;
    return notaproblem;//anymore
}

function scan(array) {
    let i
    console.log("SCAN RECEIVED:", array);
    for (i = 0; i < array.length; i++) {
        if (array[i] == "(") {
            return [0, joinEm(array), i];
        }
    }
    for(i = array.length-1; i>= 0; i--)
    {
        if(array[i] == "^") 
        {
            console.log("SCAN FOUND POWER:", array[i], "AT:", i);
            return [1, findEm(array,i), i];
        }
    }
    for (i = 0; i < array.length; i++) {
        if (array[i] == "*" || array[i] == "/" || array[i] == "%") {
            console.log("SCAN FOUND MD%:", array[i], "AT:", i);
            return [2, findEm(array, i), i];
        }
    }
    for (i = 0; i < array.length; i++) {
        if (array[i] == "+" || array[i] == "-") {
            return [3, findEm(array, i), i];
        }
    }
}

function isParenthesis(char) {
    console.log("PARENTHESIS CHECK:", char);
    if (char == "(" || char == ")") {
        return true;
    }
    return false;
}

function isParenthesisLog(char) {
    console.log("PARENTHESIS CHECK:", char);
    if (char == "(" || char == ")") {
        return [char];
    }
    return false;
}

function opLogic(array,x,y)
{
    if(array[x] == array[y])
    {
        return "+";
    }
    else
    {
        return "-";
    }
}

function normalizeUnary(array)
{
    let changed = false;
    let i = 0;
    while(i < array.length)
    {
        changed = false;
        console.log("NORMALIZE:", array, "I:", i, "TOKEN:", array[i]);
        if(isUnary(array, i))
        {
            if(array[i + 1] !== undefined)
            {
                if (array[i + 1] == "+" || array[i+1] == "-")
                {
                    array.splice(i, 2, opLogic(array, i, i + 1));
                    changed = true;
                }
                else if(isNumberToken(array[i + 1]))
                {
                        array.splice(i,2,parseFloat(array[i] + array[i + 1]));
                        changed = true;
                        console.log("AFTER UNARY SPLICE:", array);
                }
            }
        }
        if(changed)
        {
            if (i > 0)
            {
                i--;
            }

        }
        else
        {
            i++;
        }
    }
}

function isUnary(array ,i)
{

    if (array[i] == "+" || array[i] == "-")
    {
        if(i == 0)
        {
            return true;
        }
        let previous = array[i - 1]
        if (isNumber(previous) || isParenthesisLog(previous) == ")")
        {
            return false;
        }
        if(isOperator(previous) || isParenthesisLog(previous) == "(")
        {
          return true;
        }
    }
    return false;
}
function joinEm(array) {
    let open = 0;
    let close = 0;

    for (let i = 0; array.length > i; i++) {
        if (array[i] == "(") {
            open = i;
        }
        else if (array[i] == ")") {
            close = i;
            return [open, close];
        }
    }
}

function findEmWhere(array, opPos) {
    let lilbro = opPos;
    let middlebro = opPos;
    let bigbro = opPos;
    lilbro--;
    bigbro++;
    return [lilbro, middlebro, bigbro];
}

// ⚠⚠⚠⚠STRUCTURAL COMPONENT - DO NOT MODIFY⚠⚠⚠⚠
// lilbro, middlebro and bigbro are critical to the structural integrity
// of the Calcify expression engine.
// Removing or "improving" them may result in total building collapse.
// ISO 2000:2026 - THE BROS Certified
// "i dont know how it works, just works, and its simply so good astra 6 on high couldn't break it." - lucas


function findEm(array, opPos) {
    let lilbro = opPos; // load-bearing variable
    let middlebro = opPos;
    let bigbro = opPos;
    lilbro--; //lil
    bigbro++; //not lil  
    lilbro = array[lilbro];
    middlebro = array[middlebro];
    bigbro = array[bigbro];
    return [lilbro, middlebro, bigbro]; //the trio
}

function prepareInput(array, i) {
    array[i] = "";
}

function isNumberToken(isNum)
{
    if(typeof isNum === "number")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isNumber(isNum) {
    if (isNum == "0" || isNum == "1" || isNum == "2" || isNum == "3" || isNum == "4" || isNum == "5" || isNum == "6" || isNum == "7" || isNum == "8" || isNum == "9") {
        return true;
    }
    else {
        return false;
    }
}

function isOperator(isOpp) {
    if (isOpp == "+" || isOpp == "-" || isOpp == "*" || isOpp == "/" || isOpp == "^" || isOpp == "%") {
        return true;
    }
    else {
        return false;
    }
}

function isDecimal(isDec) {
    if (isDec == "," || isDec == ".") {
        return true;
    }
    else {
        return false;
    }
}


function copyResult() {
    navigator.clipboard.writeText(result);
    alert("Copiado!");
}

function copyHistory() {
    let historytext = calchistory.join("\n");
    navigator.clipboard.writeText(historytext);
    alert("Copiado!");
}


function calcHistory(nums, res) {
    calchistory.push(`${nums} = ${res}`);
    historytext = calchistory.join("\n");
    document.getElementById("calcHistory").innerText = historytext;
    localStorage.setItem("history", JSON.stringify(calchistory));
}

function read() {
    input = document.getElementById("Input").value;
}

function converter() {
    input = input.replace(",", ".");
    input2 = input2.replace(",", ".");
    input = Number.parseFloat(input);
    input2 = Number.parseFloat(input2);
}

function readOdd() {
    oddeven = document.getElementById("OddOrEven").value;
    oddeven = Number.parseFloat(oddeven);
}

function verify() {

    console.log("INPUT:", input);
    console.log("LAST:", input[input.length - 1]);
    console.log("IS OP:", isOperator(input[input.length - 1]));

    if (input.trim() == "" || isOperator(input[input.length - 1])) {
        document.getElementById("result").innerText = "You forgot an value..";
        return false;
    }

    for (let i = 0; i < input.length; i++) {
        if (isOperator(input[i]) && isOperator(input[i + 1])) {
            let op1 = input[i];
            let op2 = input[i + 1];
            if(op1 == op2)
            {
                console.log("CONSECUTIVE:", input[i], input[i + 1], "POS:", i);
                document.getElementById("result").innerText = "You can't put two consecutive operators!";
                console.log("RUA!");
                return false;
            }
            if(op1 == "+" && op2 == "*")
            {
                console.log("ILLEGAL PLACEMENT:", input[i], input[i + 1], "POS:", i);
                document.getElementById("result").innerText = "Your operators are in an invalid context";
                console.log("RUA!");
                return false;
            }
            if(op1 == "/" && op2 == "%")
            {
                console.log("ILLEGAL PLACEMENT:", input[i], input[i + 1], "POS:", i);
                document.getElementById("result").innerText = "Your operators are in an invalid context";
                console.log("RUA!");
                return false;
            }
            if(op1 == "^" && op2 == "*")
            {
                console.log("ILLEGAL PLACEMENT:", input[i], input[i + 1], "POS:", i);
                document.getElementById("result").innerText = "Your operators are in an invalid context";
                console.log("RUA!");
                return false;
            }

        }

    }

    let parentheses = 0;
    for(let i = 0; i < input.length; i++)
    {
        if(input[i] === "(")
        {
            parentheses++;
        }
        else if (input[i] === ")")
        {
            parentheses--;

            if(parentheses < 0)
            {
                document.getElementById("result").innerText = "Unbalanced parentheses!";
            
                return false;
            }
        }
    }
    if(parentheses !== 0)
    {
        document.getElementById("result").innerText = "Unbalanced parentheses!";
        return false;   
    }

    return true;
}

function verifyOdd() {
    if (isNaN(oddeven)) {
        document.getElementById("result2").innerText = "You forgot the value..";
        return false;
    }
    else {
        return true;
    }
}

function error(message) {
    alert(message);
}

function clearHowTo() {
    howTo = [];
    howToHistory = "";
    document.getElementById("howTo").innerText = "";
}

function clearAll() {
    document.getElementById("result").innerText = "Result: 0";
    document.getElementById("Input").value = "";
    document.getElementById("howTo").innerText = "";

    result = 0;
    input = 0;
    input1 = 0;
    calchistory = [];
    howTo = [];
    howToHistory = "";
    cleanInput = [];
    operations = [];
    historytext = [""];
}

function  resetEngine()
{
    cleanInput = [];
    result = 0;
    isZero = false;
    parEval = "";
    evalUsed = false;
    parLength = 0;
    parPos = [];
}

function clearInput() {
    cleanInput = [];
    result = 0;
}

function clearHistory() {
    document.getElementById("calcHistory").innerText = "";
    calchistory = [];
    localStorage.removeItem("history");
}

function cleanFloat(value)
{
    if (!Number.isFinite(value))
    {
        return value;
    }

    return Number.parseFloat(value.toPrecision(15));
}

function add() {
    read();
    if (verify()) {
        result = input1 + input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input, " + ", input2, result);
    }
    else {
        return;
    }
}
function subtract() {
    read();
    if (verify()) {
        result = input - input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input, " - ", input2, result);
    }
    else {
        return;
    }

}
function divide() {
    read();
    if (verify()) {
        if (input2 != 0) {
            result = input / input2;
            document.getElementById("result").innerText = `Result: ${result}`;
            calcHistory(input, " / ", input2, result);
        }
        else {
            document.getElementById("result").innerText = "You can't divide by zero!";
        }
    }
}
function multiply() {
    read();
    if (verify()) {
        result = input * input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input, " * ", input2, result);
    }
    else {
        return;
    }
}

function power() {
    read();
    if (verify()) {
        result = input ** input2;
        document.getElementById("result").innerText = `Result: ${result}`;
        calcHistory(input, " ** ", input2, result);
    }
    else {
        return;
    }
}

function restDivision() {
    read();
    if (verify()) {
        if (input2 != 0) {
            result = input % input2;
            document.getElementById("result").innerText = `Result: ${result}`;
            calcHistory(input, " mod ", input2, result);
        }
        else {
            document.getElementById("result").innerText = "You can't divide by zero!";
        }

    }
    else {
        return;
    }
}



function oddOreven() {
    readOdd();
    if (verifyOdd()) {
        if (oddeven % 2 === 0) {
            document.getElementById("result2").innerText = "Even Number!";
        }
        else {
            document.getElementById("result2").innerText = "Odd Number!";
        }
    }
    else {
        return;
    }

}
