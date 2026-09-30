/**
 * Thread View — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 * Full conversation thread with replies, reactions, file attachments
 */
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import {
  ArrowLeft, Paperclip, Send, Smile, MoreHorizontal,
  ThumbsUp, Heart, CheckCircle2, MessageSquare, Pin,
  Hash, Users, ChevronRight, Reply, FileText, Image
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SARAH_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-sarah-NuBLQcqfgsXTXos7o4vtFF.webp";
const MARCUS_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-marcus-2GawqUsvDEcrXUtQMUBEE5.webp";
const PASTOR_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456929423/BNyLaKvRwUX66Yv4uezb8C/avatar-pastor-DVbUYKNXF9abivWxGsYAmc.webp";

interface Message {
  id: number;
  author: string;
  avatar: string;
  role: string;
  time: string;
  body: string;
  isOwn?: boolean;
  reactions?: { emoji: string; count: number; reacted: boolean }[];
  attachment?: { name: string; type: "file" | "image"; size: string };
  pinned?: boolean;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    author: "Pastor Marcus",
    avatar: MARCUS_AVATAR,
    role: "Circle Leader",
    time: "Monday, Jun 10 · 9:14am",
    body: "Hey team — I've been thinking about our Q3 worship direction. I want us to lean into themes of restoration and community. What are your thoughts on a 'Roots & Branches' series concept?",
    reactions: [{ emoji: "🔥", count: 4, reacted: false }, { emoji: "❤️", count: 2, reacted: true }],
    pinned: true,
  },
  {
    id: 2,
    author: "Sarah K.",
    avatar: SARAH_AVATAR,
    role: "Worship Lead",
    time: "9:32am",
    body: "Love this direction! 'Roots & Branches' has so much visual and lyrical potential. I'm thinking we could tie it to the discipleship curriculum for Semester 2 — really reinforce what people are learning in their Circles.",
    reactions: [{ emoji: "👍", count: 3, reacted: false }],
  },
  {
    id: 3,
    author: "Pastor David",
    avatar: PASTOR_AVATAR,
    role: "Senior Pastor",
    time: "10:05am",
    body: "Agreed with Sarah — the alignment with Semester 2 is key. @Pastor Marcus can you put together a brief outline? Even a 3-slide deck would help us get everyone aligned before Sunday's planning session.",
    isOwn: true,
    reactions: [{ emoji: "✅", count: 2, reacted: false }],
  },
  {
    id: 4,
    author: "Pastor Marcus",
    avatar: MARCUS_AVATAR,
    role: "Circle Leader",
    time: "11:20am",
    body: "On it! I'll have something ready by Thursday. Also attaching the Q2 worship retrospective — useful context for where we've been.",
    attachment: { name: "Q2 Worship Retrospective.pdf", type: "file", size: "2.4 MB" },
    reactions: [{ emoji: "🙏", count: 5, reacted: true }],
  },
  {
    id: 5,
    author: "Sarah K.",
    avatar: SARAH_AVATAR,
    role: "Worship Lead",
    time: "Tuesday, Jun 11 · 2:45pm",
    body: "I started sketching out some song selections. Here's a rough concept board — would love feedback before I finalize the set list.",
    attachment: { name: "Q3 Concept Board.jpg", type: "image", size: "1.1 MB" },
  },
  {
    id: 6,
    author: "Pastor David",
    avatar: PASTOR_AVATAR,
    role: "Senior Pastor",
    time: "3:12pm",
    body: "This is excellent, Sarah. The visual direction is exactly right. Let's lock in the first two weeks of the series and leave room for the Spirit to lead on weeks 3 and 4.",
    isOwn: true,
    reactions: [{ emoji: "❤️", count: 3, reacted: false }, { emoji: "🔥", count: 2, reacted: false }],
  },
];

export default function ThreadViewPage() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string; threadId: string }>();
  const circleId = params.id || "creative";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const circleColors: Record<string, string> = {
    creative: "var(--circle-creative)",
    spirit: "var(--circle-spirit)",
    community: "var(--circle-community)",
    discovery: "var(--circle-discovery)",
    mission: "var(--circle-mission)",
  };
  const circleColor = circleColors[circleId] || "var(--brand-blue)";
  const circleName = circleId.charAt(0).toUpperCase() + circleId.slice(1);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      author: "Pastor David",
      avatar: PASTOR_AVATAR,
      role: "Senior Pastor",
      time: "Just now",
      body: message,
      isOwn: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage("");
    toast.success("Message sent");
  };

  return (
    <div className="flex flex-col h-full page-enter" style={{ background: "var(--background)" }}>

      {/* ── Thread Header ── */}
      <div className="flex items-center gap-3 px-4 lg:px-5 py-3 flex-shrink-0"
        style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <button
          onClick={() => navigate(`/circles/${circleId}/chat`)}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0">
          <ArrowLeft size={15} style={{ color: "var(--muted-foreground)" }} />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: circleColor + "20" }}>
            <Hash size={13} style={{ color: circleColor }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold truncate">Worship Set Themes for Q3</span>
              {MESSAGES[0].pinned && (
                <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{ background: "var(--brand-gold)" + "20", color: "var(--brand-gold)" }}>
                  <Pin size={9} /> Pinned
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: circleColor, fontWeight: 600 }}>{circleName} Circle</span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>· {messages.length} messages · 3 participants</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Participant avatars */}
          <div className="flex -space-x-2 mr-2">
            {[MARCUS_AVATAR, SARAH_AVATAR, PASTOR_AVATAR].map((av, i) => (
              <Avatar key={i} className="w-6 h-6 ring-2 ring-card">
                <AvatarImage src={av} className="object-cover" />
                <AvatarFallback className="text-xs" style={{ background: "var(--muted)" }}>?</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <MoreHorizontal size={15} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-5 space-y-5">
        {messages.map((msg, i) => {
          const showDate = i === 0 || (i > 0 && messages[i - 1].time.includes(",") !== msg.time.includes(","));
          return (
            <div key={msg.id}>
              {/* Date divider */}
              {msg.time.includes(",") && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                    {msg.time.split(" · ")[0]}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                </div>
              )}

              {/* Message bubble */}
              <div className={cn("flex items-start gap-3 group", msg.isOwn && "flex-row-reverse")}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={msg.avatar} className="object-cover" />
                  <AvatarFallback className="text-xs font-bold" style={{ background: "var(--muted)" }}>
                    {msg.author[0]}
                  </AvatarFallback>
                </Avatar>

                <div className={cn("flex-1 min-w-0 max-w-[75%]", msg.isOwn && "flex flex-col items-end")}>
                  {/* Author + time */}
                  <div className={cn("flex items-center gap-2 mb-1.5", msg.isOwn && "flex-row-reverse")}>
                    <span className="text-xs font-semibold">{msg.author}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.625rem" }}>
                      {msg.role}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.6875rem" }}>
                      {msg.time.includes(",") ? msg.time.split(" · ")[1] : msg.time}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div className={cn("rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.isOwn
                      ? "rounded-tr-sm"
                      : "rounded-tl-sm"
                  )} style={{
                    background: msg.isOwn ? "var(--brand-blue)" : "var(--card)",
                    color: msg.isOwn ? "white" : "var(--foreground)",
                    border: msg.isOwn ? "none" : "1px solid var(--border)",
                    boxShadow: "var(--shadow-xs)",
                  }}>
                    {msg.body}

                    {/* Attachment */}
                    {msg.attachment && (
                      <div className="mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all hover:opacity-80"
                        style={{
                          background: msg.isOwn ? "rgba(255,255,255,0.15)" : "var(--muted)",
                          border: msg.isOwn ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)",
                        }}
                        onClick={() => toast.info(`Opening: ${msg.attachment!.name}`)}>
                        {msg.attachment.type === "file"
                          ? <FileText size={14} style={{ color: msg.isOwn ? "rgba(255,255,255,0.8)" : "var(--brand-blue)" }} />
                          : <Image size={14} style={{ color: msg.isOwn ? "rgba(255,255,255,0.8)" : "var(--circle-creative)" }} />
                        }
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{msg.attachment.name}</div>
                          <div className="text-xs opacity-70">{msg.attachment.size}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={cn("flex items-center gap-1 mt-1.5", msg.isOwn && "flex-row-reverse")}>
                      {msg.reactions.map((r, j) => (
                        <button key={j}
                          className={cn(
                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-all hover:scale-105",
                          )}
                          style={{
                            background: r.reacted ? "oklch(0.93 0.08 262)" : "var(--muted)",
                            border: `1px solid ${r.reacted ? "oklch(0.82 0.12 262)" : "var(--border)"}`,
                            color: r.reacted ? "var(--brand-blue)" : "var(--muted-foreground)",
                          }}
                          onClick={() => toast.info("Reaction toggled")}>
                          {r.emoji} {r.count}
                        </button>
                      ))}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted"
                        onClick={() => toast.info("Add reaction")}>
                        <Smile size={12} style={{ color: "var(--muted-foreground)" }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Hover actions */}
                <div className={cn(
                  "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1",
                  msg.isOwn && "flex-row-reverse"
                )}>
                  <button className="p-1 rounded-md hover:bg-muted transition-colors" onClick={() => toast.info("Reply")}>
                    <Reply size={12} style={{ color: "var(--muted-foreground)" }} />
                  </button>
                  <button className="p-1 rounded-md hover:bg-muted transition-colors" onClick={() => toast.info("More options")}>
                    <MoreHorizontal size={12} style={{ color: "var(--muted-foreground)" }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Message Composer ── */}
      <div className="flex-shrink-0 px-4 lg:px-6 py-4" style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
        <div className="flex items-end gap-3 p-3 rounded-2xl"
          style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
          <Avatar className="w-7 h-7 flex-shrink-0 mb-0.5">
            <AvatarImage src={PASTOR_AVATAR} className="object-cover" />
            <AvatarFallback className="text-xs font-bold" style={{ background: "var(--brand-blue)", color: "white" }}>PD</AvatarFallback>
          </Avatar>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Reply in ${circleName} thread…`}
            rows={1}
            className="flex-1 text-sm resize-none outline-none bg-transparent leading-relaxed"
            style={{ color: "var(--foreground)", maxHeight: "120px" }}
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={() => toast.info("Attach file")}>
              <Paperclip size={14} style={{ color: "var(--muted-foreground)" }} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={() => toast.info("Add emoji")}>
              <Smile size={14} style={{ color: "var(--muted-foreground)" }} />
            </button>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-[0.95] disabled:opacity-40"
              style={{ background: message.trim() ? "var(--brand-blue)" : "var(--muted)", color: message.trim() ? "white" : "var(--muted-foreground)" }}>
              <Send size={13} />
            </button>
          </div>
        </div>
        <p className="text-xs mt-1.5 text-center" style={{ color: "var(--muted-foreground)" }}>
          Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
