/**
 * Assignment Detail — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 * Full assignment view: status flow, progress, files, comments, linked thread
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ChevronRight, Calendar, User, Flag, MessageSquare, Paperclip,
  CheckCircle2, Clock, ArrowLeft, Edit2, FileText, Table2,
  Hash, AlertCircle, MoreHorizontal, Plus, Send
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";
const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";

const STATUSES = [
  { id: "not-started", label: "Not Started", color: "var(--muted-foreground)", bg: "var(--muted)", icon: <Clock size={11} /> },
  { id: "in-progress", label: "In Progress", color: "var(--brand-blue)", bg: "oklch(0.93 0.08 262)", icon: <Clock size={11} /> },
  { id: "waiting",     label: "Waiting",     color: "var(--brand-gold)",  bg: "oklch(0.95 0.08 75)",  icon: <AlertCircle size={11} /> },
  { id: "completed",   label: "Completed",   color: "var(--circle-community)", bg: "oklch(0.93 0.07 155)", icon: <CheckCircle2 size={11} /> },
];

const COMMENTS = [
  {
    id: 1, author: "Pastor David", avatar: PASTOR_AVATAR,
    time: "Jun 10, 9:14 AM",
    text: "Sarah, please ensure the volunteer list is cross-referenced with the Mission Circle database. We need at least 40 confirmed volunteers before we proceed.",
  },
  {
    id: 2, author: "Sarah K.", avatar: SARAH_AVATAR,
    time: "Jun 11, 2:30 PM",
    text: "Will do! I've already started pulling the data. Should have a draft ready by Thursday. I'll also flag any gaps in coverage.",
  },
];

const CHECKLIST = [
  { id: 1, text: "Draft outreach strategy document", done: true },
  { id: 2, text: "Cross-reference volunteer database with Mission Circle", done: true },
  { id: 3, text: "Confirm budget allocation with Finance team", done: false },
  { id: 4, text: "Schedule kickoff meeting with Community Circle leaders", done: false },
  { id: 5, text: "Submit final plan for approval", done: false },
];

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState("in-progress");
  const [comment, setComment] = useState("");
  const [checklist, setChecklist] = useState(CHECKLIST);

  const completedChecks = checklist.filter(c => c.done).length;
  const progress = Math.round((completedChecks / checklist.length) * 100);

  const toggleCheck = (checkId: number) => {
    setChecklist(prev => prev.map(c => c.id === checkId ? { ...c, done: !c.done } : c));
  };

  const currentStatus = STATUSES.find(s => s.id === status)!;

  return (
    <div className="p-4 lg:p-6 page-enter">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <Link href="/assignments">
          <button className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground"
            style={{ color: "var(--muted-foreground)" }}>
            <ArrowLeft size={13} /> Assignments
          </button>
        </Link>
        <ChevronRight size={12} style={{ color: "var(--border)" }} />
        <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Prepare Q3 Outreach Plan</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 max-w-[1100px]">
        {/* ── Main Column ── */}
        <div className="space-y-4">

          {/* Title + Status Header */}
          <div className="bento-card p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--circle-community)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--circle-community)" }}>Community Circle</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "oklch(0.93 0.10 25)", color: "oklch(0.50 0.18 25)" }}>
                    High Priority
                  </span>
                </div>
                <h1 className="text-xl font-bold leading-snug" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
                  Prepare Q3 Outreach Plan
                </h1>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                onClick={() => toast.info("Edit assignment")}>
                <MoreHorizontal size={15} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
              Develop a comprehensive outreach strategy for Q3 including volunteer coordination, budget allocation, and community engagement metrics. This plan should align with the Semester 2 Discipleship focus and the Community Circle's annual goals.
            </p>

            {/* Progress bar */}
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                {completedChecks}/{checklist.length} tasks complete
              </span>
              <span className="text-xs font-bold" style={{ color: "var(--brand-blue)", fontFamily: "'JetBrains Mono', monospace" }}>
                {progress}%
              </span>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill h-2 rounded-full transition-all" style={{ width: `${progress}%`, background: "var(--brand-blue)" }} />
            </div>
          </div>

          {/* Status Flow */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
              Status
            </h3>
            <div className="flex gap-2 flex-wrap">
              {STATUSES.map(s => (
                <button key={s.id}
                  onClick={() => { setStatus(s.id); toast.success(`Status → ${s.label}`); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{
                    background: status === s.id ? s.bg : "var(--muted)",
                    color: status === s.id ? s.color : "var(--muted-foreground)",
                    border: status === s.id ? `1.5px solid ${s.color}40` : "1.5px solid transparent",
                    boxShadow: status === s.id ? `0 0 0 3px ${s.color}15` : "none",
                  }}>
                  {s.icon}
                  {s.label}
                  {status === s.id && <CheckCircle2 size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bento-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                Checklist
              </h3>
              <button className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-foreground"
                style={{ color: "var(--brand-blue)" }}
                onClick={() => toast.info("Add checklist item")}>
                <Plus size={11} /> Add item
              </button>
            </div>
            <div className="space-y-1">
              {checklist.map(item => (
                <button key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-muted/60 group">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    item.done ? "border-[var(--circle-community)]" : "border-[var(--border)] group-hover:border-[var(--brand-blue)]"
                  )} style={{ background: item.done ? "var(--circle-community)" : "transparent" }}>
                    {item.done && <CheckCircle2 size={10} color="white" />}
                  </div>
                  <span className={cn("text-sm flex-1", item.done && "line-through")}
                    style={{ color: item.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Files */}
          <div className="bento-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                Files
              </h3>
              <button className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "var(--brand-blue)" }}
                onClick={() => toast.info("Attach file")}>
                <Paperclip size={11} /> Attach
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: "Q3 Strategy Draft v1.docx", size: "2.4 MB", icon: <FileText size={14} />, color: "var(--brand-blue)" },
                { name: "Volunteer Database.xlsx", size: "1.1 MB", icon: <Table2 size={14} />, color: "var(--circle-community)" },
              ].map((f, i) => (
                <div key={i}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-muted/60 group"
                  style={{ border: "1px solid var(--border)" }}
                  onClick={() => toast.info(`Opening ${f.name}`)}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: f.color + "15", color: f.color }}>
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{f.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.size}</div>
                  </div>
                  <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--muted-foreground)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)" }}>
              Comments
            </h3>
            <div className="space-y-4 mb-4">
              {COMMENTS.map(c => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={c.avatar} className="object-cover" />
                    <AvatarFallback className="text-xs font-bold" style={{ background: "var(--muted)" }}>
                      {c.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-xs font-bold">{c.author}</span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                        {c.time}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed p-3 rounded-xl"
                      style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-2 p-3 rounded-2xl"
              style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
              <Avatar className="w-7 h-7 flex-shrink-0 mb-0.5">
                <AvatarImage src={PASTOR_AVATAR} className="object-cover" />
                <AvatarFallback className="text-xs font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>PD</AvatarFallback>
              </Avatar>
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: "var(--foreground)" }}
                onKeyDown={e => {
                  if (e.key === "Enter" && comment.trim()) {
                    toast.success("Comment added!");
                    setComment("");
                  }
                }}
              />
              <button
                onClick={() => { if (comment.trim()) { toast.success("Comment added!"); setComment(""); } }}
                className="p-1.5 rounded-lg transition-all hover:scale-105"
                style={{ background: comment.trim() ? "var(--brand-blue)" : "var(--border)", color: comment.trim() ? "white" : "var(--muted-foreground)" }}>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">
          {/* Details */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)" }}>
              Details
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Assigned By",
                  content: (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={PASTOR_AVATAR} className="object-cover" />
                        <AvatarFallback className="text-xs">PD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold">Pastor David</span>
                    </div>
                  ),
                },
                {
                  label: "Assigned To",
                  content: (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={SARAH_AVATAR} className="object-cover" />
                        <AvatarFallback className="text-xs">SK</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold">Sarah K.</span>
                    </div>
                  ),
                },
                {
                  label: "Due Date",
                  content: (
                    <div className="flex items-center gap-2">
                      <Calendar size={13} style={{ color: "var(--brand-blue)" }} />
                      <span className="text-sm font-semibold">Jun 15, 2026</span>
                    </div>
                  ),
                },
                {
                  label: "Priority",
                  content: (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: "oklch(0.93 0.10 25)", color: "oklch(0.50 0.18 25)" }}>
                      <Flag size={10} /> High
                    </span>
                  ),
                },
                {
                  label: "Circle",
                  content: (
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--circle-community)" }} />
                      <span className="text-sm font-semibold" style={{ color: "var(--circle-community)" }}>Community</span>
                    </div>
                  ),
                },
              ].map((d, i) => (
                <div key={i}>
                  <div className="text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>{d.label}</div>
                  {d.content}
                </div>
              ))}
            </div>
          </div>

          {/* Playbook Link */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
              Playbook Phase
            </h3>
            <Link href="/playbook/s2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all hover:bg-muted/60"
                style={{ border: "1px solid var(--border)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "oklch(0.93 0.07 160)" }}>
                  📖
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">Semester 2</div>
                  <div className="text-xs" style={{ color: "var(--phase-discipleship)" }}>Discipleship Phase</div>
                </div>
                <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
              </div>
            </Link>
          </div>

          {/* Related Thread */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
              Related Thread
            </h3>
            <Link href="/circles/community/chat">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all hover:bg-muted/60 group"
                style={{ border: "1px solid var(--border)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--circle-community)" + "15", color: "var(--circle-community)" }}>
                  <Hash size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">Q3 Event Planning Kickoff</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Community · 14 messages</div>
                </div>
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--muted-foreground)" }} />
              </div>
            </Link>
          </div>

          {/* Activity timeline */}
          <div className="bento-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
              Activity
            </h3>
            <div className="space-y-3">
              {[
                { text: "Status changed to In Progress", time: "Jun 11", color: "var(--brand-blue)" },
                { text: "Sarah K. attached a file", time: "Jun 11", color: "var(--circle-community)" },
                { text: "Assignment created by Pastor David", time: "Jun 10", color: "var(--muted-foreground)" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                  <div className="flex-1">
                    <div className="text-xs leading-relaxed">{a.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                      {a.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
