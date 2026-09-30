/**
 * Dashboard — High-Fidelity Bento Grid
 * "Sovereign Clarity" Design System
 * 5 Bento widgets: Updates · Assignments · Calendar · Hopper · Playbook
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight, Zap, ClipboardList, Calendar, Lightbulb, BookOpen,
  ChevronRight, TrendingUp, CheckCircle2, Clock, Circle,
  Plus, Flame, Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";
const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

const UPDATES = [
  { id: 1, actor: "Pastor Marcus", circle: "Discovery", circleColor: "var(--circle-discovery)", time: "2m ago", text: "mentioned you in Discovery Circle — can you review the Q3 vision doc?" },
  { id: 2, actor: "Sarah K.", circle: "Community", circleColor: "var(--circle-community)", time: "1h ago", text: "New assignment: Prepare Q3 Outreach Plan" },
  { id: 3, actor: "System", circle: "Creative", circleColor: "var(--circle-creative)", time: "Today", text: "Sermon series outline due in 2 days" },
  { id: 4, actor: "Admin", circle: "All", circleColor: "var(--brand-gold)", time: "Yesterday", text: "All-leaders meeting: Sunday 9am" },
  { id: 5, actor: "System", circle: "Mission", circleColor: "var(--circle-mission)", time: "2d ago", text: "Semester 2 Playbook is now active" },
];

const ASSIGNMENTS = [
  { id: 1, title: "Prepare Q3 Outreach Plan", circle: "Community", circleColor: "var(--circle-community)", due: "Jun 15", status: "in-progress", priority: "high", progress: 40, assignee: SARAH_AVATAR },
  { id: 2, title: "Review Worship Set for July", circle: "Creative", circleColor: "var(--circle-creative)", due: "Jun 18", status: "not-started", priority: "medium", progress: 0, assignee: MARCUS_AVATAR },
  { id: 3, title: "Coordinate Volunteer Onboarding", circle: "Mission", circleColor: "var(--circle-mission)", due: "Jun 20", status: "waiting", priority: "medium", progress: 65, assignee: PASTOR_AVATAR },
  { id: 4, title: "Update Circle Archive", circle: "Discovery", circleColor: "var(--circle-discovery)", due: "Jun 22", status: "in-progress", priority: "low", progress: 80, assignee: SARAH_AVATAR },
];

const CALENDAR_EVENTS = [
  { day: "Mon", date: 12, events: [{ title: "All-Leaders Meeting", color: "var(--brand-blue)", time: "9am" }] },
  { day: "Tue", date: 13, events: [{ title: "Creative Planning", color: "var(--circle-creative)", time: "2pm" }] },
  { day: "Wed", date: 14, events: [] },
  { day: "Thu", date: 15, events: [{ title: "Q3 Outreach Deadline", color: "var(--circle-community)", time: "EOD" }, { title: "Discovery Chat", color: "var(--circle-discovery)", time: "4pm" }] },
  { day: "Fri", date: 16, events: [{ title: "Mission Debrief", color: "var(--circle-mission)", time: "11am" }] },
  { day: "Sat", date: 17, events: [] },
  { day: "Sun", date: 18, events: [{ title: "Worship Review", color: "var(--circle-spirit)", time: "10am" }] },
];

const HOPPER_IDEAS = [
  { id: 1, title: "Series idea: 'Roots & Branches'", tags: ["Sermon", "Series"], date: "Jun 12" },
  { id: 2, title: "Community garden ministry initiative", tags: ["Outreach", "Community"], date: "Jun 10" },
  { id: 3, title: "Leadership retreat — mountain venue?", tags: ["Planning", "Team"], date: "Jun 8" },
];

const PHASE_COLORS: Record<string, string> = {
  Dedication: "var(--phase-dedication)",
  Discipleship: "var(--phase-discipleship)",
  Development: "var(--phase-development)",
  Distribution: "var(--phase-distribution)",
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  "not-started": { label: "Not Started", cls: "status-not-started" },
  "in-progress":  { label: "In Progress",  cls: "status-in-progress" },
  "waiting":      { label: "Waiting",       cls: "status-waiting"     },
  "completed":    { label: "Completed",     cls: "status-completed"   },
};

const PRIORITY_CONFIG: Record<string, { label: string; cls: string }> = {
  high:   { label: "High",   cls: "priority-high"   },
  medium: { label: "Medium", cls: "priority-medium" },
  low:    { label: "Low",    cls: "priority-low"    },
};

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const [hopperInput, setHopperInput] = useState("");

  const handleHopperAdd = () => {
    if (hopperInput.trim()) {
      toast.success("Idea captured in The Hopper!");
      setHopperInput("");
    }
  };

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[1400px] mx-auto">

      {/* ── Page Header ── */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            Good morning, Pastor David
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Thursday, June 12 · Semester 2 —{" "}
            <span style={{ color: "var(--phase-discipleship)", fontWeight: 600 }}>Discipleship Phase</span>
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "oklch(0.93 0.08 262)", color: "oklch(0.38 0.20 262)", border: "1px solid oklch(0.82 0.12 262)" }}>
            <Flame size={12} /> 5 active assignments
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "oklch(0.93 0.07 160)", color: "oklch(0.38 0.15 160)", border: "1px solid oklch(0.82 0.10 160)" }}>
            <TrendingUp size={12} /> 48% semester progress
          </div>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 card-stagger">

        {/* ── Widget 1: Latest Updates (col 1-4, row 1-2) ── */}
        <div className="lg:col-span-4 lg:row-span-2 bento-card flex flex-col">
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.96 0.08 75)" }}>
                <Zap size={12} style={{ color: "var(--brand-gold)" }} />
              </div>
              <span className="text-sm font-semibold tracking-tight">Latest Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}>5 new</span>
              <Link href="/communication">
                <span className="text-xs font-medium hover:underline" style={{ color: "var(--brand-blue)" }}>View all</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "var(--border)" }}>
            {UPDATES.map(u => (
              <div key={u.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer group"
                onClick={() => navigate("/communication")}>
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: u.circleColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{u.actor}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: u.circleColor + "18", color: u.circleColor, fontSize: "0.625rem" }}>{u.circle}</span>
                  </div>
                  <p className="text-xs leading-snug line-clamp-2" style={{ color: "var(--muted-foreground)" }}>{u.text}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.625rem" }}>{u.time}</span>
                  <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--muted-foreground)" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3">
            <Link href="/communication">
              <span className="flex items-center gap-1.5 text-xs font-semibold hover:gap-2 transition-all" style={{ color: "var(--brand-blue)" }}>
                View all updates <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Widget 2: My Assignments (col 5-12) ── */}
        <div className="lg:col-span-8 bento-card flex flex-col">
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.93 0.08 262)" }}>
                <ClipboardList size={12} style={{ color: "var(--brand-blue)" }} />
              </div>
              <span className="text-sm font-semibold tracking-tight">My Assignments</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>4 active</span>
              <Link href="/assignments">
                <span className="flex items-center gap-1 text-xs font-semibold hover:gap-1.5 transition-all" style={{ color: "var(--brand-blue)" }}>
                  View all <ChevronRight size={11} />
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            {ASSIGNMENTS.map(a => {
              const status = STATUS_CONFIG[a.status];
              const priority = PRIORITY_CONFIG[a.priority];
              return (
                <Link key={a.id} href={`/assignments/${a.id}`}>
                  <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer group"
                    style={{ borderBottom: "1px solid var(--border)" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.circleColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-[var(--brand-blue)] transition-colors">{a.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-medium" style={{ color: a.circleColor }}>{a.circle}</span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>· Due {a.due}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 w-20 flex-shrink-0">
                      <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted-foreground)", fontSize: "0.6875rem" }}>{a.progress}%</span>
                      <div className="progress-track w-full">
                        <div className="progress-fill" style={{ width: `${a.progress}%`, background: a.circleColor }} />
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                      <span className={cn("status-badge", status.cls)}>{status.label}</span>
                      <span className={cn("status-badge", priority.cls)}>{priority.label}</span>
                    </div>
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src={a.assignee} className="object-cover" />
                      <AvatarFallback className="text-xs" style={{ background: "var(--muted)" }}>?</AvatarFallback>
                    </Avatar>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="px-5 py-3">
            <button onClick={() => navigate("/assignments")}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-[0.97]"
              style={{ background: "var(--brand-blue)", color: "white" }}>
              <Plus size={11} /> New Assignment
            </button>
          </div>
        </div>

        {/* ── Widget 3: Project Calendar (col 5-9) ── */}
        <div className="lg:col-span-5 bento-card">
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.93 0.07 160)" }}>
                <Calendar size={12} style={{ color: "var(--circle-community)" }} />
              </div>
              <span className="text-sm font-semibold tracking-tight">Project Calendar</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>Week of Jun 12</span>
            </div>
            <Link href="/calendar">
              <span className="flex items-center gap-1 text-xs font-semibold hover:gap-1.5 transition-all" style={{ color: "var(--brand-blue)" }}>
                Full Calendar <ChevronRight size={11} />
              </span>
            </Link>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {CALENDAR_EVENTS.map((day, i) => (
                <div key={i} className={cn(
                  "rounded-xl p-1.5 min-h-[76px] cursor-pointer transition-all hover:shadow-sm",
                  day.date === 12 ? "ring-2 ring-[var(--brand-blue)]" : "hover:bg-muted/60"
                )} style={{ background: day.date === 12 ? "oklch(0.93 0.08 262)" : "var(--muted)" }}>
                  <div className="text-center mb-1">
                    <div className="font-medium" style={{ color: "var(--muted-foreground)", fontSize: "0.6rem" }}>{day.day}</div>
                    <div className={cn("font-bold text-sm", day.date === 12 ? "text-[var(--brand-blue)]" : "")}>{day.date}</div>
                  </div>
                  <div className="space-y-0.5">
                    {day.events.slice(0, 2).map((ev, j) => (
                      <div key={j} className="px-1 py-0.5 rounded-md font-medium truncate"
                        style={{ background: ev.color + "22", color: ev.color, fontSize: "0.55rem" }}>
                        {ev.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-center" style={{ color: "var(--muted-foreground)", fontSize: "0.55rem" }}>+{day.events.length - 2}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { label: "Creative", color: "var(--circle-creative)" },
                { label: "Spirit", color: "var(--circle-spirit)" },
                { label: "Community", color: "var(--circle-community)" },
                { label: "Discovery", color: "var(--circle-discovery)" },
                { label: "Mission", color: "var(--circle-mission)" },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Widget 4: The Hopper (col 10-12) ── */}
        <div className="lg:col-span-3 bento-card flex flex-col">
          <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.96 0.08 75)" }}>
                <Lightbulb size={12} style={{ color: "var(--brand-gold)" }} />
              </div>
              <span className="text-sm font-semibold tracking-tight">The Hopper</span>
            </div>
            <Link href="/hopper">
              <span className="text-xs font-semibold hover:underline" style={{ color: "var(--brand-blue)" }}>Open</span>
            </Link>
          </div>
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex gap-2">
              <input
                value={hopperInput}
                onChange={e => setHopperInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleHopperAdd()}
                placeholder="Capture an idea…"
                className="flex-1 text-xs px-3 py-2 rounded-lg outline-none transition-all"
                style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
              <button onClick={handleHopperAdd}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-[0.97] flex-shrink-0"
                style={{ background: "var(--brand-blue)", color: "white" }}>
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1 divide-y" style={{ borderColor: "var(--border)" }}>
            {HOPPER_IDEAS.map(idea => (
              <div key={idea.id} className="flex items-start gap-2.5 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group"
                onClick={() => navigate("/hopper")}>
                <Star size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--brand-gold)" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-[var(--brand-blue)] transition-colors">{idea.title}</p>
                  <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                    {idea.tags.map(t => (
                      <span key={t} className="pill-tag">{t}</span>
                    ))}
                    <span className="ml-auto" style={{ color: "var(--muted-foreground)", fontSize: "0.6rem" }}>{idea.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Widget 5: Playbook Progress (col 1-12) ── */}
        <div className="lg:col-span-12 bento-card">
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.96 0.08 75)" }}>
                <BookOpen size={12} style={{ color: "var(--brand-gold)" }} />
              </div>
              <span className="text-sm font-semibold tracking-tight">The Playbook</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "oklch(0.93 0.07 160)", color: "oklch(0.38 0.15 160)" }}>Semester 2 Active</span>
            </div>
            <Link href="/playbook">
              <span className="flex items-center gap-1 text-xs font-semibold hover:gap-1.5 transition-all" style={{ color: "var(--brand-blue)" }}>
                Full Playbook <ChevronRight size={11} />
              </span>
            </Link>
          </div>
          <div className="p-5">
            {/* Annual bar */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold w-12 flex-shrink-0" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}>2024</span>
              <div className="flex-1 flex gap-0.5 h-8 rounded-xl overflow-hidden">
                {[
                  { label: "Jan", phase: "Dedication", done: true },
                  { label: "Feb", phase: "Discipleship", done: true },
                  { label: "Mar", phase: "Development", done: true },
                  { label: "Apr", phase: "Distribution", done: true },
                  { label: "May", phase: "Dedication", done: true },
                  { label: "Jun", phase: "Discipleship", done: false, active: true },
                  { label: "Jul", phase: "Development", done: false },
                  { label: "Aug", phase: "Distribution", done: false },
                  { label: "Sep", phase: "Dedication", done: false },
                  { label: "Oct", phase: "Discipleship", done: false },
                  { label: "Nov", phase: "Development", done: false },
                  { label: "Dec", phase: "Distribution", done: false },
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex items-center justify-center font-bold transition-all"
                    style={{
                      background: m.done ? PHASE_COLORS[m.phase] : m.active ? PHASE_COLORS[m.phase] + "50" : "var(--muted)",
                      color: m.done ? "white" : m.active ? PHASE_COLORS[m.phase] : "var(--muted-foreground)",
                      fontSize: "0.6rem",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                    {m.label}
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold w-12 text-right flex-shrink-0"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--brand-blue)" }}>48%</span>
            </div>
            {/* Semester cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: "Semester 1", months: "Jan – Apr", status: "completed", progress: 100, color: "var(--circle-community)" },
                { label: "Semester 2", months: "May – Aug", status: "active", progress: 45, color: "var(--brand-blue)" },
                { label: "Semester 3", months: "Sep – Dec", status: "upcoming", progress: 0, color: "var(--muted-foreground)" },
              ].map(sem => (
                <Link key={sem.label} href={`/playbook/${sem.label.toLowerCase().replace(" ", "")}`}>
                  <div className={cn(
                    "rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm group",
                    sem.status === "active" ? "ring-2 ring-[var(--brand-blue)]" : ""
                  )} style={{ background: sem.status === "upcoming" ? "var(--muted)" : sem.color + "10", border: `1px solid ${sem.color}30` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold" style={{ color: sem.status === "upcoming" ? "var(--muted-foreground)" : sem.color }}>{sem.label}</span>
                      {sem.status === "active" && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>Active</span>}
                      {sem.status === "completed" && <CheckCircle2 size={14} style={{ color: "var(--circle-community)" }} />}
                    </div>
                    <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{sem.months}</p>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${sem.progress}%`, background: sem.color }} />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>4 phases</span>
                      <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: sem.color }}>{sem.progress}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Phase legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {Object.entries(PHASE_COLORS).map(([phase, color]) => (
                <div key={phase} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-medium" style={{ color }}>{phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
