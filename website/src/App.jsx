import { useCallback, useEffect, useState } from "react";
import MarkdownView from "./MarkdownView.jsx";
import Flashcards from "./Flashcards.jsx";
import {
  allTopics,
  availableTabs,
  defaultTab,
  findTopic,
  parseHash,
  setHash,
  splitAnswers,
  THEME_KEY,
} from "./lib.js";

export default function App() {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState(() => parseHash());
  const [note, setNote] = useState(null);
  const [labPath, setLabPath] = useState(null);
  const [answersOpen, setAnswersOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then(setCatalog)
      .catch(() => setError("Could not load the notes catalog."));
  }, []);

  useEffect(() => {
    const onHash = () => {
      setLabPath(null);
      setAnswersOpen(false);
      setRoute(parseHash());
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const found = catalog && route.topicDir ? findTopic(catalog, route.topicDir) : null;
  const topic = found?.topic;
  const tab = topic
    ? availableTabs(topic).some((t) => t.id === route.tab)
      ? route.tab
      : defaultTab(topic)
    : null;

  const filePath =
    topic && tab && tab !== "labs" ? topic.files[tab] : labPath;

  useEffect(() => {
    if (!filePath) {
      setNote(null);
      return;
    }
    setNote(null);
    let cancelled = false;
    fetch(`/api/file?path=${encodeURIComponent(filePath)}`)
      .then((r) => {
        if (!r.ok) throw new Error("missing");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setNote(data);
      })
      .catch(() => {
        if (!cancelled) setNote({ text: "Could not load this file.", path: filePath });
      });
    return () => {
      cancelled = true;
    };
  }, [filePath]);

  const openTopic = useCallback((trackId, topicObj, nextTab) => {
    setHash(trackId, topicObj.dir, nextTab || defaultTab(topicObj));
  }, []);

  if (error) return <p className="empty">{error}</p>;
  if (!catalog) return <p className="empty">Loading catalog…</p>;

  return (
    <>
      <aside id="sidebar">
        <div className="brand">
          <strong>DevOps notes</strong>
          <span>Study pack reader</span>
        </div>
        <label className="search-wrap">
          <input
            id="search"
            type="search"
            placeholder="Search topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <Nav
          catalog={catalog}
          query={query}
          activeDir={route.topicDir}
          activeTrack={route.trackId}
          onHome={(id) => setHash(id)}
          onTopic={openTopic}
        />
      </aside>
      <main id="main">
        <header id="topbar">
          <Crumbs catalog={catalog} route={route} found={found} />
          <button
            type="button"
            id="theme-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </header>
        {topic && (
          <div id="tabs">
            {availableTabs(topic).map((t) => (
              <button
                key={t.id}
                type="button"
                className={`tab${t.id === tab ? " active" : ""}`}
                onClick={() => {
                  setLabPath(null);
                  setAnswersOpen(false);
                  setHash(found.track.id, topic.dir, t.id);
                }}
              >
                {t.id === "labs" ? `Labs (${topic.labs.length})` : t.label}
              </button>
            ))}
          </div>
        )}
        <article id="content">
          <Page
            catalog={catalog}
            route={route}
            found={found}
            tab={tab}
            note={note}
            labPath={labPath}
            setLabPath={setLabPath}
            answersOpen={answersOpen}
            setAnswersOpen={setAnswersOpen}
            onOpenTopic={openTopic}
            onHome={(id) => setHash(id)}
          />
        </article>
      </main>
    </>
  );
}

function Nav({ catalog, query, activeDir, activeTrack, onHome, onTopic }) {
  const q = query.trim().toLowerCase();
  return (
    <nav id="nav">
      {catalog.tracks.map((track) => (
        <section key={track.id} className="track">
          <button type="button" onClick={() => onHome(track.id)}>
            {track.name}
          </button>
          {track.modules.map((mod) => {
            const topics = mod.topics.filter((t) => {
              if (!q) return true;
              return (
                t.name.toLowerCase().includes(q) ||
                t.title.toLowerCase().includes(q) ||
                mod.name.toLowerCase().includes(q) ||
                track.name.toLowerCase().includes(q)
              );
            });
            if (!topics.length) return null;
            return (
              <details
                key={mod.id}
                className="mod"
                {...(Boolean(q) || topics.some((t) => t.dir === activeDir)
                  ? { open: true }
                  : {})}
              >
                <summary>{mod.name}</summary>
                {topics.map((topic) => (
                  <button
                    key={topic.dir}
                    type="button"
                    className={`topic${topic.dir === activeDir ? " active" : ""}`}
                    onClick={() => onTopic(track.id, topic)}
                  >
                    {topic.name}
                  </button>
                ))}
              </details>
            );
          })}
        </section>
      ))}
    </nav>
  );
}

function Crumbs({ catalog, route, found }) {
  if (!route.trackId) return <div id="crumbs"><strong>All tracks</strong></div>;
  if (!found) {
    const track = catalog.tracks.find((t) => t.id === route.trackId);
    return <div id="crumbs"><strong>{track?.name || route.trackId}</strong></div>;
  }
  return (
    <div id="crumbs">
      {found.track.name} · {found.mod.name} · <strong>{found.topic.name}</strong>
    </div>
  );
}

function Page({
  catalog,
  route,
  found,
  tab,
  note,
  labPath,
  setLabPath,
  answersOpen,
  setAnswersOpen,
  onOpenTopic,
  onHome,
}) {
  if (!route.trackId) {
    return (
      <>
        <div className="md">
          <h1>Study pack</h1>
          <p>
            Notes, daily recall, commands, questions, assignments, tasks,
            hands-on practice, and labs — parsed from the repo. Checkboxes on
            recall, assignments, tasks, and hands-on are saved in this browser.
          </p>
        </div>
        <div className="home-grid">
          {catalog.tracks.map((track) => {
            const n = track.modules.reduce((a, m) => a + m.topics.length, 0);
            return (
              <button
                key={track.id}
                type="button"
                className="card"
                onClick={() => onHome(track.id)}
              >
                <h3>{track.name}</h3>
                <p>{n} topics</p>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  if (!found) {
    const track = catalog.tracks.find((t) => t.id === route.trackId);
    return (
      <>
        <div className="md">
          <h1>{track.name}</h1>
        </div>
        <div className="home-grid">
          {allTopics(catalog)
            .filter((x) => x.track.id === track.id)
            .map((item) => (
              <button
                key={item.topic.dir}
                type="button"
                className="card"
                onClick={() => onOpenTopic(track.id, item.topic)}
              >
                <h3>{item.topic.name}</h3>
                <p>{item.mod.name}</p>
              </button>
            ))}
        </div>
      </>
    );
  }

  const { topic } = found;

  if (tab === "labs" && !labPath) {
    return (
      <>
        <div className="md">
          <h1>Labs</h1>
          <p>Tickets only — no solutions in these files.</p>
        </div>
        <div className="lab-list">
          {topic.labs.map((lab) => (
            <button key={lab.path} type="button" onClick={() => setLabPath(lab.path)}>
              {lab.title}
            </button>
          ))}
        </div>
      </>
    );
  }

  if (!note) return <p className="empty">Loading…</p>;

  if (tab === "flashcards") {
    if (!note.data?.cards?.length) {
      return <p className="empty">No flashcards in this deck.</p>;
    }
    return <Flashcards deck={note.data} />;
  }

  if (tab === "labs" && labPath) {
    return (
      <>
        <p>
          <button type="button" className="tab" onClick={() => setLabPath(null)}>
            ← All labs
          </button>
        </p>
        <MarkdownView text={note.text} />
      </>
    );
  }

  if (tab === "questions") {
    const { body, answers } = splitAnswers(note.text);
    return (
      <>
        <MarkdownView text={body} />
        {answers && (
          <div className={`answers${answersOpen ? " open" : ""}`}>
            <button type="button" onClick={() => setAnswersOpen((v) => !v)}>
              {answersOpen ? "Hide answers" : "Show answers"}
            </button>
            <div className="body">
              <MarkdownView text={answers} />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <MarkdownView
      text={note.text}
      storageKey={
        tab === "assignments" ||
        tab === "tasks" ||
        tab === "practice" ||
        tab === "recall"
          ? note.path
          : null
      }
    />
  );
}
