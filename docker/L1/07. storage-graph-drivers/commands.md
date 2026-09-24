# Commands to memorize

```text
# Union FS — overlay branches → one filesystem
# CoW      — read lower layer in place; first write copies the file up
# Image    — all layers read-only
# Container layer — thin r/w: only new/updated files (delta)

# CentOS base → updates → Java → Tomcat   (RO)
# + thin r/w                                 (container)

# Disadvantage: change 1 byte in a 5 GB file → copy 5 GB to r/w
#               commit → extra 5 GB layer
# Prefer ~100 MB lightweight images; watch writes
```
