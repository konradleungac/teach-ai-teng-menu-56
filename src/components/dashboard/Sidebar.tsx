import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  GraduationCap,
  CheckSquare,
  Grid3X3,
  ExternalLink,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { workflows as workflowsData } from "@/data/workflows";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface SidebarProps {
  onToolSelect: (toolId: string) => void;
  favorites?: string[];
}

// Flatten all workflows for lookup
const allWorkflows = [
  ...workflowsData.beginner,
  ...workflowsData.topPicks,
  ...workflowsData.subjectPacks,
  ...workflowsData.community,
];

const Sidebar = ({ onToolSelect, favorites = [] }: SidebarProps) => {
  const navigate = useNavigate();
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
    },
  ];

  const handleOriginalVersion = () => {
    window.open("https://goodclass.ai/tools", "_blank");
  };

  const handleFeatureClick = (featureId: string) => {
    if (featureId === "all-tools") {
      navigate("/all-tools");
    } else {
      onToolSelect(featureId);
    }
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

        {/* Main Features */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Main Features
          </h3>
          {mainFeatures.map((feature) => (
            <Button
              key={feature.id}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <feature.icon className="w-4 h-4 mr-3" />
              <span className="text-sm">{feature.name}</span>
            </Button>
          ))}
        </div>

        {/* Favorite Tools Dropdown */}
        {favorites.length > 0 && (
          <div className="mt-1">
            <Collapsible defaultOpen={false}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 flex items-center group"
                  tabIndex={0}
                >
                  <Heart className="w-4 h-4 mr-3 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    Favorite Tools
                  </span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 mt-2">
                  {favorites.map((fid) => {
                    const tool = allWorkflows.find((w) => w.id === fid);
                    if (!tool) return null;
                    return (
                      <Button
                        key={tool.id}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto py-2 px-2"
                        onClick={() => onToolSelect(tool.id)}
                      >
                        <span className="text-lg mr-2">{tool.icon}</span>
                        <span className="text-sm font-medium text-foreground">
                          {tool.title}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full mt-6"
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
