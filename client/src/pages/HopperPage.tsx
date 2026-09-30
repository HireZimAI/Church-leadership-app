/**
 * The Hopper — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 * Personal idea capture system for ministry leaders
 */
import { useState } from "react";
import { Lightbulb, Plus, Search, ArrowRight, Trash2, Edit2, Lock, Unlock, Star, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES = ["All", "Sermon", "Series", "Outreach", "Planning", "Team", "Initiative"];

const IDEAS = [
  { id: 1, title: "Series idea: 'Roots & Branches'", body: "A 6-week series exploring our spiritual heritage and future growth. Could tie into the Dedication phase of the Playbook.", tags: ["Sermon", "Series"], date: "Jun 12", private: false, starred: true },
  { id: 2, title: "Community garden ministry initiative", body: "Partner with local schools to create a community garden. Serves as both a discipleship and outreach tool.", tags: ["Outreach", "Initiative"], date: "Jun 10", private: false, starred: false },
  { id: 3, title: "Leadership retreat — mountain venue?", body: "Annual leadership retreat. Consider a mountain venue for Semester 3 planning. Need to check availability with the team.", tags: ["Planning", "Team"], date: "Jun 8", private: true, starred: true },
  { id: 4, title: "Mentorship pairing system", body: "Create a formal mentorship program pairing senior leaders with emerging leaders across all Circles.", tags: ["Team", "Initiative"], date: "Jun 5", private: false, starred: false },
  { id: 5, title: "Digital prayer wall for the congregation", body: "An interactive display in the lobby where members can post prayer requests. Could integrate with the Spirit Circle.", tags: ["Initiative", "Outreach"], date: "Jun 2", private: false, starred: false },
  { id: 6, title: "Quarterly leadership podcast", body: "Record short 15-minute leadership reflections from each Circle leader. Archive in the Playbook for future cohorts.", tags: ["Team", "Series"], date: "May 28", private: false, starred: false },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Sermon:     { bg: "oklch(0.93 0.08 262)", text: "var(--brand-blue)" },
  Series:     { bg: "oklch(0.93 0.07 160)", text: "var(--circle-community)" },
  Outreach:   { bg: "oklch(0.93 0.08 75)",  text: "var(--brand-gold)" },
  Planning:   { bg: "oklch(0.93 0.06 300)", text: "var(--circle-spirit)" },
  Team:       { bg: "oklch(0.93 0.07 20)",  text: "var(--circle-creative)" },
  Initiative: { bg: "oklch(0.93 0.06 200)", text: "var(--circle-mission)" },
};

export default function HopperPage() {
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaBody, setNewIdeaBody] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [ideas, setIdeas] = useState(IDEAS);

  const filtered = ideas.filter(i => {
    const matchCat = activeCategory === "All" || i.tags.includes(activeCategory);
    const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.body.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const starredCount = ideas.filter(i => i.starred).length;

  const captureIdea = () => {
    if (!newIdeaTitle.trim()) return;
    const newIdea = {
      id: ideas.length + 1,
      title: newIdeaTitle,
      body: newIdeaBody,
      tags: [activeCategory !== "All" ? activeCategory : "Planning"],
      date: "Jun 12",
      private: false,
      starred: false,
    };
    setIdeas(prev => [newIdea, ...prev]);
    setNewIdeaTitle("");
    setNewIdeaBody("");
    toast.success("Idea captured in The Hopper!");
  };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, starred: !i.starred } : i));
  };

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            The Hopper
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {ideas.length} ideas captured · {starredCount} starred
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "oklch(0.96 0.08 75)", color: "oklch(0.45 0.14 75)", border: "1px solid oklch(0.88 0.10 75)" }}>
            <Lightbulb size={12} /> Idea Capture Mode
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Quick Capture + Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Quick Capture */}
          <div className="bento-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "oklch(0.96 0.08 75)" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.78 0.14 75)" }}>
                <Lightbulb size={12} style={{ color: "white" }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "oklch(0.35 0.12 75)" }}>Capture an Idea</span>
            </div>
            <div className="p-4 space-y-3">
              <input
                value={newIdeaTitle}
                onChange={e => setNewIdeaTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && captureIdea()}
                placeholder="Give your idea a title…"
                className="w-full text-sm px-3 py-2.5 rounded-xl outline-none transition-all"
                style={{
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
              <textarea
                value={newIdeaBody}
                onChange={e => setNewIdeaBody(e.target.value)}
                placeholder="Add more detail (optional)…"
                rows={3}
                className="w-full text-sm px-3 py-2.5 rounded-xl outline-none resize-none transition-all leading-relaxed"
                style={{
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
              <div className="flex flex-wrap gap-1 mb-1">
                {["Sermon", "Outreach", "Planning"].map(tag => {
                  const tc = TAG_COLORS[tag];
                  return (
                    <button key={tag}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium transition-all hover:scale-105"
                      style={{ background: tc.bg, color: tc.text }}
                      onClick={() => toast.info(`Tag: ${tag}`)}>
                      <Hash size={9} /> {tag}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={captureIdea}
                disabled={!newIdeaTitle.trim()}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-40"
                style={{ background: "oklch(0.78 0.14 75)", color: "white" }}>
                <Plus size={14} /> Capture Idea
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="bento-card">
            <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold">Categories</span>
            </div>
            <div className="p-3 space-y-1">
              {CATEGORIES.map(c => {
                const count = c === "All" ? ideas.length : ideas.filter(i => i.tags.includes(c)).length;
                return (
                  <button key={c}
                    onClick={() => setActiveCategory(c)}
                    className={cn("w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-left")}
                    style={activeCategory === c
                      ? { background: "var(--brand-navy)", color: "white" }
                      : { color: "var(--foreground)" }}>
                    <span>{c}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        background: activeCategory === c ? "rgba(255,255,255,0.2)" : "var(--muted)",
                        color: activeCategory === c ? "white" : "var(--muted-foreground)",
                      }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Ideas Grid */}
        <div className="lg:col-span-2">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <Search size={13} style={{ color: "var(--muted-foreground)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ideas…"
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: "var(--foreground)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-xs" style={{ color: "var(--muted-foreground)" }}>✕</button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="bento-card flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
                <Lightbulb size={20} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>No ideas match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map(idea => (
                <div key={idea.id}
                  className="bento-card p-4 group cursor-pointer hover:shadow-md transition-all"
                  onClick={() => toast.info("Opening idea detail…")}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold leading-snug flex-1">{idea.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        className="p-1 rounded-lg transition-all hover:scale-110"
                        onClick={e => toggleStar(idea.id, e)}>
                        <Star size={13} fill={idea.starred ? "var(--brand-gold)" : "none"}
                          style={{ color: idea.starred ? "var(--brand-gold)" : "var(--muted-foreground)" }} />
                      </button>
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded-lg hover:bg-muted transition-colors"
                          onClick={e => { e.stopPropagation(); toast.info("Edit idea"); }}>
                          <Edit2 size={11} style={{ color: "var(--muted-foreground)" }} />
                        </button>
                        <button className="p-1 rounded-lg hover:bg-muted transition-colors"
                          onClick={e => { e.stopPropagation(); toast.info("Delete idea"); }}>
                          <Trash2 size={11} style={{ color: "var(--muted-foreground)" }} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-3 line-clamp-3" style={{ color: "var(--muted-foreground)" }}>{idea.body}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {idea.tags.map(tag => {
                        const tc = TAG_COLORS[tag] || { bg: "var(--muted)", text: "var(--muted-foreground)" };
                        return (
                          <span key={tag} className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: tc.bg, color: tc.text, fontSize: "0.625rem" }}>
                            <Hash size={8} /> {tag}
                          </span>
                        );
                      })}
                      {idea.private && (
                        <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.625rem" }}>
                          <Lock size={8} /> Private
                        </span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                      {idea.date}
                    </span>
                  </div>

                  {/* Convert to project — hover action */}
                  <div className="mt-3 pt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderTop: "1px solid var(--border)" }}>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold hover:gap-2 transition-all"
                      style={{ color: "var(--brand-blue)" }}
                      onClick={e => { e.stopPropagation(); toast.success("Converting to assignment…"); }}>
                      Convert to Assignment <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
