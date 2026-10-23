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
    }
];