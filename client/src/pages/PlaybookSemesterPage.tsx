import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import { ChevronRight, Plus, FileText, ClipboardList, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const PHASE_COLORS: Record<string, string> = {
  Dedication: "oklch(0.42 0.18 265)",
  Discipleship: "oklch(0.60 0.17 160)",
  Development: "oklch(0.78 0.14 75)",
  Distribution: "oklch(0.62 0.16 35)",
};

const PHASES = [
  { name: "Dedication", month: "May", description: "Commit to the vision and align the team around shared goals.", items: ["Vision alignment workshop", "Team commitment ceremony", "Goal setting sessions"], completed: 3, total: 3 },
  { name: "Discipleship", month: "June", description: "Invest in growing leaders and deepening spiritual formation.", items: ["Leadership training series", "Small group facilitation", "Mentorship pairings", "Resource distribution"], completed: 2, total: 4 },
  { name: "Development", month: "July", description: "Build systems, processes, and infrastructure for ministry growth.", items: ["Process documentation", "Team skill workshops", "Infrastructure review"], completed: 0, total: 3 },
  { name: "Distribution", month: "August", description: "Deploy resources and activate the community for outreach.", items: ["Community event launch", "Volunteer deployment", "Impact measurement"], completed: 0, total: 3 },
];

export default function PlaybookSemesterPage() {
  const { semester } = useParams<{ semester: string }>();
  const [, navigate] = useLocation();
  const label = semester === "s1" ? "Semester 1" : semester === "s2" ? "Semester 2" : "Semester 3";
  const months = semester === "s1" ? "January – April" : semester === "s2" ? "May – August" : "September – December";

  return (
    <div className="p-4 lg:p-6 page-enter">
      <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
        <Link href="/playbook"><span className="hover:text-foreground cursor-pointer">The Playbook</span></Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--foreground)" }}>{label}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>{months}</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs h-8" style={{ background: "var(--primary)", color: "white" }}
          onClick={() => toast.info("Generate assignments from plan")}>
          <Plus size={14} /> Generate Assignments
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 card-stagger">
        {PHASES.map(phase => (
          <div key={phase.name} className="bento-card overflow-hidden">
            <div className="p-4 border-b" style={{ borderColor: "var(--border)", background: PHASE_COLORS[phase.name] + "08" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: PHASE_COLORS[phase.name] }} />
                <h3 className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: PHASE_COLORS[phase.name] }}>{phase.name}</h3>
                <span className="text-xs ml-auto" style={{ color: "var(--muted-foreground)" }}>{phase.month}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{phase.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Progress value={(phase.completed / phase.total) * 100} className="h-1.5 flex-1" />
                <span className="text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: PHASE_COLORS[phase.name] }}>
                  {phase.completed}/{phase.total}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors hover:bg-muted/40"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => toast.info(`Opening: ${item}`)}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${i < phase.completed ? "border-green-500 bg-green-50" : "border-muted-foreground"}`}>
                    {i < phase.completed && <div className="w-2 h-2 rounded-full bg-green-500" />}
                  </div>
                  <span className="text-xs flex-1">{item}</span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-border transition-colors" onClick={e => { e.stopPropagation(); toast.info("View document"); }}>
                      <FileText size={10} style={{ color: "var(--muted-foreground)" }} />
                    </button>
                    <button className="p-1 rounded hover:bg-border transition-colors" onClick={e => { e.stopPropagation(); toast.info("Create assignment"); }}>
                      <ClipboardList size={10} style={{ color: "var(--muted-foreground)" }} />
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs rounded-lg border border-dashed transition-colors hover:bg-muted"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                onClick={() => toast.info("Add planning item")}>
                + Add Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
