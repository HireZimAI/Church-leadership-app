/**
 * Search — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 * Global search with type filters, keyword highlighting, archive toggle
 */
import { useState } from "react";
import {
  Search, MessageSquare, ClipboardList, BookOpen, FolderOpen,
  Calendar, Lightbulb, Archive, ChevronRight, Clock, Hash
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FILTERS = [
  { id: "all",        label: "All",         icon: <Search size={11} />       },
  { id: "thread",     label: "Threads",     icon: <MessageSquare size={11} /> },
  { id: "assignment", label: "Assignments", icon: <ClipboardList size={11} /> },
  { id: "document",   label: "Documents",   icon: <FolderOpen size={11} />    },
  { id: "playbook",   label: "Playbook",    icon: <BookOpen size={11} />      },
  { id: "calendar",   label: "Calendar",    icon: <Calendar size={11} />      },
  { id: "hopper",     label: "Hopper",      icon: <Lightbulb size={11} />     },
];

const RESULTS = [
  {
    id: 1, type: "thread", color: "var(--circle-community)",
    title: "Q3 Event Planning Kickoff",
    circle: "Community", circleColor: "var(--circle-community)",
    meta: "14 messages · 2h ago",
    excerpt: "…let's coordinate the volunteer list and ensure the budget aligns with the outreach goals for the summer initiative…",
    highlight: "outreach",
  },
  {
    id: 2, type: "assignment", color: "var(--brand-blue)",
    title: "Prepare Q3 Outreach Plan",
    circle: "Community", circleColor: "var(--circle-community)",
    meta: "Assigned to Sarah K. · Due Jun 15 · In Progress",
    excerpt: "Develop a comprehensive outreach strategy for Q3 including volunteer coordination and community engagement…",
    highlight: "outreach",
  },
  {
    id: 3, type: "document", color: "var(--phase-discipleship)",
    title: "Q3 Strategy Draft v1.docx",
    circle: "Community", circleColor: "var(--circle-community)",
    meta: "Updated Jun 12 by Sarah K. · 2.4 MB",
    excerpt: "…the community garden initiative aligns with our Discipleship focus and outreach objectives for Semester 2…",
    highlight: "outreach",
  },
  {
    id: 4, type: "playbook", color: "var(--phase-development)",
    title: "Semester 2 — Discipleship Phase",
    circle: "All Circles", circleColor: "var(--brand-gold)",
    meta: "The Playbook · June · Active",
    excerpt: "Invest in growing leaders and deepening spiritual formation across all Circles. Outreach activities begin in July…",
    highlight: "outreach",
  },
  {
    id: 5, type: "hopper", color: "var(--brand-gold)",
    title: "Community garden ministry initiative",
    circle: "Hopper", circleColor: "var(--brand-gold)",
    meta: "Tagged: Outreach, Community · Jun 10",
    excerpt: "Idea for a community garden that serves as both a discipleship and outreach tool, partnering with local schools…",
    highlight: "outreach",
  },
];

const ARCHIVE_RESULTS = [
  {
    id: 10, type: "thread", color: "var(--circle-mission)",
    title: "Q2 Mission Debrief — Final Notes",
    circle: "Mission", circleColor: "var(--circle-mission)",
    meta: "Archived May 30 · 22 messages",
    excerpt: "…the outreach program exceeded our targets. Key learnings for Q3 planning attached in the files section…",
    highlight: "outreach",
  },
  {
    id: 11, type: "assignment", color: "var(--brand-blue)",
    title: "Q2 Community Outreach Report",
    circle: "Community", circleColor: "var(--circle-community)",
    meta: "Completed May 28 · Assigned to Pastor David",
    excerpt: "Final outreach report for Q2 including metrics, testimonials, and recommendations for Q3…",
    highlight: "outreach",
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  thread:     <MessageSquare size={13} />,
  assignment: <ClipboardList size={13} />,
  document:   <FolderOpen size={13} />,
  playbook:   <BookOpen size={13} />,
  calendar:   <Calendar size={13} />,
  hopper:     <Lightbulb size={13} />,
};

const TYPE_LABELS: Record<string, string> = {
  thread: "Thread", assignment: "Assignment", document: "Document",
  playbook: "Playbook", calendar: "Event", hopper: "Idea",
};

function highlightText(text: string, query: string) {
  if (!query) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} style={{ background: "oklch(0.95 0.12 75)", color: "oklch(0.40 0.14 75)", borderRadius: "3px", padding: "0 2px" }}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("outreach");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showArchive, setShowArchive] = useState(false);

  const baseResults = showArchive ? ARCHIVE_RESULTS : RESULTS;
  const filtered = baseResults.filter(r =>
    activeFilter === "all" || r.type === activeFilter
  );

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
          {showArchive ? "Archive Search" : "Global Search"}
        </h1>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
          style={{
            background: "var(--card)",
            border: "2px solid var(--brand-blue)",
            boxShadow: "0 0 0 4px oklch(0.52 0.22 262 / 0.10)",
          }}>
          <Search size={18} style={{ color: "var(--brand-blue)", flexShrink: 0 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search everything — threads, assignments, files, playbook…"
            className="flex-1 text-base bg-transparent outline-none font-medium"
            style={{ color: "var(--foreground)" }}
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="text-xs px-2 py-1 rounded-lg hover:bg-muted transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              Clear
            </button>
          )}
          <kbd className="text-xs px-2 py-1 rounded-lg font-mono flex-shrink-0"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Filter tabs + Archive toggle */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
          {FILTERS.map(f => (
            <button key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all")}
              style={activeFilter === f.id
                ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "var(--shadow-xs)" }
                : { color: "var(--muted-foreground)" }}>
              {f.icon} {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowArchive(prev => !prev)}
          className={cn("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all")}
          style={showArchive
            ? { background: "var(--brand-navy)", color: "white" }
            : { background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
          <Archive size={12} /> {showArchive ? "Exit Archive" : "Search Archive"}
        </button>
      </div>

      {/* Results count */}
      {query && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>"{query}"</span>
          {showArchive && (
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "var(--brand-navy)", color: "white" }}>
              Archive
            </span>
          )}
        </div>
      )}

      {/* Results */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bento-card flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
              <Search size={20} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>No results found</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          filtered.map(result => (
            <div key={result.id}
              className="bento-card p-4 cursor-pointer hover:shadow-md transition-all group"
              onClick={() => toast.info(`Opening: ${result.title}`)}>
              <div className="flex items-start gap-3">
                {/* Type icon */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: result.color + "15", color: result.color }}>
                  {TYPE_ICONS[result.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: result.color + "15", color: result.color }}>
                      {TYPE_LABELS[result.type]}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: result.circleColor }} />
                      <span className="text-xs font-semibold" style={{ color: result.circleColor }}>{result.circle}</span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>· {result.meta}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1 group-hover:text-[var(--brand-blue)] transition-colors">
                    {highlightText(result.title, query)}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
                    {highlightText(result.excerpt, query)}
                  </p>
                </div>

                <ChevronRight size={14}
                  className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--muted-foreground)" }} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent searches */}
      {!query && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={13} style={{ color: "var(--muted-foreground)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Recent Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Q3 planning", "volunteer", "worship set", "retreat", "budget"].map(term => (
              <button key={term}
                onClick={() => setQuery(term)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
