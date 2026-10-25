export const tests = [
    {
        name: "basic addition",
        category: "basic",
        expression: "2+2",
        expected: 4
    },

    {
        name: "operator precedence",
        category: "precedence",
        expression: "2+3*4",
        expected: 14
    },

    {
        name: "parentheses",
        category: "parentheses",
        expression: "(2+3)*4",
        expected: 20
    },

    {
        name: "unary negative",
        category: "unary",
        expression: "-5+10",
        expected: 5
    },

    {
        name:"remainder",
        category:"basic",
        expression:"10%3",
        expected: 1
    },

    {
        name:"decimal precision",
        category: "precision",
        expression: "0.1+0.2",
        expected: 0.3
    },

    {
        name: "division by zero",
        category: "errors",
        expression: "10/0",
        expected: "division-by-zero"
    },

    {
        name: "division by zero through parentheses",
        category: "errors",
        expression: "10/(5-5)",
        expected: "division-by-zero"
    },

    {
        name: "negative parentheses",
        category: "unary",
        expression: "-(2+3)",
        expected: -5    
    },

    {
        name: "binary subtraction with parentheses",
        category: "unary",
        expression: "0-(2+3)",
        expected: -5
    },

    {
        name: "unary negative single parentheses",
        category: "unary",
        expression: "-2",
        expected: -2
    },
    
    {
        name: "unary negative with multiplication in parentheses",
        category: "unary",
        expression: "-(2*3)",
        expected: -6
    },

    {
        name: "unary negative with subtraction in parentheses",
        category: "unary",
        expression: "-(2-3)",
        expected: 1
    },

    {
        name: "unary negative with division in parentheses",
        category: "unary",
        expression: "-(2/1)",
        expected: -2
    },

    {
        name: "exponent precedence",
        category: "operator precedence",
        expression: "2+3^2",
        expected: 11
    },

    {
        name:"unary negative after multiplication",
        category: "unary operators",
        expression: "2*-3",
        expected: -6
    },

    {
        name:"nested parentheses",
        category:"parentheses",
        expression:"2*(3+(4*2))",
        expected: 22
    },

    {
        name: "decimal subtraction",
        category: "precision",
        expression:"5.5-2.2",
        expected: 3.3
    },

    {
        name: "division by zero in nested expression",
        category: "errors",
        expression:"10/(2*(3-3))",
        expected: "division-by-zero"
    },

    {
        name: "basic subtraction",
        category: "basic",
        expression: "9-4",
        expected: 5
    },

    {
        name: "basic multiplication",
        category: "basic",
        expression:"6*7",
        expected: 42
    },

    {
        name: "six seven addition",
        category: "basic",
        expression:"20+20+20+7",
        expected: 67
    },

    {
        name: "basic division",
        category: "basic",
        expression: "20/4",
        expected: 5
    },

    {
        name: "simple exponentiation",
        category: "precedence",
        expression: "2^3",
        expected: 8
    },

    {
        name: "multiple adittions",
        category: "basic",
        expression: "1+2+3",
        expected: 6 
    },

    {
        name: "sequential subtraction",
        category: "basic",
        expression: "10-3-2",
        expected: 5
    },

    {
        name: "mixed operator precedence",
        category: "basic",
        expression: "2+12/3",
        expected: 6
    },

    {
        name: "decimal multiplication",
        category: "precision",
        expression: "1.5*2",
        expected: 3
    },

    {
        name: "mixed addition and subtraction",
        category: "basic",
        expression: "8-3+2",
        expected: 7
    },

    {
        name: "multiplication before addition",
        category: "precedence",
        expression: "3+2*5",
        expected: 13
    },

    {
        name: "power before multiplication",
        category: "precedence",
        expression: "2*3^2",
        expected: 18
    },

    {
        name: "power after parentheses",
        category: "precedence",
        expression: "(2+3)^2",
        expected: 25
    },

    {
        name: "grouped division",
        category: "parentheses",
        expression: "18/(3*2)",
        expected: 3
    },

    {
        name: "multiple parenthetical groups",
        category: "parentheses",
        expression: "(1+2)*(3*4)",
        expected: 21
    },

    {
        name: "unary negative multiplication",
        category: "unary",
        expression: "-5*2",
        expected: -10
    },

    {
        name: "subtraction of negative number",
        category: "unary",
        expression: "5--3",
        expected: 8
    },

    {
        name: "addition of negative number in parentheses",
        category: "unary",
        expression: "5+(-2)",
        expected: 3
    },

    {
        name: "sequential division",
        category: "precedence",
        expression: "100/5/2",
        expected: 10
    },

    {
        name: "decimal division",
        category: "precision",
        expression: "2.5/2",
        expected: 1.25
    },
    
    {
        name: "decimal multiplication precision",
        category: "precision",
        expression: "0.2*0.3",
        expected: 0.06
    }
];