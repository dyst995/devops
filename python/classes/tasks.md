# Tasks — Classes

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Predict prints or exceptions **before** you run.

## Warm-up

1. [ ] Class vs instance. `__init__` / `self`. Class attr vs `self.x`.
2. [ ] Inheritance: parent/child, MRO L-R bottom-up. `_` vs `__` mangling.
3. [ ] `+` → which dunder? `print(obj)` → which?

## Employee

4. [ ] Recreate `Employee`. `emp = Employee("John Smith", 200)`. `emp.name` / `emp.salary` / `Employee.empCount`.
5. [ ] `emp1` / `emp2` as in the notes. Both `displayEmployee`. Total count `2`.
6. [ ] `emp1.age` add 7, set 8, `del`, then `hasattr`/`setattr`/`getattr`/`delattr`.

## Inheritance / private / magic

7. [ ] Recreate `Base1`/`Base2`/`Child`. `c.fun()` and `c.jump()`. Recite MRO for `jump`.
8. [ ] `JustCounter`: two `count()` prints, then `__secretCount` vs `_JustCounter__secretCount`.
9. [ ] `Vector` `v1 + v2` and `print`. Match `Vector (7, 8)`.

## Scenario

10. [ ] A `Employee`-style class with a class counter, a child that `super()`s one method, a `__` attribute, and `__add__` or `__str__` on a small type. Prove MRO left-to-right and mangled access.
