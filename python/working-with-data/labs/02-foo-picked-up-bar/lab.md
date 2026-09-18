# foo picked up bar

`x = 'foo'`, `y = x`, then `y += 'bar'`. Reviewers expect `x` to stay `foo` (immutable string). On a second snippet `x = [1, 2, 3]`, `y = x`, `y += [3, 2, 1]`, they expect `x` to become `[1, 2, 3, 3, 2, 1]` (same list object).

Right now either both `x`s change or neither does.

**Goal:** Match both course printouts. Explain identity vs value using `is` / `id()` if asked. Check the arrows on https://pythontutor.com/.
