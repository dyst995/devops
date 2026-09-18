# Commands to memorize

```python
i = 10
while i > 0:
    print(i)
    i -= 1

for i in range(10):
    print(i)                    # 0 .. 9

l = [i for i in range(10)]
print(l)                        # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

for val in "string":
    if val == "i":
        break                   # leave the loop
    print(val)
print("The end")                # s t r  then The end

for val in "string":
    if val == "i":
        continue                # skip this iteration only
    print(val)
print("The end")                # s t r n g  then The end

while i > 0:
    print(i)
    i -= 1
else:                           # i > 0 == False  (not after break/return)
    print("End")

for i in range(5):
    print(i)
else:                           # end of iteration
    print("End")                # 0 1 2 3 4 End

for i in range(4):
    print(i)
    break
else:
    print("End")                # 0 only — no End
```
