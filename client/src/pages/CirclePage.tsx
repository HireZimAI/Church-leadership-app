/**
 * Circle Flow — Circle Home (Hub)
 * Shows Circle overview with tabs: Chat, Assignments, Files
 */
import { Link, useParams, useLocation } from "wouter";
import {
  MessageSquare, ClipboardList, FolderOpen, Users, ChevronRight,
  Plus, MoreHorizontal, Hash, ArrowLeft, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CIRCLE_META: Record<string, { label: string; color: string; dotClass: string; description: string; members: number; }> = {
  creative: { label: "Creative", color: "var(--circle-creative)", dotClass: "circle-dot-creative", description: "Worship, arts, media, and communication ministry.", members: 12 },
  spirit:   { label: "Spirit",   color: "var(--circle-spirit)",   dotClass: "circle-dot-spirit",   description: "Prayer, intercession, and spiritual formation.", members: 8 },
  community:{ label: "Community",color: "var(--circle-community)",dotClass: "circle-dot-community",description: "Outreach, care, and community engagement.", members: 15 },
  discovery:{ label: "Discovery",color: "var(--circle-discovery)",dotClass: "circle-dot-discovery",description: "Discipleship, small groups, and spiritual growth.", members: 10 },
  mission:  { label: "Mission",  color: "var(--circle-mission)",  dotClass: "circle-dot-mission",  description: "Local and global mission initiatives.", members: 9 },
};

const RECENT_THREADS = [
  { id: 1, title: "Q3 Event Planning Kickoff", messages: 14, updated: "2h ago", unread: 3 },
  { id: 2, title: "Volunteer Coordination — July", messages: 7, updated: "Yesterday", unread: 0 },
  { id: 3, title: "Budget Review Notes", messages: 22, updated: "Jun 10", unread: 0 },
];

const ACTIVE_ASSIGNMENTS = [
  { id: 1, title: "Prepare Q3 Outreach Plan", assignee: "Sarah K.", due: "Jun 15", status: "in-progress" },
  { id: 2, title: "Design Event Flyer", assignee: "Marcus T.", due: "Jun 18", status: "not-started" },
  { id: 3, title: "Coordinate Venue Booking", assignee: "Pastor David", due: "Jun 20", status: "waiting" },
];

export default function CirclePage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const circle = CIRCLE_META[id ?? "creative"] ?? CIRCLE_META.creative;

  return (
    <div className="p-4 lg:p-6 page-enter">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
        <Link href="/"><span className="hover:text-foreground cursor-pointer transition-colors">Dashboard</span></Link>
        <ChevronRight size={12} />
        <span className="font-medium" style={{ color: circle.color }}>My Circles</span>
        <ChevronRight size={12} />
        <span className="font-medium" style={{ color: "var(--foreground)" }}>{circle.label}</span>
      </div>

      {/* Circle Header */}
      <div className="bento-card p-5 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: circle.color + "20" }}>
            <span className={cn("w-5 h-5 rounded-full", circle.dotClass)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {circle.label} Circle
              </h1>
              <Badge variant="secondary" className="text-xs">
                <Users size={10} className="mr-1" /> {circle.members} members
              </Badge>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{circle.description}</p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs h-8"
            style={{ background: circle.color, color: "white" }}
            onClick={() => toast.info("Create new thread")}>
            <Plus size={14} /> New Thread
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          {[
            { label: "Active Threads", value: 3, icon: <Hash size={14} /> },
            { label: "Open Assignments", value: 5, icon: <ClipboardList size={14} /> },
            { label: "Files Shared", value: 18, icon: <FolderOpen size={14} /> },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
                {s.icon} {s.label}
              </div>
              <div className="text-2xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: circle.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contextual Tab Navigation */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl w-fit" style={{ background: "var(--muted)" }}>
        {[
          { label: "Chat & Threads", href: `/circles/${id}/chat`, icon: <MessageSquare size={14} /> },
          { label: "Assignments", href: `/circles/${id}/assignments`, icon: <ClipboardList size={14} /> },
          { label: "Files", href: `/circles/${id}/files`, icon: <FolderOpen size={14} /> },
        ].map(tab => (
          <Link key={tab.href} href={tab.href}>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all hover:bg-white/70"
              style={{ color: "var(--muted-foreground)" }}>
              {tab.icon} {tab.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 card-stagger">
        {/* Recent Threads */}
        <div className="bento-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent Threads</h3>
            <Link href={`/circles/${id}/chat`}>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">All threads <ChevronRight size={12} /></Button>
            </Link>
          </div>
          <div className="space-y-2">
            {RECENT_THREADS.map(t => (
              <div key={t.id}
                className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all hover:border-primary/30 hover:bg-accent/20"
                style={{ borderColor: "var(--border)" }}
                onClick={() => navigate(`/circles/${id}/chat`)}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: circle.color + "15", color: circle.color }}>
                  <MessageSquare size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{t.messages} messages · {t.updated}</p>
                </div>
                {t.unread > 0 && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: circle.color, color: "white" }}>{t.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Assignments */}
        <div className="bento-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Active Assignments</h3>
            <Link href={`/circles/${id}/assignments`}>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">All <ChevronRight size={12} /></Button>
            </Link>
          </div>
          <div className="space-y-2">
            {ACTIVE_ASSIGNMENTS.map(a => (
              <div key={a.id}
                className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all hover:border-primary/30 hover:bg-accent/20"
                style={{ borderColor: "var(--border)" }}
                onClick={() => navigate(`/assignments/${a.id}`)}>
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarFallback className="text-xs" style={{ background: circle.color + "20", color: circle.color }}>
                    {a.assignee.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{a.assignee} · Due {a.due}</p>
                </div>
                <span className={cn("status-badge", `status-${a.status}`)}>{a.status.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Annotation */}
      <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: "var(--border)" }}>
        <p className="wf-label mb-2">Circle Flow — Screen Hierarchy</p>
        <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="px-2 py-1 rounded bg-muted">Dashboard</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">Circle Hub (this screen)</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-muted">Chat & Threads</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-muted">Circle Assignments</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-muted">Circle Files</span>
        </div>
      </div>
    </div>
  );
}
