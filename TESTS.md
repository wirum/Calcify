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
- [x] (2 + 3 -> Deu erro de divisão por zero..????  (Fix)
- [x] 2 + 3) -> Deu erro de divisão por zero..???? (Fix)
- [x] Empty input -> handled

## State recovery
1. Run an invalid expression
2. Receive the error
3. Immediately calculate `2 + 2`
- [x] Returns 4 normally = retorna erro de eval (fix)

## HowTo
For each valid test above: (esqueci de fazer ::cry:)
- [ ] Open HowTo
- [ ] Final result matches calculator
- [ ] Steps match the expression
- [ ] No missing/undefined/NaN values

## State recovery in depth

- [x] 10 / 0 → error → 2 + 2 (fixed)
- [x] 2 ++ 3 → error → 2 + 2 
- [x] 5 * → error → 2 + 2 
- [x] (2 + 3 → error → 2 + 2 (fix)
- [x] 2 + 3) → error → 2 + 2  (fix)

## Floating point tests
- [x] 0.1 + 0.2 → 0.3
- [x] 0.7 + 0.1 → 0.8
- [x] 0.3 - 0.2 → 0.1
- [x] 1 / 3 → 0.333333333333333
- [x] 10.5 / 2 → 5.25