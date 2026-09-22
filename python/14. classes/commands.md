# Commands to memorize

```python
class Employee:
    """Common base class for all employees"""
    empCount = 0
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1
    def displayEmployee(self):
        print("Name :", self.name, ", Salary:", self.salary)

emp = Employee("John Smith", 200)
emp1.displayEmployee()
print("Total Employee %d" % Employee.empCount)

emp1.age = 7
del emp1.age
hasattr(emp1, 'age'); getattr(emp1, 'age'); setattr(emp1, 'age', 8); delattr(emp1, 'age')

class Child(Base1, Base2):
    def fun(self):
        print("child.fun")
        super().fun()          # MRO: this class, then left parent, then right

# _spam  = convention non-public
# __secretCount  inside JustCounter  →  _JustCounter__secretCount
# counter.__secretCount           AttributeError
# counter._JustCounter__secretCount   2

# __add__  for +     __str__  for print(obj)
print(Vector(2,10) + Vector(5,-2))   # Vector (7, 8)
```
