
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  Grid3X3, 
  ExternalLink 
} from "lucide-react";

interface SidebarProps {
  onToolSelect: (toolId: string) => void;
}

const Sidebar = ({ onToolSelect }: SidebarProps) => {
  const tools = [
    {
      id: "quiz-generator",
      name: "Quiz Generator",
      icon: HelpCircle
    },
    {
      id: "lesson-planner", 
      name: "Lesson Planner",
      icon: BookOpen
    },
    {
      id: "grading-assistant",
      name: "Grading Assistant", 
      icon: GraduationCap
    },
    {
      id: "all-tools",
      name: "All Tools",
      icon: Grid3X3
    }
  ];

  const handleOriginalVersion = () => {
    window.open('https://goodclass.ai/tools', '_blank');
  };

  return (
    <Card className="w-64 h-screen rounded-none border-r">
      <CardContent className="p-4 space-y-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 pt-4">
          <img 
            src="/lovable-uploads/62cb98b9-39ff-4659-b0d5-3f1e0ca7c0e5.png" 
            alt="GoodClass Logo" 
            className="w-10 h-10"
          />
          <h2 className="text-xl font-bold text-foreground">GoodClass</h2>
        </div>

        {/* Main Tools */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">MAIN FEATURES</h3>
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Button
                key={tool.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                onClick={() => onToolSelect(tool.id)}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tool.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Original Version Button */}
        <div className="pt-8 border-t">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleOriginalVersion}
          >
            <ExternalLink className="w-5 h-5" />
            <span>Original Version</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
