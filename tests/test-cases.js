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
    }
];