/**
 * Notifications — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Bell, MessageSquare, ClipboardList, Clock, Flag, Users,
  CheckCheck, Settings, Filter, ChevronRight, Circle, BookOpen, Lightbulb
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";
const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

type NotifType = "mention" | "assignment" | "deadline" | "announcement" | "playbook" | "circle";

interface Notification {
  id: number;
  type: NotifType;
  actor: string;
  avatar: string;
  circle: string;
  circleColor: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  link: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "mention", actor: "Pastor Marcus", avatar: MARCUS_AVATAR, circle: "Discovery", circleColor: "var(--circle-discovery)", title: "Mentioned you in a thread", body: "\"@Pastor David can you review the Q3 vision doc before Thursday?\"", time: "2 minutes ago", read: false, link: "/circles/discovery/chat" },
  { id: 2, type: "assignment", actor: "Sarah K.", avatar: SARAH_AVATAR, circle: "Community", circleColor: "var(--circle-community)", title: "New assignment created", body: "Prepare Q3 Outreach Plan — due Jun 15, marked High priority", time: "1 hour ago", read: false, link: "/assignments/1" },
  { id: 3, type: "deadline", actor: "System", avatar: "", circle: "Creative", circleColor: "var(--circle-creative)", title: "Deadline reminder", body: "Sermon series outline is due in 2 days", time: "3 hours ago", read: false, link: "/assignments/2" },
  { id: 4, type: "announcement", actor: "Admin", avatar: PASTOR_AVATAR, circle: "All Circles", circleColor: "var(--brand-gold)", title: "Leadership announcement", body: "All-leaders meeting scheduled for Sunday 9am in the main hall", time: "Yesterday, 4:30pm", read: false, link: "/communication" },
  { id: 5, type: "playbook", actor: "System", avatar: "", circle: "Mission", circleColor: "var(--circle-mission)", title: "Playbook update", body: "Semester 2 Playbook is now active — 4 phases, 48 weeks", time: "2 days ago", read: true, link: "/playbook" },
  { id: 6, type: "circle", actor: "Marcus R.", avatar: MARCUS_AVATAR, circle: "Creative", circleColor: "var(--circle-creative)", title: "New thread in Creative Circle", body: "\"Worship Set Themes for Q3\" — 3 new replies since your last visit", time: "2 days ago", read: true, link: "/circles/creative/chat" },
  { id: 7, type: "assignment", actor: "Sarah K.", avatar: SARAH_AVATAR, circle: "Discovery", circleColor: "var(--circle-discovery)", title: "Assignment status changed", body: "\"Update Circle Archive\" moved to In Progress", time: "3 days ago", read: true, link: "/assignments/4" },
  { id: 8, type: "mention", actor: "Pastor David", avatar: PASTOR_AVATAR, circle: "Spirit", circleColor: "var(--circle-spirit)", title: "You were tagged in Spirit Circle", body: "\"Great insight from @Pastor David on the discipleship curriculum!\"", time: "4 days ago", read: true, link: "/circles/spirit/chat" },
];

const TYPE_CONFIG: Record<NotifType, { icon: React.ReactNode; label: string }> = {
  mention:      { icon: <MessageSquare size={13} />, label: "Mention" },
  assignment:   { icon: <ClipboardList size={13} />, label: "Assignment" },
  deadline:     { icon: <Clock size={13} />, label: "Deadline" },
  announcement: { icon: <Flag size={13} />, label: "Announcement" },
  playbook:     { icon: <BookOpen size={13} />, label: "Playbook" },
  circle:       { icon: <Users size={13} />, label: "Circle" },
};

const FILTERS = ["All", "Unread", "Mentions", "Assignments", "Deadlines"];

export default function NotificationsPage() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.read;
    if (activeFilter === "Mentions") return n.type === "mention";
    if (activeFilter === "Assignments") return n.type === "assignment";
    if (activeFilter === "Deadlines") return n.type === "deadline";
    return true;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[860px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            Notifications
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-muted"
            style={{ color: "var(--brand-blue)", border: "1px solid var(--border)" }}>
            <CheckCheck size={13} /> Mark all read
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
            style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {FILTERS.map(f => (
          <button key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg transition-all",
              activeFilter === f
                ? "shadow-sm"
                : "hover:bg-background/50"
            )}
            style={activeFilter === f
              ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "var(--shadow-sm)" }
              : { color: "var(--muted-foreground)" }}>
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="bento-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
              <Bell size={20} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>No notifications here</p>
          </div>
        ) : (
          <div>
            {filtered.map((notif, i) => {
              const typeConf = TYPE_CONFIG[notif.type];
              return (
                <div key={notif.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-muted/40 group",
                    !notif.read && "bg-[oklch(0.97_0.008_262)]"
                  )}
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                  onClick={() => { markRead(notif.id); navigate(notif.link); }}>

                  {/* Unread dot */}
                  <div className="w-2 flex-shrink-0 flex items-start pt-2">
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--brand-blue)" }} />
                    )}
                  </div>

                  {/* Avatar / Icon */}
                  {notif.avatar ? (
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarImage src={notif.avatar} className="object-cover" />
                      <AvatarFallback className="text-xs font-bold" style={{ background: "var(--muted)" }}>
                        {notif.actor[0]}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: notif.circleColor + "20", color: notif.circleColor }}>
                      {typeConf.icon}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{notif.title}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: notif.circleColor + "18", color: notif.circleColor, fontSize: "0.625rem" }}>
                        {notif.circle}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--muted-foreground)" }}>{notif.body}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.625rem" }}>
                        {typeConf.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.6875rem" }}>{notif.time}</span>
                    </div>
                  </div>

                  <ChevronRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                    style={{ color: "var(--muted-foreground)" }} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notification preferences link */}
      <div className="mt-4 text-center">
        <button onClick={() => navigate("/settings")}
          className="text-xs font-medium hover:underline" style={{ color: "var(--muted-foreground)" }}>
          Manage notification preferences →
        </button>
      </div>
    </div>
  );
}
