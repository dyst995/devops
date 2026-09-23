# 03 — Text editors (study)

Text editors create and edit **plain text** (configs, scripts, notes — not Word). Most used on Unix today: **vi / vim** and **nano**.

Default editor:

```bash
export EDITOR=vim    # or nano
```

`visudo`, `crontab -e`, and `git commit` honor `EDITOR` (or `VISUAL`). On a server you will live in an editor. Know **vim** (always there) and **nano** (easier). Never open `/etc/sudoers` with a normal editor.

## vi / vim

**vi** (visual editor) was written by **Bill Joy** in **1976** as part of **BSD Unix** (he later co-founded Sun). It became the standard Unix full-screen editor and is still the editor you can expect on **any** Unix system.

**Vim** = **Vi IMproved** (it used to mean Vi IMitation). Almost all original vi commands plus many new ones.

```bash
vim file_to_edit.txt
vimtutor                 # learn by doing
```

Guides: [Vim 101](https://www.linux.com/tutorials/vim-101-beginners-guide-vim/) · [vim-adventures.com](https://vim-adventures.com/)

### Three modes

Vim always starts in **Command**. Typed characters become file text only in **Insert**. `Esc` returns to Command. `:` talks to the last line.

```
          i (or a, o, …)
Command  ──────────────►  Insert
   ▲                         │
   │         Esc             │
   └─────────────────────────┘
   │  :
   ▼
Last-line   ( :w  :q  :wq  :q! )
```

| Mode | How you get there | Keystrokes mean |
| --- | --- | --- |
| **Command** (Normal) | Default; **`Esc`** from anywhere | Commands: move, delete, search, yank — **not** file text |
| **Insert** | From Command: **`i`** (and friends) | Keys are **text** in the file |
| **Last-line** (Ex) | From Command: **`:`** | Save, quit, run commands |

### Command mode

| Keys | Action |
| --- | --- |
| `h` `j` `k` `l` | left / down / up / right (inverted-T) |
| `w` `b` | next / previous word |
| `0` `$` | start / end of line |
| `gg` `G` | first / last line |
| `Ctrl-u` `Ctrl-d` | half page up / down |
| `:n` Enter | go to line *n* (last-line, used for jumping) |
| `x` | delete character |
| `dd` / `dw` | delete line / to end of word |
| `yy` | yank (copy) line |
| `p` / `P` | paste after / before |
| `u` / `Ctrl-r` | undo / redo |
| `i` `a` | insert before cursor / append after |
| `o` `O` | new line below / above and enter Insert |
| `/pattern` `?pattern` | search forward / backward |
| `n` `N` | next / previous match (same or reverse direction) |

Double letter = whole line (`dd`, `yy`). `/` searches forward like a URL.

### Last-line

| Command | Action |
| --- | --- |
| `:w` | write (save) |
| `:q` | quit (fails if unsaved) |
| `:wq` or `:x` | save and quit |
| `:q!` | quit **without** saving |
| `:set number` | line numbers |
| `:!command` | run a shell command (e.g. `:!ls`) |

Panic combo: `Esc` then `:wq`. `!` forces.

## nano

Small, friendly, **modeless**: ordinary keys always type text. Commands use **Control** (`^` = Ctrl) or **Meta** (`M-` = Alt or Cmd). Besides basic editing: undo/redo, syntax coloring, search-and-replace, auto-indent, line numbers, word completion, file locking, backup files, internationalization. The cheatsheet is on screen.

```bash
nano file_to_edit.txt
```

| Binding | Command | What it does |
| --- | --- | --- |
| `^K` | Cut Text | cut the **whole current line** into the cutbuffer |
| `^U` | Uncut Text | paste the cutbuffer |
| `M-6` | Copy Text | copy the line **without** cutting |
| `^O` | Write Out | save |
| `^X` | Exit | quit (asks to save if needed) |
| `^W` | Where Is | search |

## visudo

**`visudo`** is the **safe** way to edit **`/etc/sudoers`**. Bad syntax can lock you out of **elevated privileges** — `sudo` may be your only path to root. `visudo` validates syntax on save and refuses a broken file.

Traditionally it opens **vi**. **Ubuntu** often configures **nano**.

```bash
sudo visudo
```
