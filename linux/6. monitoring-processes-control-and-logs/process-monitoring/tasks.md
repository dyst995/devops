# Tasks — Process monitoring

Close `theory.md`. Kill only processes you start.

## top

1. Open the live list. Where are load averages and memory? Sort by CPU, then memory, quit. (Keys from the notes.)
2. Predict: is this a movie or a photo?

## ps

3. Snapshot everyone including daemons, with user-oriented columns. Recite what `a`, `u`, `x` mean.
4. Find a PID by name. Watch for the search matching itself.

## kill vs killall (repeat)

5. Start a long `sleep`. Stop it with the default signal (TERM/15). Confirm it exited.
6. Start another. Force with 9. Same with the signal **name** form on `killall` for a **disposable** name you choose carefully (`sleep` kills every sleep).
7. Predict: polite vs force — does cleanup run? Can you signal another user’s process as non-root?

## Scenario

8. A hog ignores polite stop. Identify by live list or snapshot, force it, confirm CPU drops. Do not hit sshd.
9. Prefer PID when you mean **one** Java; say why name-based stop is dangerous (notes).
