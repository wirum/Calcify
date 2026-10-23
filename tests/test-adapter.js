window.CalcifyTest = {
    run(expression){

        resetEngine();
        clearHowTo();

        inputField.value = expression;

        read();

        if(verify()) {
            tokenizer();
            console.log("Resultado da engine:", result);
            return result;
        }
    }
};