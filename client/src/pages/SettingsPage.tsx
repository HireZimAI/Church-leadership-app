/**
 * User Settings Flow — Profile, Notifications, Integrations, Admin Panel
 */
import { useState } from "react";
import { User, Bell, Link2, Shield, Users, Settings, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: <User size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} /> },
  { id: "integrations", label: "Integrations", icon: <Link2 size={14} /> },
  { id: "admin", label: "Admin Panel", icon: <Shield size={14} />, adminOnly: true },
];

const INTEGRATIONS = [
  { name: "Google Workspace", description: "Docs, Sheets, Slides, Calendar, Drive", connected: true, icon: "G" },
  { name: "Google Calendar", description: "Sync assignments and events", connected: true, icon: "📅" },
  { name: "Loom", description: "Embed and record videos", connected: false, icon: "▶" },
  { name: "Email (SMTP)", description: "Notification delivery via email", connected: true, icon: "✉" },
  { name: "Cloud Storage", description: "External file storage integration", connected: false, icon: "☁" },
];

const NOTIFICATION_PREFS = [
  { label: "New Assignments", description: "When you're assigned a new task", email: true, inApp: true },
  { label: "Mentions", description: "When someone @mentions you", email: true, inApp: true },
  { label: "Due Date Reminders", description: "24h and 1h before due dates", email: true, inApp: true },
  { label: "Comments on Assignments", description: "New comments on your tasks", email: false, inApp: true },
  { label: "Circle Announcements", description: "Team-wide announcements", email: true, inApp: true },
  { label: "Calendar Reminders", description: "Upcoming events and milestones", email: false, inApp: true },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [prefs, setPrefs] = useState(NOTIFICATION_PREFS);

  const togglePref = (index: number, channel: "email" | "inApp") => {
    setPrefs(prev => prev.map((p, i) => i === index ? { ...p, [channel]: !p[channel] } : p));
    toast.success("Preference updated");
  };

  return (
    <div className="p-4 lg:p-6 page-enter">
      <h1 className="text-2xl font-semibold tracking-tight mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Settings</h1>

      <div className="flex gap-5">
        {/* Sidebar Nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={cn("flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                  activeSection === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                {s.icon} {s.label}
                {s.adminOnly && <span className="ml-auto text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.62 0.16 35)20", color: "oklch(0.62 0.16 35)", fontSize: "0.55rem" }}>Admin</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile */}
          {activeSection === "profile" && (
            <div className="bento-card p-5 space-y-5">
              <h2 className="text-base font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Profile</h2>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl font-bold" style={{ background: "oklch(0.42 0.18 265)", color: "white" }}>PD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => toast.info("Upload photo")}>Change Photo</Button>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: "David" },
                  { label: "Last Name", value: "Johnson" },
                  { label: "Email", value: "david@church.org" },
                  { label: "Role", value: "Circle Leader" },
                  { label: "Ministry Area", value: "Discovery Circle" },
                  { label: "Phone", value: "+1 (555) 000-0000" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-medium block mb-1" style={{ color: "var(--muted-foreground)" }}>{f.label}</label>
                    <input defaultValue={f.value} className="w-full text-sm px-3 py-2 rounded-lg border outline-none transition-colors focus:border-primary/50"
                      style={{ background: "var(--muted)", borderColor: "var(--border)" }} />
                  </div>
                ))}
              </div>
              <Button size="sm" className="h-8 text-xs" style={{ background: "var(--primary)", color: "white" }}
                onClick={() => toast.success("Profile saved!")}>Save Changes</Button>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="bento-card overflow-hidden">
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <h2 className="text-base font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Notification Preferences</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Choose how and when you receive notifications</p>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                <div className="grid grid-cols-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", background: "var(--muted)" }}>
                  <span>Notification Type</span>
                  <span className="text-center">In-App</span>
                  <span className="text-center">Email</span>
                </div>
                {prefs.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 items-center px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.description}</p>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => togglePref(i, "inApp")}
                        className={cn("w-9 h-5 rounded-full transition-colors relative", p.inApp ? "bg-primary" : "bg-muted-foreground/30")}>
                        <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", p.inApp ? "translate-x-4" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => togglePref(i, "email")}
                        className={cn("w-9 h-5 rounded-full transition-colors relative", p.email ? "bg-primary" : "bg-muted-foreground/30")}>
                        <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", p.email ? "translate-x-4" : "translate-x-0.5")} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === "integrations" && (
            <div className="bento-card overflow-hidden">
              <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <h2 className="text-base font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Workspace Integrations</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Connect your organizational tools</p>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {INTEGRATIONS.map((int, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-4">
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-lg flex-shrink-0"
                      style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {int.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{int.name}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{int.description}</p>
                    </div>
                    <Button variant={int.connected ? "outline" : "default"} size="sm" className="h-8 text-xs flex-shrink-0"
                      style={int.connected ? {} : { background: "var(--primary)", color: "white" }}
                      onClick={() => toast.info(int.connected ? `Disconnect ${int.name}` : `Connect ${int.name}`)}>
                      {int.connected ? (
                        <><Check size={12} className="mr-1 text-green-500" /> Connected</>
                      ) : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Panel */}
          {activeSection === "admin" && (
            <div className="space-y-4">
              <div className="bento-card p-4">
                <h2 className="text-base font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Admin Panel</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {[
                    { label: "User Management", description: "Add, edit, and manage platform users and roles", icon: <Users size={20} />, color: "oklch(0.42 0.18 265)" },
                    { label: "Circle Management", description: "Create and configure ministry Circles", icon: <Settings size={20} />, color: "oklch(0.60 0.17 160)" },
                    { label: "Security & Audit", description: "Review activity logs and access controls", icon: <Shield size={20} />, color: "oklch(0.62 0.16 35)" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => toast.info(`Opening ${item.label}`)}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: item.color + "15", color: item.color }}>
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</h3>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{item.description}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "var(--primary)" }}>
                        Open <ChevronRight size={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flow Annotation */}
      <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: "var(--border)" }}>
        <p className="wf-label mb-2">Settings Flow — Screen Hierarchy</p>
        <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">Settings (this screen)</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-muted">Profile</span>
          <span className="px-2 py-1 rounded bg-muted">Notifications</span>
          <span className="px-2 py-1 rounded bg-muted">Integrations</span>
          <span className="px-2 py-1 rounded bg-muted">Admin Panel (Admin only)</span>
          <ChevronRight size={12} />
          <span className="px-2 py-1 rounded bg-muted">User Mgmt / Circle Mgmt / Audit Logs</span>
        </div>
      </div>
    </div>
  );
}
