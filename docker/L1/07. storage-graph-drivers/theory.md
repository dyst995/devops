# Docker storage (graph) drivers

## Union filesystem

**Union FS** overlays **branches** (separate filesystems) so they look like **one** filesystem. Directories with the **same path** in different branches appear as **one merged** directory in the virtual tree.

## Copy-on-write (CoW)

Share files until someone **writes**. If a file lives in a **lower** layer and a higher layer (including the writable one) only **reads** it, it uses the **existing** file. The **first modify** (build or run) **copies** the file into **that** layer and changes the copy. Less I/O; later layers stay **small**.

## Image layers vs container layer

All **image** layers are **read-only**. On `run`, Docker adds a thin **r/w container layer** that holds only the **delta** (new and updated files). Reads of unchanged data go down to the read-only stack (e.g. CentOS base).

```text
                    Thin r/w layer          ← container layer (delta only)
                         ↕ ↕ ↕ ↕
              ┌─────────────────────────┐
              │ Tomcat installed        │
              │ Java installed          │  ← read-only image layers
              │ CentOS updates          │
              │ CentOS base             │
              └─────────────────────────┘
```

Start a process, create files → they land on the **thin r/w** layer. Need a file from the base → read the **read-only** layer.

## Disadvantage

**Performance** — and layer bloat. The same image can start **many** containers (each gets its own thin r/w). But if a **5 GB** file (e.g. a database) is in a lower layer and you change **one byte**, CoW **copies the whole 5 GB** into the r/w layer. `docker commit` then **adds those 5 GB** as a new layer. That is the major downside.

Best fit: a **lightweight** app, image around **100 MB**. Watch what the process **writes** at this layer.

**Memory hook:** Union FS merges branches. CoW copies on first write. Image = RO layers. Container = thin r/w delta. Don’t CoW a 5 GB DB.
