/**
 * UX Flow Map — Visual overview of all 7 flows and their screen hierarchies
 * This is a UX documentation screen, accessible from the sidebar
 */
import { Link } from "wouter";
import { ChevronRight, LayoutDashboard, Users, ClipboardList, Calendar, BookOpen, Search, Settings, Bell, Lightbulb } from "lucide-react";

const FLOWS = [
  {
    id: "dashboard",
    label: "Dashboard Flow",
    icon: <LayoutDashboard size={18} />,
    color: "oklch(0.42 0.18 265)",
    description: "The central hub. Personalised Bento grid with 5 live widgets: Updates, Assignments, Calendar, Hopper, and Playbook progress.",
    screens: [
      { name: "Dashboard", path: "/", current: true },
      { name: "→ Communication Center", path: "/communication" },
      { name: "→ Assignments List", path: "/assignments" },
      { name: "→ Full Calendar", path: "/calendar" },
      { name: "→ The Hopper", path: "/hopper" },
      { name: "→ The Playbook", path: "/playbook" },
    ],
  },
  {
    id: "circles",
    label: "Circle Flow",
    icon: <Users size={18} />,
    color: "var(--circle-community)",
    description: "Ministry group workspace. Each Circle has a hub, threaded chat, assignment board, and shared file library.",
    screens: [
      { name: "Circle Hub", path: "/circles/community" },
      { name: "→ Chat & Threads", path: "/circles/community/chat" },
      { name: "→ Circle Assignments", path: "/circles/community/assignments" },
      { name: "→ Circle Files", path: "/circles/community/files" },
    ],
  },
  {
    id: "assignments",
    label: "Assignment Flow",
    icon: <ClipboardList size={18} />,
    color: "oklch(0.42 0.18 265)",
    description: "Task lifecycle management. Create, assign, track, and close assignments with status transitions and linked threads.",
    screens: [
      { name: "Assignments List", path: "/assignments" },
      { name: "→ Assignment Detail", path: "/assignments/1" },
      { name: "→ Status: Not Started → In Progress → Waiting → Completed", path: "/assignments/1" },
      { name: "→ Related Thread (Circle)", path: "/circles/community/chat" },
    ],
  },
  {
    id: "calendar",
    label: "Calendar Flow",
    icon: <Calendar size={18} />,
    color: "oklch(0.60 0.17 160)",
    description: "Project timeline across 5 views: Weekly, Monthly, Quarterly, Semester, and Annual. Color-coded by Circle.",
    screens: [
      { name: "Dashboard Calendar Widget", path: "/" },
      { name: "→ Full Calendar (Monthly)", path: "/calendar" },
      { name: "→ View: Weekly / Quarterly / Semester / Annual", path: "/calendar" },
      { name: "→ Event Detail / Add Event Modal", path: "/calendar" },
    ],
  },
  {
    id: "playbook",
    label: "Playbook Flow",
    icon: <BookOpen size={18} />,
    color: "oklch(0.78 0.14 75)",
    description: "Annual ministry planning. 3 Semesters × 4 Phases (Dedication, Discipleship, Development, Distribution).",
    screens: [
      { name: "Playbook Overview", path: "/playbook" },
      { name: "→ Semester 1 Detail", path: "/playbook/s1" },
      { name: "→ Semester 2 Detail (Active)", path: "/playbook/s2" },
      { name: "→ Semester 3 Detail", path: "/playbook/s3" },
      { name: "→ Generate Assignments from Plan", path: "/playbook/s2" },
    ],
  },
  {
    id: "search",
    label: "Search Flow",
    icon: <Search size={18} />,
    color: "oklch(0.62 0.16 35)",
    description: "Global search across all content types with type filters, keyword highlighting, and archive toggle.",
    screens: [
      { name: "Top Bar Search (⌘K)", path: "/search" },
      { name: "→ Global Search Results", path: "/search" },
      { name: "→ Filter: Threads / Assignments / Docs / Calendar / Playbook / Hopper", path: "/search" },
      { name: "→ Archive Search Toggle", path: "/search" },
      { name: "→ Result → Navigate to Source", path: "/search" },
    ],
  },
  {
    id: "settings",
    label: "Settings Flow",
    icon: <Settings size={18} />,
    color: "oklch(0.55 0.01 260)",
    description: "User profile, notification preferences, workspace integrations, and admin panel (role-gated).",
    screens: [
      { name: "Settings — Profile", path: "/settings" },
      { name: "→ Notifications", path: "/settings" },
      { name: "→ Integrations (Google, Loom, Email)", path: "/settings" },
      { name: "→ Admin Panel (Admin only)", path: "/settings" },
      { name: "→ User Mgmt / Circle Mgmt / Audit Logs", path: "/settings" },
    ],
  },
];

export default function FlowMapPage() {
  return (
    <div className="p-4 lg:p-6 page-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>UX Flow Map</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Complete screen hierarchy and navigation structure for all 7 flows. Click any screen to navigate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 card-stagger">
        {FLOWS.map(flow => (
          <div key={flow.id} className="bento-card overflow-hidden">
            {/* Flow Header */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "var(--border)", background: flow.color + "08" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: flow.color + "15", color: flow.color }}>
                {flow.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: flow.color }}>{flow.label}</h3>
                <p className="text-xs leading-snug mt-0.5" style={{ color: "var(--muted-foreground)" }}>{flow.description}</p>
              </div>
            </div>
            {/* Screen List */}
            <div className="p-3 space-y-1">
              {flow.screens.map((screen, i) => (
                <Link key={i} href={screen.path}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/60 group ${screen.current ? "bg-primary/8" : ""}`}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: i === 0 ? flow.color : "var(--border)" }} />
                    <span className={`text-xs flex-1 ${i === 0 ? "font-semibold" : "text-muted-foreground"}`}
                      style={i === 0 ? { color: flow.color } : {}}>
                      {screen.name}
                    </span>
                    {i === 0 && (
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: flow.color }} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Connections */}
      <div className="mt-6 bento-card p-5">
        <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cross-Flow Navigation Connections</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
          {[
            { from: "Assignment Detail", to: "Circle Thread", desc: "Linked thread opens in Circle Chat" },
            { from: "Dashboard Updates", to: "Communication Center", desc: "View all → full notification inbox" },
            { from: "Playbook Phase", to: "Assignments", desc: "Generate Assignments from planning items" },
            { from: "Circle Assignment", to: "Global Assignments", desc: "All assignments aggregated in one view" },
            { from: "Search Result", to: "Any Screen", desc: "Results navigate to source content" },
            { from: "Calendar Event", to: "Assignment / Thread", desc: "Events link to related tasks or discussions" },
            { from: "Hopper Idea", to: "Project / Assignment", desc: "Convert idea to actionable project" },
            { from: "Communication Notification", to: "Circle / Assignment", desc: "Tap notification → navigate to source" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "var(--muted)" }}>
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>{c.from}</span>
              <ChevronRight size={10} />
              <span className="font-semibold" style={{ color: "var(--primary)" }}>{c.to}</span>
              <span className="ml-auto text-right" style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
