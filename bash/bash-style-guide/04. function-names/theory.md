# Function names

Lower-case, with **underscores** to separate words. Separate libraries with **`::`**. Parentheses are **required** after the name. The keyword `function` is **optional**, but must be used **consistently** in a project.

```bash
# Single function
my_func() {
  …
}

# Part of a package
mypackage::my_func() {
  …
}
```

`my_func` — one script or this file only. `mypackage::my_func` — namespaced so two libraries do not clash.

**Memory hook:** `snake_case()`. Package: `lib::snake_case()`. Same `function` style everywhere, or nowhere.
