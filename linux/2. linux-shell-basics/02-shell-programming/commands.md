# Commands to memorize

```bash
KEY=value                              # assign; no spaces around =
ANOTHER_KEY="Some other value"         # quotes if the value has spaces
KEY_MULTI=value1:value2                # multiple values separated by :

echo "$HOME"                           # print one variable (quote it)
echo "$PATH"                           # directories searched for commands, first match wins
env                                    # dump exported environment variables
set                                    # dump shell vars + env + functions (huge)
bash -x script.sh                      # run a script with each command printed (debug)
```
