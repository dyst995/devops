# reverse still reads forward

`what[::-1]` must be `'daed si torrap sihT'`. `what[:]` is a copy of the original. `what[1:-1:2]` must be `'hspro sda'`.

Right now step is omitted or stop/start are swapped so the string still reads left to right.

**Goal:** Reverse, copy, and stepped slice match the notes. Explain start / stop / step.
