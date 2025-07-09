
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, GraduationCap, CheckSquare, Grid3X3, ExternalLink } from "lucide-react";

interface SidebarProps {
  onToolSelect: (toolId: string) => void;
}

const Sidebar = ({ onToolSelect }: SidebarProps) => {
  const mainFeatures = [
    {
      id: "quiz-generator",
      name: "Quiz Generator",
      icon: CheckSquare,
    },
    {
      id: "lesson-plan-basic", 
      name: "Lesson Planner",
      icon: FileText,
    },
    {
      id: "smart-grading",
      name: "Grading Assistant", 
      icon: GraduationCap,
    },
    {
      id: "all-tools",
      name: "All Tools",
      icon: Grid3X3,
    }
  ];

  const handleOriginalVersion = () => {
    window.open('https://goodclass.ai/tools', '_blank');
  };

  return (
    <Card className="w-64 h-fit sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/lovable-uploads/e2f6abd2-6f55-4706-8805-606b4b0cc4d6.png" 
            alt="GoodClass Logo" 
            className="w-10 h-10 rounded"
          />
          <h2 className="text-lg font-bold text-foreground">GoodClass</h2>
        </div>
        
        <div className="space-y-2 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Main Features</h3>
          {mainFeatures.map((feature) => (
            <Button
              key={feature.id}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => onToolSelect(feature.id)}
            >
              <feature.icon className="w-4 h-4 mr-3" />
              <span className="text-sm">{feature.name}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleOriginalVersion}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Original Version
        </Button>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
