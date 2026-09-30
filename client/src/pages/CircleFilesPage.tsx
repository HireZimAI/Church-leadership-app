import { useParams } from "wouter";
import { Link } from "wouter";
import { ChevronRight, Upload, FileText, FileSpreadsheet, Presentation, Video, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CIRCLE_META: Record<string, { label: string; color: string }> = {
  creative: { label: "Creative", color: "var(--circle-creative)" },
  spirit:   { label: "Spirit",   color: "var(--circle-spirit)"   },
  community:{ label: "Community",color: "var(--circle-community)"},
  discovery:{ label: "Discovery",color: "var(--circle-discovery)"},
  mission:  { label: "Mission",  color: "var(--circle-mission)"  },
};

const FILES = [
  { id: 1, name: "Q3 Outreach Strategy.docx", type: "doc", size: "245 KB", updated: "Jun 12", updatedBy: "Sarah K.", icon: <FileText size={20} /> },
  { id: 2, name: "Event Budget 2024.xlsx", type: "sheet", size: "128 KB", updated: "Jun 10", updatedBy: "Marcus T.", icon: <FileSpreadsheet size={20} /> },
  { id: 3, name: "Vision Casting Slides.pptx", type: "slides", size: "3.2 MB", updated: "Jun 8", updatedBy: "Pastor David", icon: <Presentation size={20} /> },
  { id: 4, name: "Volunteer Training Video.mp4", type: "video", size: "45 MB", updated: "Jun 5", updatedBy: "James R.", icon: <Video size={20} /> },
  { id: 5, name: "Ministry Plan Semester 2.docx", type: "doc", size: "312 KB", updated: "Jun 1", updatedBy: "Pastor David", icon: <FileText size={20} /> },
];

const TYPE_COLORS: Record<string, string> = {
  doc: "oklch(0.42 0.18 265)",
  sheet: "oklch(0.55 0.16 160)",
  slides: "oklch(0.62 0.16 35)",
  video: "oklch(0.65 0.18 300)",
};

export default function CircleFilesPage() {
  const { id } = useParams<{ id: string }>();
  const circle = CIRCLE_META[id ?? "creative"] ?? CIRCLE_META.creative;
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <div className="p-4 lg:p-6 page-enter">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
            <Link href={`/circles/${id}`}><span className="hover:text-foreground cursor-pointer">{circle.label} Circle</span></Link>
            <ChevronRight size={12} />
            <span>Files</span>
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{circle.label} Files</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setView("list")} className={cn("p-2 transition-colors", view === "list" ? "bg-primary text-white" : "hover:bg-muted")}><List size={14} /></button>
            <button onClick={() => setView("grid")} className={cn("p-2 transition-colors", view === "grid" ? "bg-primary text-white" : "hover:bg-muted")}><Grid size={14} /></button>
          </div>
          <Button size="sm" className="h-8 text-xs gap-1" style={{ background: circle.color, color: "white" }}
            onClick={() => toast.info("Upload file")}>
            <Upload size={12} /> Upload
          </Button>
        </div>
      </div>

      <div className="bento-card overflow-hidden">
        <div className="p-3 border-b flex items-center gap-2" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <Search size={14} style={{ color: "var(--muted-foreground)" }} />
          <input placeholder="Search files..." className="flex-1 text-sm bg-transparent outline-none" style={{ color: "var(--foreground)" }} />
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {FILES.map(f => (
            <div key={f.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50 group"
              onClick={() => toast.info(`Opening ${f.name} in workspace...`)}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: (TYPE_COLORS[f.type] ?? "oklch(0.58 0.01 260)") + "15", color: TYPE_COLORS[f.type] ?? "oklch(0.58 0.01 260)" }}>
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{f.size} · Updated {f.updated} by {f.updatedBy}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => { e.stopPropagation(); toast.info("Share file"); }}>
                Share
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
