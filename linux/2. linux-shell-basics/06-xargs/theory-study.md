# 06 — xargs (study)

**`xargs`** reads arguments from **standard input**, split on **blank spaces or newlines**, and runs a command using that input as the command’s **arguments**. Default command if you omit one: **`/bin/echo`**.

```text
xargs [OPTIONS] [COMMAND [initial-arguments]]
```

This is the other half of [find](../05-filesystem-search/theory.md): `find` prints paths, `xargs` turns those lines into arguments.

| Form | What happens |
| --- | --- |
| `cat names.txt \| xargs` | Default `echo` — many lines become **one** echoed line |
| `xargs cmd` | **One** `cmd` with **many** extra args |
| `xargs -i cmd {}` or `-I {}` | **One `cmd` per item**; `{}` (or another marker) is replaced. GNU prefers `-I {}` over `-i` |
| `xargs -iT touch T` | Same idea; placeholder is `T` instead of `{}` |

```bash
cat names.txt | xargs -i touch {}
find /tmp -name core -type f -print0 | xargs -0 rm
cat urls.txt | xargs -P 4 -I {} curl -O {}
```

**`-0` / `--null`:** items end with a **null** byte, not whitespace. Quotes and backslashes are **not** special — every character is literal. Use when names may contain **spaces, quotes, or backslashes**. Pair with `find … -print0`. Default `xargs` splits on spaces and will break those names.

**`-P` / `--max-procs`:** run up to that many processes at a time (default **1**). Speeds work on multicore. **`-P 0`** = as many processes as possible (be careful).

More examples: [Tecmint xargs](https://www.tecmint.com/xargs-command-examples/) · [Linuxize xargs](https://linuxize.com/post/linux-xargs-command/).
