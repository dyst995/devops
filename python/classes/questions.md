# Classes — Questions

Cover the Answers section. Answer first, then check.

1. Primitive vs class? Methods?
2. Recite `class ClassName:` skeleton (docstring, suite).
3. `Employee`: what is `empCount`? What does `__init__` do? Why `self` first? Who passes `self`?
4. Class vs instance (blueprint vs real data)? What runs on `Employee("John Smith", 200)`?
5. Two employees Slave/Master — `displayEmployee` idea and `Employee.empCount`?
6. Add / change / `del` `age`. `hasattr` `getattr` `setattr` `delattr`?
7. Parent vs child. `Child(Base1, Base2)`: `c.fun()` prints? `c.jump()`? MRO direction? Why `Base2.jump`? `super()`?
8. Does Python have real private attributes? `_spam` convention? `__secretCount` mangling form? `counter.__secretCount` vs `_JustCounter__secretCount`?
9. Dunder / magic method? `+` calls? `print(v1+v2)` output and which two dunders?

---

## Answers

1. Numbers/strings/lists = simple data. Class = user-defined structure + methods (behavior).
2. Docstring optional, then `class_suite`.
3. Class counter. Initializes instance (`self.name`, `self.salary`, increment count). First param always `self`. The new instance is passed automatically.
4. Class = blueprint, no one employee’s data. Instance = John + salary. `__init__`.
5. Name/salary lines; **2**.
6. `emp1.age = 7` then `8`; `del emp1.age`. Exists? / get / set 8 / delete by name.
7. Base vs derived. `child.fun` then `base1.fun` · `base2.jump`. Bottom to top, left to right. `jump` not on Child; `Base1` first, then `Base2`. Next parent in MRO.
8. No. Non-public API. `_JustCounter__secretCount`. AttributeError · `2`.
9. `__name__`. `__add__`. `Vector (7, 8)` — `__add__` then `__str__`.
