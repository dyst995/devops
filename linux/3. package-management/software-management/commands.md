# Commands to memorize

```bash
sudo apt-get update              # refresh package lists from repos (does not upgrade software)
sudo apt-get upgrade             # upgrade already installed packages
sudo apt-get install nginx       # install by package name, not nginx.deb
sudo apt-get remove nginx        # remove package; config files may stay
sudo apt-get purge nginx         # remove package and its config files
sudo apt-get check               # verify no broken dependencies

apt-cache search nginx           # regex search of the package cache
apt-cache show nginx             # readable record for the package
apt-cache showpkg nginx          # general info for one package
apt-cache depends nginx          # raw dependency list

ls /etc/apt/sources.list /etc/apt/sources.list.d/     # where APT looks for repos
cat /etc/apt/sources.list                             # main repo list (deb URL release components)
```
