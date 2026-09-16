# Commands to memorize

```bash
bash --login                 # start a login shell (reads profile files)
echo $0                      # current shell name; -bash often means login
shopt login_shell            # on/off — is this a login shell?

# ~/.bash_profile sources ~/.bashrc so login shells get aliases too
if [ -f ~/.bashrc ]; then
    . ~/.bashrc              # . is the same as source
fi
```
