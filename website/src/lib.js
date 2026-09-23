export const TAB_META = [
  { id: "study", label: "Notes" },
  { id: "theory", label: "Original theory" },
  { id: "commands", label: "Commands" },
  { id: "questions", label: "Questions" },
  { id: "assignments", label: "Assignments" },
  { id: "tasks", label: "Tasks" },
  { id: "labs", label: "Labs" },
];

export const STORE_KEY = "devops-notes-progress";
export const THEME_KEY = "devops-notes-theme";

export function allTopics(catalog) {
  const out = [];
  for (const track of catalog.tracks) {
    for (const mod of track.modules) {
      for (const topic of mod.topics) {
        out.push({ track, mod, topic });
      }
    }
  }
  return out;
}

export function findTopic(catalog, dir) {
  return allTopics(catalog).find((x) => x.topic.dir === dir);
}

export function defaultTab(topic) {
  if (topic.files.study) return "study";
  if (topic.files.theory) return "theory";
  if (topic.files.assignments) return "assignments";
  return Object.keys(topic.files)[0] || "labs";
}

export function availableTabs(topic) {
  return TAB_META.filter((t) =>
    t.id === "labs" ? topic.labs.length : Boolean(topic.files[t.id]),
  );
}

export function parseHash() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const parts = raw.split("/").filter(Boolean);
  if (!parts.length) return {};
  if (parts.length === 1) return { trackId: parts[0] };
  return {
    trackId: parts[0],
    topicDir: parts.slice(1, -1).join("/"),
    tab: parts.at(-1),
  };
}

export function setHash(trackId, topicDir, tab) {
  if (!trackId) {
    location.hash = "";
    return;
  }
  if (!topicDir) {
    location.hash = `#/${trackId}`;
    return;
  }
  location.hash = `#/${trackId}/${topicDir}/${tab}`;
}

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function splitAnswers(md) {
  const re = /^##\s+Answers\s*$/m;
  const idx = md.search(re);
  if (idx === -1) return { body: md, answers: "" };
  return { body: md.slice(0, idx), answers: md.slice(idx) };
}
