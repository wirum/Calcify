# Calcify V3 Engine Tests

## Basic operations
- [x] 2 + 2 = 4
- [x] 10 - 3 = 7
- [x] 4 * 5 = 20
- [x] 20 / 4 = 5
- [x] 2 ^ 3 = 8
- [x] 10 % 3 = 1

## Decimals
- [x] 1.5 + 2.5 = 4
- [x] 10.5 / 2 = 5.25
- [⚠] 0.1 + 0.2 = 0.30000000000000004
- [x] Decimal comma behavior (1,5 + 2,5 = 4)

## Negative numbers
- [x] -5 + 3 = -2
- [x] 5 + -3 = 2
- [x] -5 * -2 = 10
- [x] -10 / 2 = -5

## Precedence
- [x] 2 + 3 * 4 = 14
- [x] 10 - 2 * 3 = 4
- [x] 2 * 3 + 4 = 10

## Parentheses
- [x] (2 + 3) * 4 = 20
- [x] 2 * (3 + 4) = 14
- [x] ((2 + 3) * 2) = 10

## Invalid input
- [x] 10 / 0 -> error
- [x] 0 / 0 -> error
- [x] 2 ++ 3 -> error
- [x] 5 * -> error
- [⚠] (2 + 3 -> Deu erro de divisão por zero..????
- [⚠] 2 + 3) -> Deu erro de divisão por zero..????
- [x] Empty input -> handled

## State recovery
1. Run an invalid expression
2. Receive the error
3. Immediately calculate `2 + 2`
- [⚠] Returns 4 normally = retorna erro de eval

## HowTo
For each valid test above: (esqueci de fazer ::cry:)
- [ ] Open HowTo
- [ ] Final result matches calculator
- [ ] Steps match the expression
- [ ] No missing/undefined/NaN values

## State recovery in depth

- [0⚠] 10 / 0 → error → 2 + 2
- [x] 2 ++ 3 → error → 2 + 2 (funciona!) (o problema tá na MENSAGEM do eval que dá o ALERT!)
- [x] 5 * → error → 2 + 2 (FUNCIONA PORQUE não deu ALERT!)
- [1⚠] (2 + 3 → error → 2 + 2 (agora depois de rodar ele não deixa rodar conta normal de novo.. )
- [1⚠] 2 + 3) → error → 2 + 2  (agora depois de rodar ele não deixa rodar conta normal de novo.. )

###0⚠ -
`
INPUT: 10/0
script.js:665 LAST: 0
script.js:666 IS OP: false
script.js:451 PARENTHESIS CHECK: 1
script.js:451 PARENTHESIS CHECK: 0
script.js:451 PARENTHESIS CHECK: /
script.js:160 IS OPERATOR
script.js:161 Y: 0
script.js:162 USED STATE: true
script.js:163 CLEAN INPUT: 10
script.js:164 false
script.js:451 PARENTHESIS CHECK: 0
script.js:182 RAW TOKENIZER: Array(3) Y: 2 USED: true
script.js:183 joinEm() undefined
script.js:188 tokenizer:
script.js:189 Array(3)
script.js:485 NORMALIZE: Array(3) I: 0 TOKEN: 10
script.js:485 NORMALIZE: Array(3) I: 1 TOKEN: /
script.js:485 NORMALIZE: Array(3) I: 2 TOKEN: 0
script.js:202 normalized:
script.js:203 Array(3)
script.js:423 SCAN RECEIVED: Array(3)
script.js:439 SCAN FOUND MD%: / AT: 1
script.js:245 scan:
script.js:246 Array(3)
script.js:249 Array(3)
script.js:664 INPUT: 2+2
script.js:665 LAST: 2
script.js:666 IS OP: false
script.js:451 PARENTHESIS CHECK: 2
script.js:451 PARENTHESIS CHECK: +
script.js:160 IS OPERATOR
script.js:161 Y: 0
script.js:162 USED STATE: true
script.js:163 CLEAN INPUT: 2
script.js:164 false
script.js:451 PARENTHESIS CHECK: 2
script.js:182 RAW TOKENIZER: Array(3) Y: 2 USED: true
script.js:183 joinEm() undefined
script.js:188 tokenizer:
script.js:189 Array(3)
script.js:485 NORMALIZE: Array(3) I: 0 TOKEN: 2
script.js:485 NORMALIZE: Array(3) I: 1 TOKEN: +
script.js:485 NORMALIZE: Array(3) I: 2 TOKEN: 2
script.js:202 normalized:
script.js:203 Array(3)
script.js:245 scan:
script.js:246 Array(3)
script.js:249 Array(3) 
`
###1⚠-
scan:
script.js:246 undefined
script.js:247 Uncaught TypeError: Cannot read properties of undefined (reading '2')
    at evaluate (script.js:247:24)
    at tokenizer (script.js:216:17)
    at calculate (script.js:107:9)
    at HTMLButtonElement.onclick (index.html:28:39)