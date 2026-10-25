import { tests } from "./test-cases.js";

let passed = 0;
let failed = 0;

for (const test of tests) {
    const actual = window.CalcifyTest.run(test.expression);

    if (actual === test.expected){
        passed++;
        console.log("PASS:", test.name);
    }
    else{
        failed++;
        console.error("FAIL", test.name, "| esperado:", test.expected, "| recebido:", actual);
    }
}
console.log(`Resumo: ${passed} passaram, ${failed} falharam`)