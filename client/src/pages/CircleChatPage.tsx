/**
 * Circle Chat — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 */
import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  Hash, Plus, Search, Send, Paperclip, AtSign, Smile,
  MoreHorizontal, Pin, Archive, ChevronRight, FileText, CheckSquare
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";
const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

const CIRCLE_META: Record<string, { label: string; color: string }> = {
  creative:  { label: "Creative",  color: "var(--circle-creative)"  },
  spirit:    { label: "Spirit",    color: "var(--circle-spirit)"    },
  community: { label: "Community", color: "var(--circle-community)" },
  discovery: { label: "Discovery", color: "var(--circle-discovery)" },
  mission:   { label: "Mission",   color: "var(--circle-mission)"   },
};

const THREADS = [
  { id: 1, title: "Q3 Event Planning Kickoff", msgs: 14, updated: "2h ago", unread: 3, pinned: true },
  { id: 2, title: "Volunteer Coordination — July", msgs: 7, updated: "Yesterday", unread: 0, pinned: false },
  { id: 3, title: "Budget Review Notes", msgs: 22, updated: "Jun 10", unread: 0, pinned: false },
  { id: 4, title: "Vision Casting — Semester 3", msgs: 5, updated: "Jun 8", unread: 0, pinned: false },
];

const MESSAGES = [
  { id: 1, author: "Pastor David", avatar: PASTOR_AVATAR, time: "9:14 AM",
    text: "Good morning team! Let's kick off the Q3 planning. I've attached the vision doc from last week's leadership meeting.",
    reactions: [{ emoji: "👍", count: 3 }, { emoji: "🙏", count: 2 }] },
  { id: 2, author: "Sarah K.", avatar: SARAH_AVATAR, time: "9:22 AM",
    text: "Thanks Pastor David! I reviewed the doc. I think we should prioritize the community garden initiative — it aligns perfectly with our Discipleship focus this semester.",
    reactions: [{ emoji: "❤️", count: 4 }] },
  { id: 3, author: "Marcus R.", avatar: MARCUS_AVATAR, time: "9:35 AM",
    text: "@Sarah K. Agreed. I can take the lead on the venue coordination. Should I create an assignment for that?",
    reactions: [] },
  { id: 4, author: "Pastor David", avatar: PASTOR_AVATAR, time: "9:38 AM",
    text: "Yes Marcus, please do. Tag it to this thread and set the due date for June 20. @Sarah K. can you handle the volunteer outreach list?",
    reactions: [{ emoji: "👍", count: 2 }] },
  { id: 5, author: "Sarah K.", avatar: SARAH_AVATAR, time: "9:41 AM",
    text: "On it! I'll have the list ready by Friday. I'll also loop in the Mission Circle to coordinate.",
    reactions: [{ emoji: "✅", count: 3 }] },
];

export default function CircleChatPage() {
  const { id } = useParams<{ id: string }>();
  const circle = CIRCLE_META[id ?? "creative"] ?? CIRCLE_META.creative;
  const [activeThread, setActiveThread] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <div className="flex page-enter" style={{ height: "calc(100vh - 56px)" }}>
      {/* Thread List Sidebar */}
      <div className="w-60 flex-shrink-0 flex flex-col" style={{ background: "var(--muted)", borderRight: "1px solid var(--border)" }}>
        <div className="p-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
              Threads
            </span>
            <button onClick={() => toast.info("New thread")}
              className="p-1 rounded-lg hover:bg-border transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              <Plus size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <Search size={11} style={{ color: "var(--muted-foreground)" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Search threads…</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {THREADS.map(t => (
            <button key={t.id}
              onClick={() => setActiveThread(t.id)}
              className={cn("w-full text-left p-2.5 rounded-xl transition-all")}
              style={activeThread === t.id
                ? { background: "var(--card)", boxShadow: "var(--shadow-xs)", border: "1px solid var(--border)" }
                : { border: "1px solid transparent" }}>
              <div className="flex items-start gap-2">
                <Hash size={11} className="mt-0.5 flex-shrink-0" style={{ color: circle.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold truncate">{t.title}</p>
                    {t.unread > 0 && (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: circle.color, color: "white", fontSize: "0.55rem" }}>{t.unread}</span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)", fontSize: "0.625rem" }}>
                    {t.msgs} msgs · {t.updated}
                  </p>
                </div>
              </div>
              {t.pinned && (
                <div className="flex items-center gap-1 mt-1 ml-5">
                  <Pin size={9} style={{ color: "var(--brand-gold)" }} />
                  <span style={{ color: "var(--brand-gold)", fontSize: "0.55rem", fontWeight: 600 }}>Pinned</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-2" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={() => toast.info("Opening archive…")}
            className="flex items-center gap-2 text-xs w-full px-2.5 py-2 rounded-lg hover:bg-card transition-colors"
            style={{ color: "var(--muted-foreground)" }}>
            <Archive size={11} /> Archived Threads
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Thread Header */}
        <div className="flex items-center gap-3 px-5 py-3"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: circle.color + "20" }}>
            <Hash size={14} style={{ color: circle.color }} />
          </div>
          <div>
            <h2 className="text-sm font-bold">Q3 Event Planning Kickoff</h2>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>5 participants · 14 messages</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {[PASTOR_AVATAR, SARAH_AVATAR, MARCUS_AVATAR].map((av, i) => (
                <Avatar key={i} className="w-6 h-6 ring-2 ring-card">
                  <AvatarImage src={av} className="object-cover" />
                  <AvatarFallback style={{ background: circle.color + "30", color: circle.color, fontSize: "0.5rem" }}>?</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-6 h-6 rounded-full ring-2 ring-card flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.55rem" }}>+2</div>
            </div>
            <div className="flex items-center gap-1">
              <Link href={`/circles/${id ?? "creative"}/assignments`}>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:bg-muted"
                  style={{ color: "var(--muted-foreground)" }}>
                  <CheckSquare size={12} /> Assignments
                </button>
              </Link>
              <Link href={`/circles/${id ?? "creative"}/files`}>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:bg-muted"
                  style={{ color: "var(--muted-foreground)" }}>
                  <FileText size={12} /> Files
                </button>
              </Link>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={() => toast.info("Thread options")}>
                <MoreHorizontal size={14} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {MESSAGES.map(msg => (
            <div key={msg.id} className="flex gap-3 group">
              <Avatar className="w-8 h-8 flex-shrink-0 mt-0.5">
                <AvatarImage src={msg.avatar} className="object-cover" />
                <AvatarFallback className="text-xs font-bold"
                  style={{ background: circle.color + "20", color: circle.color }}>
                  {msg.author.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-bold">{msg.author}</span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>{msg.time}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                  {msg.text.split(/@(\S+)/g).map((part, i) =>
                    i % 2 === 1
                      ? <span key={i} className="font-semibold cursor-pointer hover:underline" style={{ color: circle.color }}>@{part}</span>
                      : <span key={i}>{part}</span>
                  )}
                </p>
                {msg.reactions.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    {msg.reactions.map((r, i) => (
                      <button key={i}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs transition-all hover:scale-105"
                        style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                        onClick={() => toast.info("Reaction added")}>
                        <span>{r.emoji}</span>
                        <span className="font-semibold" style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>{r.count}</span>
                      </button>
                    ))}
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted"
                      onClick={() => toast.info("Add reaction")}
                      style={{ color: "var(--muted-foreground)" }}>
                      <Smile size={12} />
                    </button>
                  </div>
                )}
              </div>
              {/* Hover actions */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1 pt-0.5">
                <button className="p-1 rounded-lg hover:bg-muted transition-colors" onClick={() => toast.info("Reply in thread")}>
                  <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
          <div className="flex items-end gap-2 p-3 rounded-xl transition-all"
            style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Message Q3 Event Planning Kickoff…"
              rows={1}
              className="flex-1 text-sm bg-transparent outline-none resize-none leading-relaxed"
              style={{ color: "var(--foreground)" }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) { toast.success("Message sent!"); setMessage(""); }
                }
              }}
            />
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded-lg hover:bg-border transition-colors"
                onClick={() => toast.info("Attach file")}
                style={{ color: "var(--muted-foreground)" }}>
                <Paperclip size={13} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-border transition-colors"
                onClick={() => toast.info("Mention someone")}
                style={{ color: "var(--muted-foreground)" }}>
                <AtSign size={13} />
              </button>
              <button
                onClick={() => { if (message.trim()) { toast.success("Message sent!"); setMessage(""); } }}
                className="p-1.5 rounded-lg transition-all active:scale-[0.97]"
                style={{
                  background: message.trim() ? circle.color : "var(--border)",
                  color: message.trim() ? "white" : "var(--muted-foreground)",
                }}>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
