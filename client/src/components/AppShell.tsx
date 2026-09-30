/**
 * AppShell — "Sovereign Clarity" Design System
 * Deep navy sidebar (248px) + crisp white canvas
 * Premium SaaS OS aesthetic: Linear × Notion × ClickUp
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, MessageSquare, Users, BookOpen, Lightbulb,
  Search, Bell, Plus, ChevronDown, ChevronRight, Settings,
  LogOut, Calendar, ClipboardList, X, Menu, GitBranch,
  Zap, User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

const CIRCLES = [
  { id: "creative",  label: "Creative",  color: "var(--circle-creative)"  },
  { id: "spirit",    label: "Spirit",    color: "var(--circle-spirit)"    },
  { id: "community", label: "Community", color: "var(--circle-community)" },
  { id: "discovery", label: "Discovery", color: "var(--circle-discovery)" },
  { id: "mission",   label: "Mission",   color: "var(--circle-mission)"   },
];

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  exact?: boolean;
}

function NavItem({ href, icon, label, badge, exact }: NavItemProps) {
  const [location] = useLocation();
  const isActive = exact ? location === href : location.startsWith(href);
  return (
    <Link href={href}>
      <span className={cn("nav-item group", isActive && "active")}>
        <span className={cn("w-4 h-4 flex-shrink-0 transition-colors", isActive ? "text-[var(--brand-gold)]" : "text-[oklch(0.52_0.025_265)]")}>
          {icon}
        </span>
        <span className="flex-1 truncate">{label}</span>
        {badge != null && badge > 0 && (
          <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
            style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}>
            {badge}
          </span>
        )}
      </span>
    </Link>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [circlesOpen, setCirclesOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, navigate] = useLocation();

  const handleQuickAdd = () => {
    toast("Quick Add", {
      description: "Create an Assignment, Thread, or Hopper entry",
      action: { label: "Assignment", onClick: () => navigate("/assignments") },
    });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ background: "var(--brand-navy)" }}>

      {/* ── Brand Mark ── */}
      <div className="flex items-center gap-3 px-4 py-[18px]" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, oklch(0.52 0.22 262), oklch(0.42 0.18 265))" }}>
          {/* Church cross / leadership icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L15 7.5V16H11.5V11H6.5V16H3V7.5L9 2Z" fill="white" opacity="0.95"/>
            <rect x="7.5" y="4" width="3" height="8" rx="0.5" fill="var(--brand-gold)" opacity="0.9"/>
            <rect x="5" y="6.5" width="8" height="2.5" rx="0.5" fill="var(--brand-gold)" opacity="0.9"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold leading-tight tracking-tight" style={{ color: "oklch(0.96 0.008 265)", fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            Shepherd OS
          </div>
          <div className="text-xs leading-tight" style={{ color: "oklch(0.48 0.025 265)" }}>Leadership Platform</div>
        </div>
        <button className="lg:hidden p-1 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setSidebarOpen(false)}
          style={{ color: "oklch(0.55 0.025 265)" }}>
          <X size={15} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        <NavItem href="/" icon={<LayoutDashboard size={15} />} label="Dashboard" exact />
        <NavItem href="/communication" icon={<MessageSquare size={15} />} label="Communication" badge={3} />
        <NavItem href="/assignments" icon={<ClipboardList size={15} />} label="Assignments" badge={5} />
        <NavItem href="/calendar" icon={<Calendar size={15} />} label="Calendar" />
        <NavItem href="/hopper" icon={<Lightbulb size={15} />} label="The Hopper" />
        <NavItem href="/playbook" icon={<BookOpen size={15} />} label="The Playbook" />

        {/* ── Circles Section ── */}
        <div className="pt-4 pb-1">
          <button
            onClick={() => setCirclesOpen(v => !v)}
            className="flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "oklch(0.42 0.025 265)" }}>
            <span className="sidebar-section-label flex-1 text-left">My Circles</span>
            {circlesOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          </button>
          {circlesOpen && (
            <div className="space-y-0.5 mt-0.5">
              {CIRCLES.map(c => {
                const isActive = location.startsWith(`/circles/${c.id}`);
                return (
                  <Link key={c.id} href={`/circles/${c.id}`}>
                    <span className={cn("nav-item text-sm", isActive && "active")}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      {c.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* ── Bottom Utilities ── */}
      <div className="px-2.5 py-3 space-y-0.5" style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
        <NavItem href="/search" icon={<Search size={15} />} label="Search & Archive" />
        <NavItem href="/notifications" icon={<Bell size={15} />} label="Notifications" badge={4} />
        <NavItem href="/settings" icon={<Settings size={15} />} label="Settings" />

        {/* ── User Card ── */}
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 w-full px-2 py-2 rounded-xl transition-colors hover:bg-white/06 group"
                style={{ background: "oklch(1 0 0 / 0.04)" }}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={PASTOR_AVATAR} alt="Pastor David" className="object-cover" />
                  <AvatarFallback className="text-xs font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>PD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-semibold truncate leading-tight" style={{ color: "oklch(0.88 0.010 265)" }}>Pastor David</div>
                  <div className="text-xs truncate leading-tight" style={{ color: "oklch(0.48 0.025 265)", fontSize: "0.6875rem" }}>Circle Leader</div>
                </div>
                <ChevronDown size={12} style={{ color: "oklch(0.45 0.025 265)" }} className="flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-52 mb-1">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User size={14} className="mr-2" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings size={14} className="mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => toast.info("Sign out clicked")}>
                <LogOut size={14} className="mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-[248px] flex-shrink-0 h-full" style={{ borderRight: "1px solid oklch(1 0 0 / 0.07)" }}>
        {sidebarContent}
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-[248px] h-full z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Topbar ── */}
        <header className="flex items-center gap-3 px-4 lg:px-5 h-[52px] flex-shrink-0"
          style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={() => setSidebarOpen(true)}>
            <Menu size={16} style={{ color: "var(--muted-foreground)" }} />
          </button>

          {/* Search */}
          <button className="topbar-search flex-1 max-w-[380px]" onClick={() => navigate("/search")}>
            <Search size={13} />
            <span className="flex-1 text-left">Search everything…</span>
            <kbd>⌘K</kbd>
          </button>

          <div className="flex-1" />

          {/* Quick Add */}
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97]"
            style={{ background: "var(--brand-blue)", color: "white", boxShadow: "0 1px 3px oklch(0.52 0.22 262 / 0.35)" }}>
            <Plus size={13} />
            <span className="hidden sm:inline">Quick Add</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => navigate("/notifications")}>
            <Bell size={16} style={{ color: "var(--muted-foreground)" }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--brand-gold)" }} />
          </button>

          {/* Avatar */}
          <button onClick={() => navigate("/profile")} className="flex-shrink-0">
            <Avatar className="w-7 h-7 ring-2 ring-offset-1 transition-all hover:ring-[var(--brand-blue)]"
>
              <AvatarImage src={PASTOR_AVATAR} alt="Pastor David" className="object-cover" />
              <AvatarFallback className="text-xs font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>PD</AvatarFallback>
            </Avatar>
          </button>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
