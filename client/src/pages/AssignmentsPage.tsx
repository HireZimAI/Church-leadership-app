/**
 * Assignments — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Plus, Search, ChevronRight, Clock, CheckCircle2,
  Circle, AlertCircle, LayoutGrid, List
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";
const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

const ALL_ASSIGNMENTS = [
  { id: 1, title: "Prepare Q3 Outreach Plan", circle: "Community", circleColor: "var(--circle-community)", due: "Jun 15", status: "in-progress", priority: "high", progress: 40, assignee: SARAH_AVATAR, assigneeName: "Sarah K." },
  { id: 2, title: "Review Worship Set for July", circle: "Creative", circleColor: "var(--circle-creative)", due: "Jun 18", status: "not-started", priority: "medium", progress: 0, assignee: MARCUS_AVATAR, assigneeName: "Marcus R." },
  { id: 3, title: "Coordinate Volunteer Onboarding", circle: "Mission", circleColor: "var(--circle-mission)", due: "Jun 20", status: "waiting", priority: "medium", progress: 65, assignee: PASTOR_AVATAR, assigneeName: "Pastor David" },
  { id: 4, title: "Update Circle Archive", circle: "Discovery", circleColor: "var(--circle-discovery)", due: "Jun 22", status: "in-progress", priority: "low", progress: 80, assignee: SARAH_AVATAR, assigneeName: "Sarah K." },
  { id: 5, title: "Sermon Series Outline — Q3", circle: "Creative", circleColor: "var(--circle-creative)", due: "Jun 25", status: "not-started", priority: "high", progress: 0, assignee: PASTOR_AVATAR, assigneeName: "Pastor David" },
  { id: 6, title: "Spirit Circle Retreat Planning", circle: "Spirit", circleColor: "var(--circle-spirit)", due: "Jul 1", status: "waiting", priority: "medium", progress: 20, assignee: MARCUS_AVATAR, assigneeName: "Marcus R." },
  { id: 7, title: "Q2 Ministry Report", circle: "Mission", circleColor: "var(--circle-mission)", due: "May 30", status: "completed", priority: "high", progress: 100, assignee: PASTOR_AVATAR, assigneeName: "Pastor David" },
  { id: 8, title: "Discovery Circle Curriculum Review", circle: "Discovery", circleColor: "var(--circle-discovery)", due: "May 28", status: "completed", priority: "medium", progress: 100, assignee: SARAH_AVATAR, assigneeName: "Sarah K." },
];

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  "not-started": { label: "Not Started", cls: "status-not-started", icon: <Circle size={10} /> },
  "in-progress":  { label: "In Progress",  cls: "status-in-progress", icon: <Clock size={10} /> },
  "waiting":      { label: "Waiting",       cls: "status-waiting",     icon: <AlertCircle size={10} /> },
  "completed":    { label: "Completed",     cls: "status-completed",   icon: <CheckCircle2 size={10} /> },
};

const PRIORITY_CONFIG: Record<string, { label: string; cls: string }> = {
  high:   { label: "High",   cls: "priority-high"   },
  medium: { label: "Medium", cls: "priority-medium" },
  low:    { label: "Low",    cls: "priority-low"    },
};

const STATUS_FILTERS = ["All", "Not Started", "In Progress", "Waiting", "Completed"];
const CIRCLE_FILTERS = ["All Circles", "Creative", "Spirit", "Community", "Discovery", "Mission"];

export default function AssignmentsPage() {
  const [, navigate] = useLocation();
  const [statusFilter, setStatusFilter] = useState("All");
  const [circleFilter, setCircleFilter] = useState("All Circles");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filtered = ALL_ASSIGNMENTS.filter(a => {
    const matchStatus = statusFilter === "All" || a.status === statusFilter.toLowerCase().replace(" ", "-");
    const matchCircle = circleFilter === "All Circles" || a.circle === circleFilter;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCircle && matchSearch;
  });

  const activeCount = ALL_ASSIGNMENTS.filter(a => a.status !== "completed").length;
  const completedCount = ALL_ASSIGNMENTS.filter(a => a.status === "completed").length;

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            Assignments
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {activeCount} active · {completedCount} completed
          </p>
        </div>
        <button
          onClick={() => toast.info("New Assignment modal coming soon")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
          style={{ background: "var(--brand-blue)", color: "white", boxShadow: "0 1px 4px oklch(0.52 0.22 262 / 0.30)" }}>
          <Plus size={15} /> New Assignment
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total", value: ALL_ASSIGNMENTS.length, color: "var(--brand-blue)" },
          { label: "In Progress", value: ALL_ASSIGNMENTS.filter(a => a.status === "in-progress").length, color: "var(--brand-blue)" },
          { label: "Waiting", value: ALL_ASSIGNMENTS.filter(a => a.status === "waiting").length, color: "var(--phase-development)" },
          { label: "Completed", value: completedCount, color: "var(--circle-community)" },
        ].map(stat => (
          <div key={stat.label} className="bento-card px-4 py-3">
            <div className="text-xl font-bold" style={{ color: stat.color, fontFamily: "'Geist', 'DM Sans', sans-serif" }}>{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bento-card mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3">
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl"
            style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
            <Search size={13} style={{ color: "var(--muted-foreground)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assignments…"
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: "var(--foreground)" }}
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0" style={{ background: "var(--muted)" }}>
            {STATUS_FILTERS.map(f => (
              <button key={f}
                onClick={() => setStatusFilter(f)}
                className={cn("text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap")}
                style={statusFilter === f
                  ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "var(--shadow-xs)" }
                  : { color: "var(--muted-foreground)" }}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0" style={{ background: "var(--muted)" }}>
            <button onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-lg transition-all")}
              style={viewMode === "list" ? { background: "var(--card)", color: "var(--foreground)" } : { color: "var(--muted-foreground)" }}>
              <List size={14} />
            </button>
            <button onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-lg transition-all")}
              style={viewMode === "grid" ? { background: "var(--card)", color: "var(--foreground)" } : { color: "var(--muted-foreground)" }}>
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 pb-3 flex-wrap">
          {CIRCLE_FILTERS.map(f => (
            <button key={f}
              onClick={() => setCircleFilter(f)}
              className={cn("text-xs font-semibold px-3 py-1 rounded-full transition-all")}
              style={circleFilter === f
                ? { background: "var(--brand-navy)", color: "white" }
                : { background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment List */}
      {viewMode === "list" ? (
        <div className="bento-card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.625rem" }}>
            <div className="col-span-5">Title</div>
            <div className="col-span-2 hidden md:block">Circle</div>
            <div className="col-span-1 hidden lg:block">Due</div>
            <div className="col-span-2 hidden md:block">Status</div>
            <div className="col-span-1 hidden lg:block">Priority</div>
            <div className="col-span-1">Assignee</div>
          </div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
                <CheckCircle2 size={20} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>No assignments match your filters</p>
            </div>
          ) : (
            filtered.map((a, i) => {
              const status = STATUS_CONFIG[a.status];
              const priority = PRIORITY_CONFIG[a.priority];
              return (
                <Link key={a.id} href={`/assignments/${a.id}`}>
                  <div className={cn(
                    "grid grid-cols-12 gap-4 items-center px-5 py-3.5 cursor-pointer transition-colors hover:bg-muted/40 group",
                    a.status === "completed" && "opacity-60"
                  )} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.circleColor }} />
                      <div className="min-w-0">
                        <div className={cn("text-sm font-medium truncate group-hover:text-[var(--brand-blue)] transition-colors",
                          a.status === "completed" && "line-through")}>{a.title}</div>
                        {a.progress > 0 && a.status !== "completed" && (
                          <div className="progress-track mt-1 w-24">
                            <div className="progress-fill" style={{ width: `${a.progress}%`, background: a.circleColor }} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <span className="text-xs font-semibold" style={{ color: a.circleColor }}>{a.circle}</span>
                    </div>
                    <div className="col-span-1 hidden lg:block">
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{a.due}</span>
                    </div>
                    <div className="col-span-2 hidden md:flex items-center gap-1">
                      <span className={cn("status-badge", status.cls)}>{status.icon} {status.label}</span>
                    </div>
                    <div className="col-span-1 hidden lg:block">
                      <span className={cn("status-badge", priority.cls)}>{priority.label}</span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={a.assignee} className="object-cover" />
                        <AvatarFallback className="text-xs" style={{ background: "var(--muted)" }}>?</AvatarFallback>
                      </Avatar>
                      <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--muted-foreground)" }} />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(a => {
            const status = STATUS_CONFIG[a.status];
            const priority = PRIORITY_CONFIG[a.priority];
            return (
              <Link key={a.id} href={`/assignments/${a.id}`}>
                <div className={cn("bento-card p-4 cursor-pointer hover:shadow-md transition-all group", a.status === "completed" && "opacity-60")}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: a.circleColor }} />
                      <span className="text-xs font-semibold" style={{ color: a.circleColor }}>{a.circle}</span>
                    </div>
                    <span className={cn("status-badge", priority.cls)}>{priority.label}</span>
                  </div>
                  <h3 className={cn("text-sm font-semibold mb-2 leading-snug group-hover:text-[var(--brand-blue)] transition-colors",
                    a.status === "completed" && "line-through")}>{a.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn("status-badge flex items-center gap-1", status.cls)}>{status.icon} {status.label}</span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Due {a.due}</span>
                  </div>
                  {a.progress > 0 && (
                    <div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${a.progress}%`, background: a.circleColor }} />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Progress</span>
                        <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: a.circleColor }}>{a.progress}%</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={a.assignee} className="object-cover" />
                      <AvatarFallback className="text-xs" style={{ background: "var(--muted)" }}>?</AvatarFallback>
                    </Avatar>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{a.assigneeName}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
