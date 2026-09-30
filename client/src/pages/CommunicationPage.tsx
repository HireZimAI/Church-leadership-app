/**
 * Communication Center — Unified inbox for messages, mentions, announcements
 */
import { useState } from "react";
import { Bell, MessageSquare, AtSign, Megaphone, CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TABS = [
  { id: "all", label: "All", icon: <Bell size={14} />, count: 6 },
  { id: "mentions", label: "Mentions", icon: <AtSign size={14} />, count: 2 },
  { id: "messages", label: "Messages", icon: <MessageSquare size={14} />, count: 3 },
  { id: "announcements", label: "Announcements", icon: <Megaphone size={14} />, count: 1 },
];

const NOTIFICATIONS = [
  { id: 1, type: "mention", read: false, author: "Pastor Marcus", initials: "PM", time: "2m ago", title: "Mentioned you in Discovery Circle", body: "@Pastor David — can you review the Q3 vision doc before Thursday's meeting?", circle: "Discovery", circleColor: "var(--circle-discovery)" },
  { id: 2, type: "message", read: false, author: "Sarah K.", initials: "SK", time: "1h ago", title: "New message in Community Circle", body: "I've started pulling the volunteer data. Should have a draft ready by Thursday.", circle: "Community", circleColor: "var(--circle-community)" },
  { id: 3, type: "announcement", read: false, author: "Admin", initials: "AD", time: "3h ago", title: "All-Leaders Meeting — Sunday 9am", body: "Reminder: All circle leaders are required to attend the all-leaders meeting this Sunday at 9am in the main hall.", circle: "All", circleColor: "oklch(0.58 0.01 260)" },
  { id: 4, type: "message", read: false, author: "Marcus T.", initials: "MT", time: "Yesterday", title: "New message in Creative Circle", body: "The worship set for July is ready for your review. I've attached the full list.", circle: "Creative", circleColor: "var(--circle-creative)" },
  { id: 5, type: "mention", read: true, author: "James R.", initials: "JR", time: "Yesterday", title: "Mentioned you in Mission Circle", body: "@Pastor David — approved the volunteer invite template. Sending out Monday.", circle: "Mission", circleColor: "var(--circle-mission)" },
  { id: 6, type: "message", read: true, author: "Sarah K.", initials: "SK", time: "Jun 10", title: "Re: Q3 Outreach Plan", body: "I've updated the strategy doc with the new budget figures. Please review when you get a chance.", circle: "Community", circleColor: "var(--circle-community)" },
];

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "mentions") return n.type === "mention";
    if (activeTab === "messages") return n.type === "message";
    if (activeTab === "announcements") return n.type === "announcement";
    return true;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <div className="p-4 lg:p-6 page-enter max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>Communication Center</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={markAllRead}>
          <CheckCircle2 size={12} /> Mark all read
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: "var(--muted)" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn("flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all",
              activeTab === tab.id ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {tab.icon} {tab.label}
            {tab.count > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: activeTab === tab.id ? "var(--primary)" : "var(--border)", color: activeTab === tab.id ? "white" : "var(--muted-foreground)", fontSize: "0.6rem" }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bento-card overflow-hidden">
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {filtered.map(n => (
            <div key={n.id}
              className={cn("flex gap-3 px-4 py-4 cursor-pointer transition-colors hover:bg-muted/40 group",
                !n.read && "bg-accent/20")}
              onClick={() => {
                setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                toast.info(`Opening: ${n.title}`);
              }}>
              {!n.read && <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--primary)" }} />}
              {n.read && <div className="w-1.5 h-1.5 flex-shrink-0" />}
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs font-semibold"
                  style={{ background: n.circleColor + "20", color: n.circleColor }}>{n.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold">{n.author}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: n.circleColor + "15", color: n.circleColor, fontSize: "0.6rem" }}>
                    {n.circle}
                  </span>
                  <span className="ml-auto text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>{n.time}</span>
                </div>
                <p className="text-xs font-medium mb-0.5">{n.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{n.body}</p>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                style={{ color: "var(--muted-foreground)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
