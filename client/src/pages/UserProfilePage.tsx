/**
 * User Profile — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Edit3, Mail, Phone, MapPin, Calendar, Award, Users,
  ClipboardList, BookOpen, ChevronRight, Settings, Camera,
  CheckCircle2, Clock, TrendingUp, Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";
const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";

const CIRCLES = [
  { id: "creative", label: "Creative", color: "var(--circle-creative)", role: "Leader" },
  { id: "spirit", label: "Spirit", color: "var(--circle-spirit)", role: "Member" },
  { id: "community", label: "Community", color: "var(--circle-community)", role: "Member" },
  { id: "discovery", label: "Discovery", color: "var(--circle-discovery)", role: "Co-Leader" },
  { id: "mission", label: "Mission", color: "var(--circle-mission)", role: "Member" },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "assignment", text: "Completed: Update Circle Archive", time: "2h ago", color: "var(--circle-discovery)" },
  { id: 2, type: "thread", text: "Replied in Creative Circle thread", time: "Yesterday", color: "var(--circle-creative)" },
  { id: 3, type: "hopper", text: "Added idea: 'Roots & Branches' series", time: "Jun 10", color: "var(--brand-gold)" },
  { id: 4, type: "assignment", text: "Started: Prepare Q3 Outreach Plan", time: "Jun 9", color: "var(--circle-community)" },
  { id: 5, type: "playbook", text: "Reviewed Semester 2 Playbook", time: "Jun 8", color: "var(--brand-blue)" },
];

const STATS = [
  { label: "Assignments Completed", value: "24", icon: <CheckCircle2 size={16} />, color: "var(--circle-community)" },
  { label: "Active Assignments", value: "5", icon: <Clock size={16} />, color: "var(--brand-blue)" },
  { label: "Circles Joined", value: "5", icon: <Users size={16} />, color: "var(--circle-creative)" },
  { label: "Threads Started", value: "12", icon: <TrendingUp size={16} />, color: "var(--circle-mission)" },
];

const TABS = ["Overview", "Activity", "Circles", "Assignments"];

export default function UserProfilePage() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-4 lg:p-6 page-enter max-w-[960px] mx-auto">

      {/* ── Profile Header Card ── */}
      <div className="bento-card overflow-hidden mb-5">
        {/* Cover gradient */}
        <div className="h-28 relative"
          style={{ background: "linear-gradient(135deg, var(--brand-navy) 0%, oklch(0.30 0.12 265) 50%, oklch(0.25 0.08 280) 100%)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, var(--brand-gold) 0%, transparent 60%)" }} />
        </div>

        {/* Profile info */}
        <div className="px-6 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-card">
                <AvatarImage src={PASTOR_AVATAR} className="object-cover" />
                <AvatarFallback className="text-xl font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>PD</AvatarFallback>
              </Avatar>
              <button
                onClick={() => toast.info("Photo upload coming soon")}
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "var(--brand-blue)", color: "white", border: "2px solid var(--card)" }}>
                <Camera size={10} />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-muted"
                style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                <Settings size={12} /> Settings
              </button>
              <button
                onClick={() => toast.info("Edit profile coming soon")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97]"
                style={{ background: "var(--brand-blue)", color: "white" }}>
                <Edit3 size={12} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
                Pastor David Johnson
              </h1>
              <p className="text-sm mt-0.5 font-medium" style={{ color: "var(--brand-blue)" }}>Circle Leader · Senior Pastor</p>
              <p className="text-sm mt-2 max-w-md leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Passionate about discipleship and equipping leaders to multiply their impact across every ministry circle.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Mail size={12} /> pastor.david@church.org
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Phone size={12} /> (555) 012-3456
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <MapPin size={12} /> Austin, TX
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Calendar size={12} /> Joined January 2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {STATS.map(stat => (
          <div key={stat.label} className="bento-card px-4 py-3.5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: stat.color + "18", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif", color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {TABS.map(tab => (
          <button key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg transition-all")}
            style={activeTab === tab
              ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "var(--shadow-sm)" }
              : { color: "var(--muted-foreground)" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* My Circles */}
          <div className="bento-card">
            <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: "var(--brand-blue)" }} />
                <span className="text-sm font-semibold">My Circles</span>
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>5 circles</span>
            </div>
            <div>
              {CIRCLES.map((c, i) => (
                <div key={c.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors cursor-pointer group"
                  style={{ borderBottom: i < CIRCLES.length - 1 ? "1px solid var(--border)" : "none" }}
                  onClick={() => navigate(`/circles/${c.id}`)}>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="flex-1 text-sm font-medium">{c.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: c.color + "18", color: c.color }}>{c.role}</span>
                  <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--muted-foreground)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bento-card">
            <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} style={{ color: "var(--brand-blue)" }} />
                <span className="text-sm font-semibold">Recent Activity</span>
              </div>
            </div>
            <div>
              {RECENT_ACTIVITY.map((act, i) => (
                <div key={act.id}
                  className="flex items-start gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: act.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{act.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bento-card lg:col-span-2">
            <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <Award size={14} style={{ color: "var(--brand-gold)" }} />
                <span className="text-sm font-semibold">Leadership Badges</span>
              </div>
            </div>
            <div className="p-5 flex flex-wrap gap-3">
              {[
                { label: "Circle Leader", icon: "🏆", color: "var(--brand-gold)" },
                { label: "Playbook Champion", icon: "📖", color: "var(--brand-blue)" },
                { label: "Consistent Contributor", icon: "⚡", color: "var(--circle-creative)" },
                { label: "Mentor", icon: "🌱", color: "var(--circle-community)" },
                { label: "Vision Caster", icon: "🎯", color: "var(--circle-mission)" },
              ].map(badge => (
                <div key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: badge.color + "12", border: `1px solid ${badge.color}30` }}>
                  <span className="text-base">{badge.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: badge.color }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="bento-card">
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold">All Activity</h3>
          </div>
          {RECENT_ACTIVITY.concat(RECENT_ACTIVITY).map((act, i) => (
            <div key={i}
              className="flex items-start gap-3 px-5 py-3.5"
              style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: act.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">{act.text}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Circles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CIRCLES.map(c => (
            <div key={c.id}
              className="bento-card p-4 cursor-pointer hover:shadow-md transition-all group"
              onClick={() => navigate(`/circles/${c.id}`)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: c.color + "20" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{c.label} Circle</div>
                  <div className="text-xs" style={{ color: c.color, fontWeight: 600 }}>{c.role}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>12 members</span>
                <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--muted-foreground)" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Assignments" && (
        <div className="bento-card">
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold">All Assignments</h3>
          </div>
          {[
            { title: "Prepare Q3 Outreach Plan", circle: "Community", circleColor: "var(--circle-community)", status: "in-progress", due: "Jun 15" },
            { title: "Review Worship Set for July", circle: "Creative", circleColor: "var(--circle-creative)", status: "not-started", due: "Jun 18" },
            { title: "Update Circle Archive", circle: "Discovery", circleColor: "var(--circle-discovery)", status: "in-progress", due: "Jun 22" },
            { title: "Sermon Series Outline", circle: "Creative", circleColor: "var(--circle-creative)", status: "completed", due: "Jun 5" },
            { title: "Q2 Ministry Report", circle: "Mission", circleColor: "var(--circle-mission)", status: "completed", due: "May 30" },
          ].map((a, i) => (
            <div key={i}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
              style={{ borderBottom: "1px solid var(--border)" }}
              onClick={() => navigate("/assignments")}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.circleColor }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.title}</div>
                <div className="text-xs mt-0.5" style={{ color: a.circleColor, fontWeight: 500 }}>{a.circle}</div>
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Due {a.due}</span>
              <span className={cn("status-badge", `status-${a.status}`)}>{a.status.replace("-", " ")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
