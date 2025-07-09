
import { Button } from "@/components/ui/button";
import { MessageCircle, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  userName: string;
  onCommunityClick: () => void;
}

const DashboardHeader = ({ userName, onCommunityClick }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Good morning, {userName}! ☀️
            </h1>
            <p className="text-muted-foreground">Ready to make teaching easier today?</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onCommunityClick}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Community
            </Button>
            <Button onClick={() => navigate('/onboarding')}>
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
