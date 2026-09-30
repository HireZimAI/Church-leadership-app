import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import { Plus, ChevronRight, ClipboardList, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CIRCLE_META: Record<string, { label: string; color: string }> = {
  creative: { label: "Creative", color: "var(--circle-creative)" },
  spirit:   { label: "Spirit",   color: "var(--circle-spirit)"   },
  community:{ label: "Community",color: "var(--circle-community)"},
  discovery:{ label: "Discovery",color: "var(--circle-discovery)"},
  mission:  { label: "Mission",  color: "var(--circle-mission)"  },
};

const ASSIGNMENTS = [
  { id: 1, title: "Prepare Q3 Outreach Plan", assignee: "Sarah K.", initials: "SK", due: "Jun 15", priority: "high", status: "in-progress" },
  { id: 2, title: "Design Event Flyer", assignee: "Marcus T.", initials: "MT", due: "Jun 18", priority: "medium", status: "not-started" },
  { id: 3, title: "Coordinate Venue Booking", assignee: "Pastor David", initials: "PD", due: "Jun 20", priority: "medium", status: "waiting" },
  { id: 4, title: "Update Circle Archive", assignee: "Sarah K.", initials: "SK", due: "Jun 22", priority: "low", status: "in-progress" },
  { id: 5, title: "Send Volunteer Invites", assignee: "James R.", initials: "JR", due: "Jun 25", priority: "high", status: "not-started" },
];

export default function CircleAssignmentsPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const circle = CIRCLE_META[id ?? "creative"] ?? CIRCLE_META.creative;

  return (
    <div className="p-4 lg:p-6 page-enter">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
            <Link href={`/circles/${id}`}><span className="hover:text-foreground cursor-pointer">{circle.label} Circle</span></Link>
            <ChevronRight size={12} />
            <span>Assignments</span>
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{circle.label} Assignments</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Filter size={12} /> Filter</Button>
          <Button size="sm" className="h-8 text-xs gap-1" style={{ background: circle.color, color: "white" }}
            onClick={() => toast.info("Create assignment")}>
            <Plus size={12} /> New Assignment
          </Button>
        </div>
      </div>

      {/* Status Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {["not-started", "in-progress", "waiting", "completed"].map(status => {
          const items = ASSIGNMENTS.filter(a => a.status === status);
          const labels: Record<string, string> = { "not-started": "Not Started", "in-progress": "In Progress", "waiting": "Waiting", "completed": "Completed" };
          return (
            <div key={status} className="bento-card p-3">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("status-badge", `status-${status}`)}>{labels[status]}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(a => (
                  <div key={a.id}
                    className="p-2.5 rounded-lg border cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm"
                    style={{ borderColor: "var(--border)", background: "var(--card)" }}
                    onClick={() => navigate(`/assignments/${a.id}`)}>
                    <p className="text-xs font-medium leading-snug mb-2">{a.title}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-xs" style={{ background: circle.color + "20", color: circle.color, fontSize: "0.5rem" }}>{a.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs flex-1 truncate" style={{ color: "var(--muted-foreground)" }}>{a.assignee}</span>
                      <span className={cn("status-badge", `priority-${a.priority}`)} style={{ fontSize: "0.6rem" }}>{a.priority}</span>
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}>Due {a.due}</p>
                  </div>
                ))}
                <button className="w-full py-2 text-xs rounded-lg border border-dashed transition-colors hover:bg-muted"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  onClick={() => toast.info("Add assignment to column")}>
                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
