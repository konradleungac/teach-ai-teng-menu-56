import { Button } from "@/components/ui/button";
import { MessageCircle, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ToolSearch from "./ToolSearch";
import personaImg from "@/assets/persona.png";

interface DashboardHeaderProps {
  userName: string;
  onCommunityClick: () => void;
  onToolSelect: (toolId: string) => void;
}

const DashboardHeader = ({
  userName,
  onCommunityClick,
  onToolSelect,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={personaImg}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Good morning, {userName}! ☀️
              </h1>
              <p className="text-muted-foreground">
                Ready to make teaching easier today?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ToolSearch onToolSelect={onToolSelect} />
            <Button variant="outline" onClick={() => navigate("/all-tools")}>
              All Tools
            </Button>
            <Button variant="outline" onClick={onCommunityClick}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Community
            </Button>
            <Button onClick={() => navigate("/onboarding")}>
              <Target className="w-4 h-4 mr-2" />
              Preferences
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
