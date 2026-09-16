# 03 — Text Editors

Text editors are among the most used applications on Unix. They create and edit files in **plain text** (configs, scripts, notes — not Word documents).

Most popular today:

- **vi / vim**
- **nano**

The default editor is set with the **`EDITOR`** environment variable (see [02 — Shell programming](02-shell-programming.md)):

```bash
export EDITOR=vim
# or
export EDITOR=nano
```

Tools such as `visudo`, `crontab -e`, and `git commit` honor `EDITOR` (or `VISUAL`).

**Memory hook:** on a server you will live in an editor. Know **vim** (always there) and **nano** (easier). Never “just open” `/etc/sudoers`.

## vi / vim

**vi** (visual editor) was written by **Bill Joy** in **1976** as part of **BSD Unix**. He later co-founded Sun Microsystems. vi became the standard Unix full-screen editor and is still the editor you can expect on **any** Unix system.

**Vim** = **Vi IMproved** (it used to mean Vi IMitation; the extra features earned a new name). It includes almost all original vi commands plus many new ones.

```bash
vim file_to_edit.txt
```

Learn by doing:

```bash
vimtutor
```

Guides: [Vim 101](https://www.linux.com/tutorials/vim-101-beginners-guide-vim/) · [vim-adventures.com](https://vim-adventures.com/)

### Three modes

| Mode | How you get there | What keystrokes mean |
| --- | --- | --- |
| **Command** (Normal) | Default at startup; **`Esc`** from any other mode | Keys are **commands**, not text. Move, delete, search, yank. Typed characters do **not** appear as file text. |
| **Insert** (Input) | From Command: **`i`** (and friends) | Keys are **text** inserted into the file. |
| **Last-line** (Ex / Escape) | From Command: **`:`** | Cursor jumps to the **last line**. Save, quit, run commands. |

**Memory hook:** Vim always starts in **Command**. Type to *change the file* only in **Insert**. `Esc` = back to Command. `:` = talk to the last line.

```
          i (or a, o, …)
Command  ──────────────►  Insert
   ▲                         │
   │         Esc             │
   └─────────────────────────┘
   │
   │  :
   ▼
Last-line   ( :w  :q  :wq  :q! )
```

### Command mode — navigation

| Key | Move |
| --- | --- |
| `h` `j` `k` `l` | left / down / up / right |
| `w` `b` | next word / previous word |
| `0` `$` | start / end of line |
| `gg` `G` | first / last line of file |
| `Ctrl-u` `Ctrl-d` | half page up / down |
| `:n` then Enter | line *n* (this is last-line, but used for jumping) |

**Memory hook:** `hjkl` is the inverted-T. `gg` ground floor, `G` Ground of the file (the end).

### Command mode — editing

| Key | Action |
| --- | --- |
| `x` | delete character under cursor |
| `dd` | delete (cut) whole line |
| `dw` | delete to end of word |
| `yy` | yank (copy) line |
| `p` / `P` | paste after / before |
| `u` | undo |
| `Ctrl-r` | redo |
| `i` `a` | insert before cursor / append after cursor |
| `o` `O` | new line below / above and enter Insert |

**Memory hook:** double letter = whole line (`dd`, `yy`). `p` = put.

### Command mode — searching

| Key | Action |
| --- | --- |
| `/pattern` | search forward |
| `?pattern` | search backward |
| `n` | next match (same direction) |
| `N` | previous match |

**Memory hook:** `/` go forward like a URL. `n` = next.

### Last-line mode

Type `:` while in Command mode, then:

| Command | Action |
| --- | --- |
| `:w` | write (save) |
| `:q` | quit (fails if unsaved changes) |
| `:wq` or `:x` | save and quit |
| `:q!` | quit **without** saving |
| `:set number` | show line numbers |
| `:!command` | run a shell command (e.g. `:!ls`) |

**Memory hook:** `w`rite, `q`uit, `!` force. Save the panic combo: `Esc` then `:wq`.

## nano

**nano** is a small, friendly editor. Besides basic editing it offers undo/redo, syntax coloring, interactive search-and-replace, auto-indent, line numbers, word completion, file locking, backup files, and internationalization.

nano is **modeless**: ordinary keys always type text. Commands use **Control** (`Ctrl`, written **`^`**) or **Meta** (`Alt` or `Cmd`, written **`M-`**).

```bash
nano file_to_edit.txt
```

| Binding | Command | What it does |
| --- | --- | --- |
| `^K` | Cut Text | cut the **whole current line** into the cutbuffer |
| `^U` | Uncut Text | paste the cutbuffer |
| `M-6` | Copy Text | copy the line into the cutbuffer **without** cutting |
| `^O` | Write Out | save |
| `^X` | Exit | quit (asks to save if needed) |
| `^W` | Where Is | search |

**Memory hook:** nano shows the cheatsheet on screen. `^` = Ctrl. Cut/paste is `^K` / `^U` (kill / uncut). Copy is `M-6`.

## visudo

**`visudo`** is the **safe** way to edit **`/etc/sudoers`**, the file that configures the `sudo` command.

**Never edit `/etc/sudoers` with a normal editor. Always use `visudo`.**

Bad syntax in that file can lock you out of **elevated privileges**. `sudo` may be your only path to root. `visudo` opens an editor like normal, but **validates syntax on save** and refuses a broken file.

- Traditionally `visudo` opens **vi**
- **Ubuntu** configures it to open **nano**

```bash
sudo visudo
```

**Memory hook:** `sudoers` + typo = no sudo. `visudo` = editor **plus a syntax check**.
