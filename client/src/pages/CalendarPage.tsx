/**
 * Calendar — High-Fidelity Screen
 * "Sovereign Clarity" Design System
 */
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CIRCLE_COLORS: Record<string, string> = {
  Creative: "var(--circle-creative)",
  Spirit: "var(--circle-spirit)",
  Community: "var(--circle-community)",
  Discovery: "var(--circle-discovery)",
  Mission: "var(--circle-mission)",
  "All Circles": "var(--brand-gold)",
};

interface CalEvent {
  id: number;
  title: string;
  circle: string;
  date: number;
  time: string;
  location?: string;
  attendees?: number;
  type: "meeting" | "deadline" | "event" | "retreat";
}

const EVENTS: CalEvent[] = [
  { id: 1, title: "All-Leaders Meeting", circle: "All Circles", date: 12, time: "9:00 AM", location: "Main Hall", attendees: 24, type: "meeting" },
  { id: 2, title: "Creative Planning Session", circle: "Creative", date: 13, time: "2:00 PM", location: "Room 204", attendees: 8, type: "meeting" },
  { id: 3, title: "Q3 Outreach Plan Due", circle: "Community", date: 15, time: "End of Day", type: "deadline" },
  { id: 4, title: "Discovery Circle Chat", circle: "Discovery", date: 15, time: "4:00 PM", attendees: 6, type: "meeting" },
  { id: 5, title: "Mission Debrief", circle: "Mission", date: 16, time: "11:00 AM", location: "Room 101", attendees: 12, type: "meeting" },
  { id: 6, title: "Worship Review", circle: "Creative", date: 18, time: "10:00 AM", attendees: 5, type: "meeting" },
  { id: 7, title: "Spirit Circle Retreat", circle: "Spirit", date: 21, time: "All Day", location: "Mountain Venue", attendees: 18, type: "retreat" },
  { id: 8, title: "Volunteer Onboarding", circle: "Mission", date: 22, time: "3:00 PM", location: "Fellowship Hall", attendees: 15, type: "event" },
  { id: 9, title: "Sermon Series Outline Due", circle: "Creative", date: 25, time: "End of Day", type: "deadline" },
  { id: 10, title: "Community Outreach Day", circle: "Community", date: 28, time: "8:00 AM", location: "City Park", attendees: 40, type: "event" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const VIEWS = ["Month", "Week", "Semester", "Annual"];
const JUNE_START_DAY = 1; // Monday
const JUNE_DAYS = 30;

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(12);
  const [activeView, setActiveView] = useState("Month");
  const [circleFilter, setCircleFilter] = useState<string[]>([]);

  const toggleCircle = (circle: string) => {
    setCircleFilter(prev =>
      prev.includes(circle) ? prev.filter(c => c !== circle) : [...prev, circle]
    );
  };

  const getEventsForDay = (day: number) =>
    EVENTS.filter(e => e.date === day && (circleFilter.length === 0 || circleFilter.includes(e.circle)));

  const selectedDayEvents = getEventsForDay(selectedDay);

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < JUNE_START_DAY; i++) calendarCells.push(null);
  for (let d = 1; d <= JUNE_DAYS; d++) calendarCells.push(d);
  while (calendarCells.length < 42) calendarCells.push(null);

  return (
    <div className="p-4 lg:p-6 page-enter h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
            June 2026
          </h1>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ChevronLeft size={15} style={{ color: "var(--muted-foreground)" }} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ChevronRight size={15} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-muted"
            style={{ border: "1px solid var(--border)", color: "var(--brand-blue)" }}>
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
            {VIEWS.map(v => (
              <button key={v}
                onClick={() => setActiveView(v)}
                className={cn("text-xs font-semibold px-3 py-1.5 rounded-lg transition-all")}
                style={activeView === v
                  ? { background: "var(--card)", color: "var(--foreground)", boxShadow: "var(--shadow-xs)" }
                  : { color: "var(--muted-foreground)" }}>
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => toast.info("New event modal coming soon")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.97]"
            style={{ background: "var(--brand-blue)", color: "white" }}>
            <Plus size={13} /> New Event
          </button>
        </div>
      </div>

      {/* Circle filter pills */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Filter:</span>
        {Object.entries(CIRCLE_COLORS).map(([circle, color]) => (
          <button key={circle}
            onClick={() => toggleCircle(circle)}
            className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all")}
            style={circleFilter.includes(circle)
              ? { background: color, color: "white" }
              : { background: color + "15", color, border: `1px solid ${color}40` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: circleFilter.includes(circle) ? "white" : color }} />
            {circle}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Calendar Grid */}
        <div className="flex-1 bento-card flex flex-col overflow-hidden">
          <div className="grid grid-cols-7 px-2 pt-2 pb-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.625rem" }}>
                {d}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 grid-rows-6 p-1.5 gap-1">
            {calendarCells.map((day, i) => {
              if (!day) return (
                <div key={i} className="rounded-lg opacity-20" style={{ background: "var(--muted)" }} />
              );
              const dayEvents = getEventsForDay(day);
              const isToday = day === 12;
              const isSelected = day === selectedDay;
              return (
                <div key={i}
                  onClick={() => setSelectedDay(day)}
                  className={cn("rounded-xl p-1.5 cursor-pointer transition-all flex flex-col")}
                  style={{
                    background: isSelected ? "oklch(0.93 0.08 262)" : isToday ? "oklch(0.96 0.04 262)" : "var(--card)",
                    border: `1px solid ${isSelected ? "oklch(0.72 0.15 262)" : isToday ? "oklch(0.82 0.10 262)" : "var(--border)"}`,
                    boxShadow: isSelected ? "0 0 0 2px oklch(0.52 0.22 262 / 0.25)" : "none",
                  }}>
                  <div className={cn("text-xs font-bold mb-1 w-5 h-5 flex items-center justify-center rounded-full self-start")}
                    style={{
                      background: isToday ? "var(--brand-blue)" : "transparent",
                      color: isSelected ? "var(--brand-blue)" : isToday ? "white" : "var(--foreground)",
                    }}>
                    {day}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className="px-1 py-0.5 rounded-md font-medium truncate"
                        style={{ background: CIRCLE_COLORS[ev.circle] + "22", color: CIRCLE_COLORS[ev.circle], fontSize: "0.5rem", lineHeight: "1.3" }}>
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-center" style={{ color: "var(--muted-foreground)", fontSize: "0.5rem" }}>+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3">
          <div className="bento-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>
                  June {selectedDay}
                </div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}>
                  {selectedDay === 12 ? "Today" : DAYS_OF_WEEK[new Date(2026, 5, selectedDay).getDay()]}
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--brand-blue)", color: "white" }}>
                <span className="text-sm font-bold">{selectedDay}</span>
              </div>
            </div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {selectedDayEvents.length === 0 ? "No events" : `${selectedDayEvents.length} event${selectedDayEvents.length > 1 ? "s" : ""}`}
            </div>
          </div>

          <div className="bento-card flex-1 overflow-y-auto">
            <div className="px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold">Events</span>
            </div>
            {selectedDayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
                  <Clock size={14} style={{ color: "var(--muted-foreground)" }} />
                </div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No events this day</p>
              </div>
            ) : (
              <div className="p-2.5 space-y-2">
                {selectedDayEvents.map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl cursor-pointer transition-all hover:shadow-sm"
                    style={{ background: CIRCLE_COLORS[ev.circle] + "10", border: `1px solid ${CIRCLE_COLORS[ev.circle]}30` }}
                    onClick={() => toast.info(`Event: ${ev.title}`)}>
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-xs font-semibold leading-snug">{ev.title}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium ml-1 flex-shrink-0"
                        style={{ background: CIRCLE_COLORS[ev.circle] + "20", color: CIRCLE_COLORS[ev.circle], fontSize: "0.55rem" }}>
                        {ev.circle}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <Clock size={9} style={{ color: "var(--muted-foreground)" }} />
                        <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>{ev.time}</span>
                      </div>
                      {ev.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={9} style={{ color: "var(--muted-foreground)" }} />
                          <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>{ev.location}</span>
                        </div>
                      )}
                      {ev.attendees && (
                        <div className="flex items-center gap-1">
                          <Users size={9} style={{ color: "var(--muted-foreground)" }} />
                          <span className="text-xs" style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}>{ev.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bento-card">
            <div className="px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold">Upcoming</span>
            </div>
            <div className="p-2.5 space-y-1.5">
              {EVENTS.filter(e => e.date > selectedDay).slice(0, 4).map(ev => (
                <div key={ev.id}
                  className="flex items-center gap-2 p-1.5 rounded-lg cursor-pointer hover:bg-muted/60 transition-colors"
                  onClick={() => setSelectedDay(ev.date)}>
                  <div className="w-7 h-7 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: CIRCLE_COLORS[ev.circle] + "20" }}>
                    <span className="font-bold" style={{ color: CIRCLE_COLORS[ev.circle], fontSize: "0.5rem" }}>JUN</span>
                    <span className="font-bold" style={{ color: CIRCLE_COLORS[ev.circle], fontSize: "0.65rem", lineHeight: 1 }}>{ev.date}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{ev.title}</p>
                    <p style={{ color: "var(--muted-foreground)", fontSize: "0.6rem" }}>{ev.time}</p>
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
