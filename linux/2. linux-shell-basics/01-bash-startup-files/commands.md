# Commands to memorize

```bash
bash --login                 # login shell as YOU (read profile files). Not root.
bash -l                      # same as --login
su                           # switch to root (root’s password)
su -                         # switch to root with root’s login environment
su user                      # switch to that user
su - user                    # switch to that user with their login environment
echo $0                      # current shell name; -bash often means login
shopt login_shell            # on/off — is this a login shell?

# ~/.bash_profile sources ~/.bashrc so login shells get aliases too
if [ -f ~/.bashrc ]; then
    . ~/.bashrc              # POSIX (works in sh). Same effect as source in Bash
fi
# source ~/.bashrc           # Bash only — not required by POSIX; dash/sh may lack it
```
