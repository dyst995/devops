# Hands-on practice — Special characters

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

---

## Easy

1. Write `two-on-one.sh` that prints `alpha` and `beta` using **one physical line** in the file (not two `echo` lines stacked). Run it. You should see two lines of output.

2. Write `quote-demo.sh` that sets `place=lab` and prints **three** lines:
    - `work in lab`
    - `work in $place`  (the dollar and the word `place` must appear literally)
    - `$place`          (again literal, produced without single quotes — use an escape)
    Do not hard-code the word `lab` except in the assignment.

3. Write `today.sh` that prints `today is ` followed by the output of `date`, using **command substitution** from this topic’s table. The date must be whatever `date` prints at run time, not a string you typed.

4. Write `dispatch.sh`. First argument is an action word. It prints `starting`, `stopping`, or `unknown`. Unknown must be the path for anything else, including no argument. After a known action it must not also print `unknown`.

5. Create `lib-msg.sh` that only sets `MSG=from-lib` (no `echo`). Write `use-lib.sh` that pulls `lib-msg.sh` **into the same shell** and then prints `$MSG`. Run `./use-lib.sh` — you must see `from-lib`. Then start a **new** shell and `echo $MSG` — it must be empty. Contrast: run `lib-msg.sh` as its own process and then `echo $MSG` in the caller; `MSG` must not appear.

---

## Hard

6. **Broken script (fix it).** Save this **exactly** as `broken-args.sh`, then repair it so the demo under it works. Do not rewrite from scratch if you can patch.

```bash
#!/bin/bash
# intended: ./broken-args.sh start|stop
# start → echo starting; stop → echo stopping; else usage and exit 1

case $1 in
  start) echo starting
  stop) echo stopping
  *) echo usage; exit 1
esac
```

Expected:

```text
$ ./broken-args.sh start
starting
$ ./broken-args.sh stop
stopping
$ ./broken-args.sh
usage
```

The last command’s status must be `1`. The first two must be `0`.

---

## Done when

You can put two commands on one line, quote so `$` does or does not expand, close a `case` arm so it does not fall through, and pull a file into **this** shell vs running it as a process.