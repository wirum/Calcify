import { tests } from "./test-cases.js";

console.log(tests);

let passed = 0;
let failed = 0;

for (const test of tests) {
    const actual = window.CalcifyTest.run(test.expression);

    console.log(test.name, actual);
}