# Function names — Questions

Cover the Answers section. Answer first, then check.

1. Case and word separator? Are `()` required?
2. How do you name a function that belongs to a package/library?
3. Is the `function` keyword required? What is required if you use it at all?
4. Recite both course examples (`my_func` and the package form).

---

## Answers

1. Lower-case, underscores. Yes.
2. `mypackage::my_func()` — `::` between library and name.
3. No. Use it **everywhere** in the project, or nowhere.
4. `my_func() { … }` · `mypackage::my_func() { … }`
