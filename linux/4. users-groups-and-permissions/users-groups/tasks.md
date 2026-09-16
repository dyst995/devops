# Tasks — Users and groups

Close `theory.md`. Throwaway names only.

## Find this (`passwd` line)

1. Read your line in the user database. Label each colon field from the notes (name through shell).
2. Where is the **hash** and **expiry** if the second field is `x`? Why?
3. Show UID, primary GID, all groups (numeric and names). Show aging/expiry listing.
4. UID 0 is who? Where do human UIDs often start?

## Distinguish

5. Rename a throwaway login. Do files’ owner **numbers** change? Predict, then check.
6. `su` with login environment vs without. What differs (home, profile)?
7. One command as root via sudo (your password) vs a root shell. What password is asked?

## Construct users

8. Create a user with explicit home and bash. Set a password. Inspect passwd/shadow/group lines.
9. Change home path, login name, shell, account expiry date.
10. Append an extra group. Predict what happens if you set extra groups **without** append. Try on a throwaway, then fix or delete.
11. Delete a user leaving home; delete another **with** home.

## Groups

12. Create, rename, delete a group. Add a user as a supplementary member (two methods from the notes if both exist: usermod append vs gpasswd).
13. Primary GID vs extra groups — which file holds which?

## Repeat lock/nologin

14. Lock password login; try to authenticate; unlock. Set shell so interactive login is refused; try `su -`.

## Scenario

15. Provision `appuser`: UID 1500, bash, home, group `appgrp`, 90-day max password age, must change password at next login, in `wheel`. Evidence for each. Then remove.
