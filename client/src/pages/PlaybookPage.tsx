/**
 * Annual Playbook — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 * Ministry operating system: 3 semesters × 4 phases
 */
import { Link } from "wouter";
import { ChevronRight, BookOpen, CheckCircle2, Clock, Circle, TrendingUp, Target, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SEMESTERS = [
  {
    id: "s1", label: "Semester 1", months: "January – April", status: "completed", progress: 100,
    phases: [
      { name: "Dedication",   month: "Jan", status: "completed", assignments: 12, completed: 12 },
      { name: "Discipleship", month: "Feb", status: "completed", assignments: 9,  completed: 9  },
      { name: "Development",  month: "Mar", status: "completed", assignments: 11, completed: 11 },
      { name: "Distribution", month: "Apr", status: "completed", assignments: 8,  completed: 8  },
    ],
  },
  {
    id: "s2", label: "Semester 2", months: "May – August", status: "active", progress: 48,
    phases: [
      { name: "Dedication",   month: "May", status: "completed", assignments: 10, completed: 10 },
      { name: "Discipleship", month: "Jun", status: "active",    assignments: 14, completed: 6  },
      { name: "Development",  month: "Jul", status: "upcoming",  assignments: 11, completed: 0  },
      { name: "Distribution", month: "Aug", status: "upcoming",  assignments: 9,  completed: 0  },
    ],
  },
  {
    id: "s3", label: "Semester 3", months: "September – December", status: "upcoming", progress: 0,
    phases: [
      { name: "Dedication",   month: "Sep", status: "upcoming", assignments: 0, completed: 0 },
      { name: "Discipleship", month: "Oct", status: "upcoming", assignments: 0, completed: 0 },
      { name: "Development",  month: "Nov", status: "upcoming", assignments: 0, completed: 0 },
      { name: "Distribution", month: "Dec", status: "upcoming", assignments: 0, completed: 0 },
    ],
  },
];

const PHASE_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  Dedication:   { color: "var(--phase-dedication)",   bg: "oklch(0.93 0.08 265)", icon: "🎯" },
  Discipleship: { color: "var(--phase-discipleship)", bg: "oklch(0.93 0.07 160)", icon: "📖" },
  Development:  { color: "var(--phase-development)",  bg: "oklch(0.93 0.08 75)",  icon: "⚙️" },
  Distribution: { color: "var(--phase-distribution)", bg: "oklch(0.93 0.07 35)",  icon: "🚀" },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_PHASES = [
  "Dedication","Discipleship","Development","Distribution",
  "Dedication","Discipleship","Development","Distribution",
  "Dedication","Discipleship","Development","Distribution",
];
const MONTH_STATUS = [
  "completed","completed","completed","completed",
  "completed","active","upcoming","upcoming",
  "upcoming","upcoming","upcoming","upcoming",
];

export default function PlaybookPage() {
  const totalAssignments = SEMESTERS.flatMap(s => s.phases).reduce((a, p) => a + p.assignments, 0);
  const completedAssignments = SEMESTERS.flatMap(s => s.phases).reduce((a, p) => a + p.completed, 0);
  const overallProgress = Math.round((completedAssignments / totalAssignments) * 100);

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            The Playbook
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Annual Ministry Planning · 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "oklch(0.93 0.08 160)", color: "var(--phase-discipleship)", border: "1px solid oklch(0.85 0.10 160)" }}>
            <BookOpen size={12} /> Semester 2 — Discipleship Phase
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Overall Progress", value: `${overallProgress}%`, icon: <TrendingUp size={14} />, color: "var(--brand-blue)" },
          { label: "Total Assignments", value: totalAssignments, icon: <Target size={14} />, color: "var(--phase-dedication)" },
          { label: "Completed", value: completedAssignments, icon: <CheckCircle2 size={14} />, color: "var(--circle-community)" },
          { label: "Active Semester", value: "S2", icon: <Layers size={14} />, color: "var(--phase-discipleship)" },
        ].map(stat => (
          <div key={stat.label} className="bento-card px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: stat.color + "20", color: stat.color }}>
                {stat.icon}
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{stat.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Annual Timeline Bar */}
      <div className="bento-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold">Annual Timeline</span>
          <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}>
            {overallProgress}% complete
          </span>
        </div>
        <div className="grid grid-cols-12 gap-1 mb-3">
          {MONTHS.map((month, i) => {
            const phase = MONTH_PHASES[i];
            const status = MONTH_STATUS[i];
            const cfg = PHASE_CONFIG[phase];
            const isCurrentMonth = i === 5; // June
            return (
              <div key={month}
                className={cn("relative rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-sm")}
                style={{
                  background: status === "upcoming" ? "var(--muted)" : cfg.color,
                  height: "52px",
                  opacity: status === "upcoming" ? 0.5 : 1,
                  boxShadow: isCurrentMonth ? `0 0 0 2px ${cfg.color}, 0 0 0 4px ${cfg.color}40` : "none",
                }}
                onClick={() => toast.info(`${month} — ${phase}`)}>
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="font-bold" style={{
                    color: status === "upcoming" ? "var(--muted-foreground)" : "white",
                    fontSize: "0.6rem",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{month}</span>
                  {isCurrentMonth && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Phase legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {Object.entries(PHASE_CONFIG).map(([phase, cfg]) => (
            <div key={phase} className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-sm" style={{ background: cfg.color }} />
              <span style={{ color: "var(--muted-foreground)" }}>{phase}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs ml-auto">
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--brand-blue)" }} />
            <span style={{ color: "var(--muted-foreground)" }}>Current month</span>
          </div>
        </div>
      </div>

      {/* Semester Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {SEMESTERS.map(sem => (
          <Link key={sem.id} href={`/playbook/${sem.id}`}>
            <div className={cn(
              "bento-card overflow-hidden cursor-pointer transition-all hover:shadow-md group",
              sem.status === "active" && "ring-2 ring-[var(--brand-blue)]"
            )}>
              {/* Semester header */}
              <div className="px-5 py-4" style={{
                background: sem.status === "completed"
                  ? "var(--muted)"
                  : sem.status === "active"
                    ? "var(--brand-navy)"
                    : "var(--muted)",
              }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold"
                    style={{ color: sem.status === "active" ? "white" : "var(--foreground)" }}>
                    {sem.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {sem.status === "completed" && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "var(--circle-community)" + "20", color: "var(--circle-community)" }}>
                        <CheckCircle2 size={9} /> Done
                      </span>
                    )}
                    {sem.status === "active" && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                        <Clock size={9} /> Active
                      </span>
                    )}
                    {sem.status === "upcoming" && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                        <Circle size={9} /> Upcoming
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs" style={{ color: sem.status === "active" ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>
                  {sem.months}
                </p>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: sem.status === "active" ? "rgba(255,255,255,0.2)" : "var(--border)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${sem.progress}%`,
                      background: sem.status === "active" ? "white" : "var(--circle-community)",
                    }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold"
                    style={{ color: sem.status === "active" ? "rgba(255,255,255,0.9)" : "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                    {sem.progress}% complete
                  </span>
                  <ChevronRight size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: sem.status === "active" ? "white" : "var(--muted-foreground)" }} />
                </div>
              </div>

              {/* Phases */}
              <div className="p-3 space-y-1.5">
                {sem.phases.map(phase => {
                  const cfg = PHASE_CONFIG[phase.name];
                  const pct = phase.assignments > 0 ? Math.round((phase.completed / phase.assignments) * 100) : 0;
                  return (
                    <div key={phase.name} className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-muted/60"
                      style={{ border: phase.status === "active" ? `1px solid ${cfg.color}40` : "1px solid transparent" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                        style={{ background: phase.status === "upcoming" ? "var(--muted)" : cfg.bg }}>
                        {phase.status === "upcoming" ? "—" : cfg.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{phase.name}</span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                            {phase.month}
                          </span>
                        </div>
                        {phase.assignments > 0 ? (
                          <>
                            <div className="progress-track">
                              <div className="progress-fill" style={{ width: `${pct}%`, background: cfg.color }} />
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.6rem" }}>
                                {phase.completed}/{phase.assignments} tasks
                              </span>
                              <span className="text-xs font-bold" style={{ color: cfg.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                                {pct}%
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.625rem" }}>Not yet planned</span>
                        )}
                      </div>
                      {phase.status === "completed" && (
                        <CheckCircle2 size={14} style={{ color: "var(--circle-community)", flexShrink: 0 }} />
                      )}
                      {phase.status === "active" && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: cfg.color }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
