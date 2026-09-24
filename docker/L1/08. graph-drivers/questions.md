# Graph drivers — Questions

Cover the Answers section. Answer first, then check.

1. Why “graph” driver? Does Tomcat manage layers?
2. VFS: Union FS / CoW? Production?
3. AUFS: which distros default? Shared libraries? Quotas?
4. Overlay2: preferred where? Extra config? What old Overlay bug does it fix?
5. DeviceMapper: what kind of device? Out-of-the-box speed? RHEL?
6. Btrfs: what must be formatted btrfs? Default graph path? RHEL? When did daemon quota land?
7. Practice machine vs production — which drivers?

---

## Answers

1. Layers form a graph of relationships. No — the graph driver does.
2. No. No — poor performance; tests only.
3. Ubuntu / Debian. Yes (same layer → shared pages). No quota.
4. All currently supported Linux distros. None. Inode exhaustion (and other old Overlay bugs).
5. Block devices. No — you must tune. Yes.
6. The graph-driver root. `/var/lib/docker`. No. Docker 1.12 (PR #19651).
7. Practice: **overlay2**. Production: **DeviceMapper** (prepared device) or **Btrfs** (btrfs FS).
