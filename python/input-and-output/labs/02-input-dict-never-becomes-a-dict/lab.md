# Input dict never becomes a dict

`import json` then `d = json.loads(input('Input dict:'))` then `print(d)`.

The slide types `{1: 'one', 2: 'two'}`. Get a **dict** in `d` (valid JSON at the prompt if the literal form fails). `print(d)` should show a dict, not the raw string from `input`.

**Goal:** `d` is a dict after `loads`. Know `input` is still a string until you parse it. Prompt text is `Input dict:`.
