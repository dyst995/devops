import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

export const REPO = join(import.meta.dirname, "..");

const TRACKS = ["linux", "bash", "python", "docker"];
const DOC_FILES = {
  "theory-study.md": "study",
  "theory.md": "theory",
  "commands.md": "commands",
  "questions.md": "questions",
  "assignments.md": "assignments",
  "tasks.md": "tasks",
  "hands-on-practice.md": "practice",
  "recall.md": "recall",
};
const SKIP = new Set([".git", "website", "node_modules", "__pycache__", ".cursor"]);

function prettyDir(name) {
  const s = name.replace(/^\d+[\.\-]\s*/, "").replace(/[-_]/g, " ");
  return s
    .split(" ")
    .map((w) => (w === w.toLowerCase() ? w.replace(/^./, (c) => c.toUpperCase()) : w))
    .join(" ");
}

function firstHeading(file) {
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/).slice(0, 40)) {
      if (line.startsWith("# ")) return line.slice(2).trim();
    }
  } catch {
    /* ignore */
  }
  return null;
}

function listDir(dir) {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

function isTopicDir(dir) {
  return listDir(dir).some((name) => name in DOC_FILES);
}

function collectLabs(topicDir) {
  const labsDir = join(topicDir, "labs");
  let names = [];
  try {
    names = readdirSync(labsDir);
  } catch {
    return [];
  }
  return names
    .sort()
    .map((id) => {
      const file = join(labsDir, id, "lab.md");
      try {
        if (!statSync(file).isFile()) return null;
      } catch {
        return null;
      }
      return {
        id,
        title: firstHeading(file) || prettyDir(id),
        path: relative(REPO, file).split(sep).join("/"),
      };
    })
    .filter(Boolean);
}

function walk(dir, acc) {
  for (const name of listDir(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    let st;
    try {
      st = statSync(path);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(path, acc);
  }
  if (isTopicDir(dir)) acc.push(dir);
}

export function buildCatalog() {
  const tracks = [];
  for (const trackId of TRACKS) {
    const root = join(REPO, trackId);
    const topicDirs = [];
    walk(root, topicDirs);
    const modules = new Map();

    for (const path of topicDirs.sort()) {
      const rel = relative(root, path).split(sep);
      if (rel.length === 1 && rel[0] === "") continue;
      const topicId = rel[rel.length - 1];
      const moduleParts = rel.slice(0, -1);
      const moduleId = moduleParts.join("/");
      const moduleName = moduleParts.length
        ? moduleParts.map(prettyDir).join(" / ")
        : "Topics";

      const files = {};
      for (const [filename, kind] of Object.entries(DOC_FILES)) {
        const fp = join(path, filename);
        try {
          if (statSync(fp).isFile()) {
            files[kind] = relative(REPO, fp).split(sep).join("/");
          }
        } catch {
          /* missing */
        }
      }
      if (!Object.keys(files).length) continue;

      const topic = {
        id: topicId,
        name: prettyDir(topicId),
        title:
          firstHeading(join(path, "theory-study.md")) ||
          firstHeading(join(path, "theory.md")) ||
          prettyDir(topicId),
        dir: relative(REPO, path).split(sep).join("/"),
        files,
        labs: collectLabs(path),
      };

      if (!modules.has(moduleId)) {
        modules.set(moduleId, {
          id: moduleId || trackId,
          name: moduleName,
          topics: [],
        });
      }
      modules.get(moduleId).topics.push(topic);
    }

    const rootTasks = join(root, "tasks.md");
    try {
      if (statSync(rootTasks).isFile()) {
        const topic = {
          id: "tasks",
          name: "Track tasks",
          title: firstHeading(rootTasks) || `${trackId} tasks`,
          dir: `${trackId}/tasks`,
          files: {
            tasks: relative(REPO, rootTasks).split(sep).join("/"),
          },
          labs: [],
        };
        if (!modules.has("")) {
          modules.set("", {
            id: trackId,
            name: "Topics",
            topics: [],
          });
        }
        modules.get("").topics.unshift(topic);
      }
    } catch {
      /* no track-level tasks */
    }

    const rootRecall = join(root, "recall.md");
    try {
      if (statSync(rootRecall).isFile()) {
        const topic = {
          id: "recall",
          name: "Daily recall",
          title: firstHeading(rootRecall) || `${trackId} daily recall`,
          dir: `${trackId}/recall`,
          files: {
            recall: relative(REPO, rootRecall).split(sep).join("/"),
          },
          labs: [],
        };
        if (!modules.has("")) {
          modules.set("", {
            id: trackId,
            name: "Topics",
            topics: [],
          });
        }
        modules.get("").topics.unshift(topic);
      }
    } catch {
      /* no track-level recall */
    }

    tracks.push({
      id: trackId,
      name: trackId[0].toUpperCase() + trackId.slice(1),
      modules: [...modules.values()],
    });
  }
  return { tracks };
}

export function readNote(rel) {
  if (!rel || rel.includes("..") || !rel.endsWith(".md")) return null;
  const root = resolve(REPO);
  const resolved = resolve(root, rel);
  if (!resolved.startsWith(root + sep) && resolved !== root) return null;
  try {
    return { path: rel, text: readFileSync(resolved, "utf8") };
  } catch {
    return null;
  }
}
