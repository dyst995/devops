# Class

Primitive data structures—like numbers, strings, and lists—are designed to represent **simple** pieces of information, such as the cost of an apple, the name of a poem, or your favorite colors, respectively. What if you want to represent something **more complex**?

For example, let’s say you want to track employees in an organization. You need to store some basic information about each employee, such as their name, age, position, and the year they started working.

**Classes** are used to create **user-defined data structures**. Classes define functions called **methods**, which identify the **behaviors and actions** that an object created from the class can perform with its data.

## Class structure

```python
class ClassName:
    """Optional class documentation string"""

    class_suite
```

**Memory hook:** `class Name:` then indent. Optional docstring. Methods live in the suite.

### Example

```python
class Employee:
    """Common base class for all employees"""

    empCount = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    def displayCount(self):
        print("Total Employee %d" % Employee.empCount)

    def displayEmployee(self):
        print("Name :", self.name, ", Salary:", self.salary)
```

The properties that all `Employee` objects must have been defined in a method called **`__init__()`**. Every time a new `Employee` object is created, `__init__()` sets the **initial state** of the object by assigning the values of the object’s properties. That is, `__init__()` **initializes each new instance** of the class. You can give `__init__()` any number of parameters, but the **first parameter will always be a variable called `self`**. When a new class instance is created, the instance is **automatically passed** to the `self` parameter in `__init__()` so that new attributes can be defined on the object.

`empCount` on the **class** is shared; each `__init__` does `Employee.empCount += 1`. `self.name` / `self.salary` are **per instance**.

**Memory hook:** `__init__(self, …)` = constructor. `self` = this object. Class var = `Employee.empCount`. Instance var = `self.name`.

## Creating instance of class

A class is a **blueprint** for how something should be defined. It doesn’t actually contain any data. The `Employee` class specifies that a **name** and a **salary** are necessary for defining an employee, but it doesn’t contain the name or salary of any **specific** employee.

While the class is the blueprint, an **instance** is an object that is built from a class and contains **real data**. An instance of the `Employee` class is not a blueprint anymore. It’s an actual employee with a name, like John, with a defined salary.

When an instance is created, **`__init__()` method is invoked**. `name` and `salary` parameters are required by `__init__` method of `Employee` class.

```python
emp = Employee("John Smith", 200)
```

**Memory hook:** `ClassName(args)` → `__init__` runs. Class = blueprint. Instance = one filled-in object.

## Accessing attributes and methods

```python
# First object of Employee class
emp1 = Employee("Slave", 200)
# Second object of Employee class
emp2 = Employee("Master", 5000)

emp1.displayEmployee()
emp2.displayEmployee()

print("Total Employee %d" % Employee.empCount)
```

Output (slide typesetting; the `print` in the class uses `Name :` / `Salary:` and `emp2` was constructed with **5000**):

```text
Name : Slave , Salary: 200
Name : Master , Salary: 5000
Total Employee 2
```

(Slide dump: `Name: Slave, salary: 200` / `Name: Master, salare: 500` / `Total Employee 2`.)

**Memory hook:** `emp1.displayEmployee()` = method. `Employee.empCount` = class attribute (here **2** after two instances).

## Attributes modification

```python
emp1.age = 7  # Add an 'age' attribute
emp1.age = 8  # Modify 'age' attribute
del emp1.age  # Delete 'age' attribute
# Returns true if 'age' attribute exists
hasattr(emp1, 'age')
# Returns value of 'age' attribute
getattr(emp1, 'age')
# Set attribute 'age' at 8
setattr(emp1, 'age', 8)
# Delete attribute 'age'
delattr(emp1, 'age')
```

You can add attributes on one instance after construction. `hasattr` / `getattr` / `setattr` / `delattr` are the string-name forms of `.age` / `del`.

**Memory hook:** `obj.attr =` add/change. `del obj.attr`. `hasattr` `getattr` `setattr` `delattr`.

## Inheritance

Inheritance allows us to define a class that **inherits all the methods and properties** from another class.

**Parent class** is the class being inherited from, also called **base class**.

**Child class** is the class that inherits from another class, also called **derived class**.

```python
class Base1:
    def fun(self):
        print("base1.fun")

class Base2():
    def jump(self):
        print("base2.jump")

class Child(Base1, Base2):
    def fun(self):
        print("child.fun")
        super().fun()

c = Child()
c.fun()   # child.fun base1.fun
c.jump()  # base2.jump
```

When a method or attribute of a class is accessed, Python uses the class **MRO (method resolution order)** to find it.

In Python, the MRO is from **bottom to top** and **left to right**. This means that, first, the method is searched in the **class of the object**. If it’s not found, it is searched in the **immediate super class**. In the case of **multiple** super classes, it is searched **left to right**, in the order by which was declared by the developer.

For example, `fun()` method is defined in `Child` class. And it is invoked. `jump()` method isn't implemented in `Child` class. `Child` class has 2 parents: `Base1` and `Base2`. MRO algorithm looks into **`Base1` first** (from left to right) and then in `Base2`. That is why **`Base2.jump`** is executed.

The Python **`super()`** function is used in the child class to **refer to the parent class** and access all the parent class's functions and variables. Here `super().fun()` runs **`Base1.fun`** (next in MRO after `Child`).

**Memory hook:** `class Child(Base1, Base2)` — look **Child**, then **left** parent, then right. `super()` = next in MRO.

## Private variables (name mangling)

“Private” instance variables that cannot be accessed except from inside an object **don’t exist** in Python. However, there is a convention that is followed by most Python code: a name prefixed with an **underscore** (e.g. `_spam`) should be treated as a **non-public** part of the API (whether it is a function, a method or a data member). It should be considered an implementation detail and subject to change without notice.

Since there is a valid use-case for class-private members (namely to **avoid name clashes** of names with names defined by subclasses), there is limited support for such a mechanism, called **name mangling**. Any identifier of the form **`__secretCount`** (at least **two leading** underscores, at most **one trailing** underscore) is textually replaced with **`_JustCounter__secretCount`**, where classname is the current class name with leading underscore(s) stripped. This mangling is done without regard to the syntactic position of the identifier, as long as it occurs **within the definition of a class**.

```python
class JustCounter:
    __secretCount = 0

    def count(self):
        self.__secretCount += 1
        print(self.__secretCount)

counter = JustCounter()
counter.count()  # 1
counter.count()  # 2

print(counter.__secretCount)  # AttributeError
print(counter._JustCounter__secretCount)   # 2
```

**Memory hook:** `_name` = convention, don’t touch. `__name` inside class → `_ClassName__name`. Outside `obj.__name` → **AttributeError**; mangled name still works.

## Magic methods (operators)

Magic methods in Python are the special methods that **start and end with the double underscores**. They are also called **dunder** methods. Magic methods are **not meant to be invoked directly** by you, but the invocation happens **internally** from the class on a certain action. For example, when you add two numbers using the **`+`** operator, internally, the **`__add__()`** method will be called.

You can find all Python magic method descriptions here: https://docs.python.org/3/reference/datamodel.html#special-method-names

**Memory hook:** `__init__` `__str__` `__add__` = dunders. `+` → `__add__`. `print(obj)` → `__str__`.

### Operator overloading

```python
class Vector:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def __str__(self):
        return f'Vector ({self.a}, {self.b})'

    def __add__(self,other):
        return Vector(self.a + other.a, self.b + other.b)

v1 = Vector(2,10)
v2 = Vector(5,-2)
print(v1 + v2) # print calls __str__ method implicitly to convert Vector object to string
```

Output:

```text
Vector (7, 8)
```

`v1 + v2` → `__add__` → `Vector(7, 8)`. `print` uses `__str__`.

**Memory hook:** overload `+` = define `__add__`. Return a **new** `Vector`.
