# first argument is empty

`print_args /tmp hello` should print the two course lines (`first function argument is: /tmp`, `second … hello`). Arguments are positional (`$1`, `$2`). `local` should hold copies inside the function.

Right now both lines are empty, or the values leak into the rest of the script.

**Goal:** Match the sample. `$1` / `$2` as positional parameters. `local var1` / `var2`. Call: `print_args $arg1 $arg2`.
