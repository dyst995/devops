# Commands to memorize

```bash
bash --login                 # force a login shell (reads /etc/profile + personal profile)
echo $0                      # current shell name; -bash often means login
shopt login_shell            # on = login shell, off = not

cat /etc/profile             # system-wide login startup
# first readable wins: ~/.bash_profile  then  ~/.bash_login  then  ~/.profile
cat ~/.bashrc                # interactive non-login (GUI terminal)
cat ~/.bash_logout           # runs when a login shell exits

# ~/.bash_profile usually sources ~/.bashrc so SSH login gets aliases
if [ -f ~/.bashrc ]; then
    . ~/.bashrc              # . is the same as source
fi
```
