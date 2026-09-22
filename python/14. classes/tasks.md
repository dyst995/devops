# Tasks — Classes

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first, then run.

1. [ ] Why classes (complex data vs primitives)? Recite `class ClassName:` / docstring / suite. Methods = ?
2. [ ] Recite `Employee`: `empCount`, `__init__(self, name, salary)`, `displayCount`, `displayEmployee`. What is `self`? Class var vs instance var?
3. [ ] Blueprint vs instance. `emp = Employee("John Smith", 200)` — when does `__init__` run? Required args?
4. [ ] Two instances Slave/200 and Master/5000. Recite display lines and `Total Employee 2`. `empCount` on the **class**.
5. [ ] Add/modify/delete `emp1.age`. Recite `hasattr` `getattr` `setattr` `delattr`.
6. [ ] Inheritance: parent/base vs child/derived. Recite `Child(Base1, Base2)`, `c.fun()` prints (`child.fun` then `super().fun()` → `base1.fun`). `c.jump()`?
7. [ ] MRO / left parent first — one interview sentence. `super()` follows MRO.
8. [ ] `_spam` convention vs `__secretCount` mangling: `counter.__secretCount` vs `counter._JustCounter__secretCount`.
9. [ ] Dunders: `__add__` for `+`, `__str__` for `print`. Recite Vector `(2,10)+(5,-2)` → `Vector (7, 8)` if in the notes.
10. [ ] Combined: `__init__` + `self`; `empCount` shared; two displays + total 2; hasattr/setattr; mangling AttributeError; Child MRO.
